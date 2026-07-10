// Assumptions about your repo's conventions (adjust imports if different):
//   - Supabase client lives at "@/integrations/supabase/client" (Lovable default)
//   - You have an auth hook/context exposing the current user, e.g. "@/hooks/useAuth"
//   - Toasts come from "@/hooks/use-toast" (shadcn default)
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type {
  Company,
  CompanyMember,
  CompanyRole,
  CompanyWithMembership,
  CreateCompanyInput,
} from "@/types/company";

const ACTIVE_COMPANY_STORAGE_KEY = "active_company_id";

interface CompanyContextValue {
  companies: CompanyWithMembership[];
  currentCompany: CompanyWithMembership | null;
  currentRole: CompanyRole | null;
  loading: boolean;
  error: string | null;
  switchCompany: (companyId: string) => void;
  refreshCompanies: () => Promise<void>;
  createCompany: (input: CreateCompanyInput) => Promise<Company>;
  canCreateCompany: boolean;
  companyLimit: number | null;
}

const CompanyContext = createContext<CompanyContextValue | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [companies, setCompanies] = useState<CompanyWithMembership[]>([]);
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(() =>
    localStorage.getItem(ACTIVE_COMPANY_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyLimit, setCompanyLimit] = useState<number | null>(null);

  const fetchCompanies = useCallback(async () => {
    if (!user) {
      setCompanies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // RLS already scopes this to companies the user is a member of.
      const { data: memberships, error: memberErr } = await supabase
        .from("company_members")
        .select("role, company:companies(*)")
        .eq("user_id", user.id);

      if (memberErr) throw memberErr;

      const { data: counts } = await supabase.from("company_members").select("company_id");

      const countByCompany = new Map<string, number>();
      (counts ?? []).forEach((row: { company_id: string }) => {
        countByCompany.set(row.company_id, (countByCompany.get(row.company_id) ?? 0) + 1);
      });

      const mapped: CompanyWithMembership[] = (memberships ?? [])
        .filter((m: any) => m.company)
        .map((m: any) => ({
          ...(m.company as Company),
          role: m.role as CompanyRole,
          member_count: countByCompany.get(m.company.id) ?? 1,
        }));

      setCompanies(mapped);

      // Validate / default the active company selection
      setCurrentCompanyId((prev) => {
        if (prev && mapped.some((c) => c.id === prev)) return prev;
        const fallback = mapped[0]?.id ?? null;
        if (fallback) localStorage.setItem(ACTIVE_COMPANY_STORAGE_KEY, fallback);
        return fallback;
      });
    } catch (err: any) {
      setError(err.message ?? "Failed to load companies");
      toast({
        title: "Couldn't load companies",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Track the user's plan limit so the UI can disable "Create Company" proactively.
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error: rpcErr } = await supabase.rpc("can_create_company", {
        _user_id: user.id,
      });
      if (!rpcErr) setCompanyLimit(data ? Infinity : companies.length);
    })();
  }, [user, companies.length]);

  const switchCompany = useCallback((companyId: string) => {
    setCurrentCompanyId(companyId);
    localStorage.setItem(ACTIVE_COMPANY_STORAGE_KEY, companyId);
    // Force any company-scoped queries/hooks keyed on currentCompany.id to refetch.
    window.dispatchEvent(new CustomEvent("company:switched", { detail: { companyId } }));
  }, []);

  const createCompany = useCallback(
    async (input: CreateCompanyInput): Promise<Company> => {
      if (!user) throw new Error("Not authenticated");

      const slug = input.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .concat("-", Math.random().toString(36).slice(2, 6));

      const { data: company, error: insertErr } = await supabase
        .from("companies")
        .insert({
          owner_id: user.id,
          name: input.name,
          legal_name: input.legal_name ?? null,
          slug,
          logo_url: input.logo_url ?? null,
          industry: input.industry ?? null,
          business_type: input.business_type ?? null,
          country: input.country ?? null,
          currency: input.currency,
          timezone: input.timezone,
          language: input.language,
          fiscal_year_start: input.fiscal_year_start,
          tax_number: input.tax_number ?? null,
          vat_number: input.vat_number ?? null,
          city: input.city ?? null,
          email: input.email ?? null,
          phone: input.phone ?? null,
          website: input.website ?? null,
        })
        .select()
        .single();

      if (insertErr) {
        if (insertErr.message.includes("row-level security")) {
          throw new Error(
            "You've reached your company limit. Upgrade your subscription to create more companies.",
          );
        }
        throw insertErr;
      }

      const { error: seedErr } = await supabase.rpc("seed_company_starter_data", {
        _company_id: company.id,
        _template: input.starter_template,
      });
      if (seedErr) {
        toast({
          title: "Company created, but starter setup failed",
          description: seedErr.message,
          variant: "destructive",
        });
      }

      if (input.invites?.length) {
        // Actual invite delivery (email) should go through your existing
        // invitations/edge-function flow; this only records intent.
        for (const invite of input.invites) {
          await supabase.from("company_invitations").insert({
            company_id: company.id,
            email: invite.email,
            role: invite.role,
            invited_by: user.id,
          });
        }
      }

      await fetchCompanies();
      switchCompany(company.id);

      return company as Company;
    },
    [user, fetchCompanies, switchCompany, toast],
  );

  const currentCompany = companies.find((c) => c.id === currentCompanyId) ?? null;

  const value: CompanyContextValue = {
    companies,
    currentCompany,
    currentRole: currentCompany?.role ?? null,
    loading,
    error,
    switchCompany,
    refreshCompanies: fetchCompanies,
    createCompany,
    canCreateCompany: companyLimit === null ? true : companies.length < companyLimit,
    companyLimit,
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompany must be used within a CompanyProvider");
  return ctx;
}
