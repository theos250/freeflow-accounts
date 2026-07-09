import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  Search,
  MoreVertical,
  Archive,
  Trash2,
  Pencil,
  ExternalLink,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompany } from "@/context/CompanyContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { CompanyWithMembership } from "@/types/company";

type StatusFilter = "all" | "active" | "archived";
type SortKey = "name" | "created_at" | "members";

export default function CompaniesPage() {
  const { companies, loading, error, refreshCompanies, switchCompany } = useCompany();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [pendingDelete, setPendingDelete] = useState<CompanyWithMembership | null>(null);
  const [pendingArchive, setPendingArchive] = useState<CompanyWithMembership | null>(null);

  const filtered = useMemo(() => {
    let result = companies.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    if (status !== "all") result = result.filter((c) => c.status === status);

    result = [...result].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "members") return b.member_count - a.member_count;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return result;
  }, [companies, search, status, sortKey]);

  const handleArchiveToggle = async (company: CompanyWithMembership) => {
    const nextStatus = company.status === "active" ? "archived" : "active";
    const { error: updateErr } = await supabase
      .from("companies")
      .update({ status: nextStatus })
      .eq("id", company.id);

    if (updateErr) {
      toast({ title: "Couldn't update company", description: updateErr.message, variant: "destructive" });
      return;
    }
    toast({ title: nextStatus === "archived" ? "Company archived" : "Company restored" });
    setPendingArchive(null);
    refreshCompanies();
  };

  const handleDelete = async (company: CompanyWithMembership) => {
    const { error: deleteErr } = await supabase.from("companies").delete().eq("id", company.id);
    if (deleteErr) {
      toast({ title: "Couldn't delete company", description: deleteErr.message, variant: "destructive" });
      return;
    }
    toast({ title: "Company deleted" });
    setPendingDelete(null);
    refreshCompanies();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
          <p className="text-sm text-muted-foreground">
            Manage every company you own or belong to.
          </p>
        </div>
        <Button onClick={() => navigate("/companies/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Company
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search companies"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Newest first</SelectItem>
            <SelectItem value="name">Name (A–Z)</SelectItem>
            <SelectItem value="members">Most members</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
          {error}
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={() => refreshCompanies()}>
              Try again
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-16 text-center">
          <Building2 className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium">
              {companies.length === 0 ? "No companies yet" : "No companies match your filters"}
            </p>
            <p className="text-sm text-muted-foreground">
              {companies.length === 0
                ? "Create your first company to get started."
                : "Try adjusting your search or filters."}
            </p>
          </div>
          {companies.length === 0 && (
            <Button onClick={() => navigate("/companies/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Company
            </Button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <Card key={company.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={company.logo_url ?? undefined} alt={company.name} />
                    <AvatarFallback className="rounded-lg">
                      {company.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">{company.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {company.business_type ?? "—"}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        switchCompany(company.id);
                        navigate("/dashboard");
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/companies/${company.id}/settings`)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPendingArchive(company)}>
                      <Archive className="mr-2 h-4 w-4" />
                      {company.status === "active" ? "Archive" : "Restore"}
                    </DropdownMenuItem>
                    {company.role === "owner" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setPendingDelete(company)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="flex-1 space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Country</span>
                  <span className="font-medium text-foreground">{company.country ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Currency</span>
                  <span className="font-medium text-foreground">{company.currency}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> Members
                  </span>
                  <span className="font-medium text-foreground">{company.member_count}</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <Badge variant={company.status === "active" ? "default" : "secondary"}>
                  {company.status === "active" ? "Active" : "Archived"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(company.created_at).toLocaleDateString()}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!pendingArchive} onOpenChange={(open) => !open && setPendingArchive(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingArchive?.status === "active" ? "Archive company?" : "Restore company?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingArchive?.status === "active"
                ? "Archived companies are hidden from active views but all data is preserved. You can restore them anytime."
                : "This company will become active again and count toward your plan limit."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => pendingArchive && handleArchiveToggle(pendingArchive)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{pendingDelete?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the company and all of its records — customers, invoices,
              inventory, everything. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => pendingDelete && handleDelete(pendingDelete)}
            >
              Delete permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
