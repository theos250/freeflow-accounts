// Assumes shadcn/ui components already present in your repo at these paths
// (DropdownMenu, Avatar, Button, Input) - standard for Lovable-generated projects.
// Assumes CompanyContext.switchCompany() already calls queryClient.clear()
// internally (see CompanyContext.tsx) so cached data never leaks across companies.

import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, ChevronsUpDown, Plus, Settings, Building2, Search, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useCompany } from "@/context/CompanyContext";
import { cn } from "@/lib/utils";

const SEARCH_THRESHOLD = 6;

function CompanyAvatar({
  name,
  logoUrl,
  size = "h-6 w-6",
  textSize = "text-xs",
}: {
  name: string;
  logoUrl?: string | null;
  size?: string;
  textSize?: string;
}) {
  return (
    <Avatar className={cn(size, "rounded-lg ring-1 ring-border")}>
      <AvatarImage src={logoUrl ?? undefined} alt={name} />
      <AvatarFallback
        className={cn(
          "rounded-lg font-semibold text-primary-foreground",
          "bg-gradient-to-br from-primary to-primary/70",
          textSize
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

export function CompanySwitcher() {
  const { companies, currentCompany, switchCompany, loading } = useCompany();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return companies;
    const q = query.toLowerCase();
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, query]);

  // Every scoped table is filtered by company_id (RLS + query keys), so a
  // detail route like /invoices/:id from the previous company can 404 or
  // leak a stale UI state under the new one. Safest default: send the user
  // back to a company-agnostic landing page whenever they actually switch.
  const handleSelect = async (id: string) => {
    if (id === currentCompany?.id) {
      setOpen(false);
      return;
    }
    setSwitchingId(id);
    try {
      await switchCompany(id);
      setOpen(false);
      setQuery("");
      if (location.pathname !== "/dashboard") {
        navigate("/dashboard");
      }
    } finally {
      setSwitchingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-9 w-56 items-center gap-2 rounded-lg border bg-muted/40 px-2">
        <div className="h-6 w-6 animate-pulse rounded-lg bg-muted" />
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (!currentCompany) {
    return (
      <Button size="sm" onClick={() => navigate("/companies/new")} className="gap-1.5">
        <Plus className="h-4 w-4" />
        Create company
      </Button>
    );
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex w-56 items-center justify-between gap-2 px-2",
            "border-border/80 shadow-sm transition-colors hover:bg-accent/60",
            "data-[state=open]:border-primary/40 data-[state=open]:ring-2 data-[state=open]:ring-primary/10"
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <CompanyAvatar name={currentCompany.name} logoUrl={currentCompany.logo_url} />
            <span className="flex min-w-0 flex-col items-start leading-tight">
              <span className="truncate text-sm font-medium">{currentCompany.name}</span>
              <span className="text-[11px] text-muted-foreground">Workspace</span>
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-72 overflow-hidden rounded-xl p-0 shadow-lg"
      >
        <div className="px-3 pb-2 pt-3">
          <DropdownMenuLabel className="px-0 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Your companies
          </DropdownMenuLabel>

          {companies.length > SEARCH_THRESHOLD && (
            <div className="relative mb-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies…"
                className="h-8 pl-8 text-sm"
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>

        <div className="max-h-64 overflow-y-auto px-1.5 pb-1.5">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No companies match "{query}"
            </p>
          ) : (
            filtered.map((company) => {
              const isActive = company.id === currentCompany.id;
              const isSwitching = switchingId === company.id;
              return (
                <DropdownMenuItem
                  key={company.id}
                  disabled={isSwitching}
                  onSelect={(e) => {
                    // keep menu open until switchCompany resolves
                    e.preventDefault();
                    handleSelect(company.id);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg py-2",
                    isActive && "bg-primary/5"
                  )}
                >
                  <CompanyAvatar
                    name={company.name}
                    logoUrl={company.logo_url}
                    size="h-5 w-5"
                    textSize="text-[10px]"
                  />
                  <span className={cn("flex-1 truncate text-sm", isActive && "font-medium")}>
                    {company.name}
                  </span>
                  {isSwitching ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                  ) : (
                    isActive && <Check className="h-4 w-4 shrink-0 text-primary" />
                  )}
                </DropdownMenuItem>
              );
            })
          )}
        </div>

        <DropdownMenuSeparator className="m-0" />

        <div className="p-1.5">
          <DropdownMenuItem onClick={() => navigate("/companies/new")} className="gap-2 rounded-lg">
            <Plus className="h-4 w-4 text-muted-foreground" />
            Create company
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/companies")} className="gap-2 rounded-lg">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Manage companies
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/companies/${currentCompany.id}/settings`)}
            className="gap-2 rounded-lg"
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Company settings
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
