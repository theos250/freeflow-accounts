import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCompany } from "@/context/CompanyContext";
import { useToast } from "@/hooks/use-toast";
import type { CompanyRole, CreateCompanyInput, StarterTemplate } from "@/types/company";
import { STARTER_TEMPLATE_LABELS, COMPANY_ROLE_LABELS } from "@/types/company";

const STEPS = [
  "Business Identity",
  "Regional Settings",
  "Business Details",
  "Accounting Setup",
  "Invite Team",
] as const;

const CURRENCIES = ["USD", "EUR", "GBP", "RWF", "KES", "NGN", "ZAR", "CAD", "AUD"];
const TIMEZONES = [
  "UTC",
  "Africa/Kigali",
  "Africa/Lagos",
  "Africa/Nairobi",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Dubai",
];
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "sw", label: "Swahili" },
  { code: "ar", label: "Arabic" },
  { code: "es", label: "Spanish" },
];

const emptyInput: CreateCompanyInput = {
  name: "",
  legal_name: "",
  industry: "",
  business_type: "",
  country: "",
  currency: "USD",
  timezone: "UTC",
  language: "en",
  fiscal_year_start: 1,
  tax_number: "",
  vat_number: "",
  address: "",
  city: "",
  email: "",
  phone: "",
  website: "",
  starter_template: "freelancer",
  invites: [],
};

export default function CreateCompanyWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createCompany, canCreateCompany, companies, companyLimit } = useCompany();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<CreateCompanyInput>(emptyInput);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<CompanyRole>("viewer");

  const update = <K extends keyof CreateCompanyInput>(key: K, value: CreateCompanyInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const stepValid = () => {
    if (step === 0) return form.name.trim().length > 0;
    if (step === 1) return !!form.currency && !!form.timezone && !!form.language;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const company = await createCompany(form);
      toast({ title: "Company created", description: `${company.name} is ready to go.` });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Couldn't create company", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!canCreateCompany) {
    return (
      <div className="mx-auto max-w-lg p-10 text-center">
        <h2 className="text-xl font-semibold">You've reached your company limit.</h2>
        <p className="mt-2 text-muted-foreground">
          Upgrade your subscription to create more companies.
          {companyLimit !== null && (
            <>
              {" "}
              You're currently using {companies.length} of {companyLimit}.
            </>
          )}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate("/companies")}>
            Back to Companies
          </Button>
          <Button onClick={() => navigate("/settings/billing")}>Upgrade Plan</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                i < step && "border-primary bg-primary text-primary-foreground",
                i === step && "border-primary text-primary",
                i > step && "border-muted text-muted-foreground",
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("mx-2 h-px flex-1", i < step ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>
      <p className="mb-1 text-sm font-medium text-muted-foreground">
        Step {step + 1} of {STEPS.length}
      </p>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">{STEPS[step]}</h1>

      <Card>
        <CardContent className="space-y-4 pt-6">
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Acme Consulting"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legal_name">Legal Name</Label>
                <Input
                  id="legal_name"
                  value={form.legal_name}
                  onChange={(e) => update("legal_name", e.target.value)}
                  placeholder="Acme Consulting LLC"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    placeholder="Consulting"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Input
                    id="business_type"
                    value={form.business_type}
                    onChange={(e) => update("business_type", e.target.value)}
                    placeholder="LLC, Sole Proprietor..."
                  />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder="Rwanda"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Currency *</Label>
                  <Select value={form.currency} onValueChange={(v) => update("currency", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timezone *</Label>
                  <Select value={form.timezone} onValueChange={(v) => update("timezone", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language *</Label>
                  <Select value={form.language} onValueChange={(v) => update("language", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l.code} value={l.code}>
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Fiscal Year Start Month</Label>
                <Select
                  value={String(form.fiscal_year_start)}
                  onValueChange={(v) => update("fiscal_year_start", Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SelectItem key={i} value={String(i + 1)}>
                        {new Date(2000, i, 1).toLocaleString("default", { month: "long" })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tax Number</Label>
                  <Input
                    value={form.tax_number}
                    onChange={(e) => update("tax_number", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>VAT Number</Label>
                  <Input
                    value={form.vat_number}
                    onChange={(e) => update("vat_number", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => update("address", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input value={form.website} onChange={(e) => update("website", e.target.value)} />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(Object.keys(STARTER_TEMPLATE_LABELS) as StarterTemplate[]).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => update("starter_template", key)}
                  className={cn(
                    "rounded-lg border p-4 text-left text-sm font-medium transition-colors",
                    form.starter_template === key
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:bg-muted",
                  )}
                >
                  {STARTER_TEMPLATE_LABELS[key]}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <>
              <p className="text-sm text-muted-foreground">
                Optional — invite teammates now, or skip and do this later from Company Settings.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="teammate@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as CompanyRole)}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(COMPANY_ROLE_LABELS) as CompanyRole[])
                      .filter((r) => r !== "owner")
                      .map((r) => (
                        <SelectItem key={r} value={r}>
                          {COMPANY_ROLE_LABELS[r]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!inviteEmail.includes("@")}
                  onClick={() => {
                    update("invites", [
                      ...(form.invites ?? []),
                      { email: inviteEmail, role: inviteRole },
                    ]);
                    setInviteEmail("");
                  }}
                >
                  Add
                </Button>
              </div>
              {!!form.invites?.length && (
                <ul className="space-y-1 text-sm">
                  {form.invites.map((inv, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <span>{inv.email}</span>
                      <span className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                          {COMPANY_ROLE_LABELS[inv.role]}
                        </span>
                        <button
                          type="button"
                          className="text-xs text-destructive"
                          onClick={() =>
                            update(
                              "invites",
                              form.invites?.filter((_, idx) => idx !== i),
                            )
                          }
                        >
                          Remove
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 0 || submitting}
          onClick={() => setStep((s) => s - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button type="button" disabled={!stepValid()} onClick={() => setStep((s) => s + 1)}>
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" disabled={submitting} onClick={handleSubmit}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Company
          </Button>
        )}
      </div>
    </div>
  );
}
