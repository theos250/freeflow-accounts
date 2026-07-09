import { useNavigate } from "react-router-dom";
import { Building2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/context/CompanyContext";

export function PlanUsageCard() {
  const { companies, companyLimit, canCreateCompany } = useCompany();
  const navigate = useNavigate();

  const isUnlimited = companyLimit === null || companyLimit === Infinity;
  const used = companies.length;
  const pct = isUnlimited ? 0 : Math.min(100, (used / Math.max(companyLimit ?? 1, 1)) * 100);
  const nearLimit = !isUnlimited && !canCreateCompany;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Companies Used
        </CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-2xl font-semibold">
          {used}
          <span className="text-base font-normal text-muted-foreground">
            {" "}/ {isUnlimited ? "∞" : companyLimit}
          </span>
        </div>
        {!isUnlimited && <Progress value={pct} />}
        {nearLimit ? (
          <Button size="sm" className="w-full" onClick={() => navigate("/settings/billing")}>
            Upgrade Plan
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/companies/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Quick Create Company
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
