// Assumes shadcn/ui components already present in your repo at these paths
// (DropdownMenu, Avatar, Button) - standard for Lovable-generated projects.
import { useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown, Plus, Settings, Building2 } from "lucide-react";
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
import { useCompany } from "@/context/CompanyContext";
import { cn } from "@/lib/utils";

export function CompanySwitcher() {
  const { companies, currentCompany, switchCompany, loading } = useCompany();
  const navigate = useNavigate();

  if (loading) {
    return <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />;
  }

  if (!currentCompany) {
    return (
      <Button variant="outline" size="sm" onClick={() => navigate("/companies/new")}>
        <Plus className="mr-2 h-4 w-4" />
        Create Company
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-56 items-center justify-between gap-2 px-2"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Avatar className="h-6 w-6 rounded-md">
              <AvatarImage src={currentCompany.logo_url ?? undefined} alt={currentCompany.name} />
              <AvatarFallback className="rounded-md text-xs">
                {currentCompany.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">{currentCompany.name}</span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Your Companies</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {companies.map((company) => (
          <DropdownMenuItem
            key={company.id}
            onClick={() => switchCompany(company.id)}
            className="flex items-center gap-2"
          >
            <Avatar className="h-5 w-5 rounded-md">
              <AvatarImage src={company.logo_url ?? undefined} alt={company.name} />
              <AvatarFallback className="rounded-md text-[10px]">
                {company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 truncate">{company.name}</span>
            {company.id === currentCompany.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/companies/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Company
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/companies")}>
          <Building2 className="mr-2 h-4 w-4" />
          Manage Companies
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/companies/${currentCompany.id}/settings`)}>
          <Settings className="mr-2 h-4 w-4" />
          Company Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
