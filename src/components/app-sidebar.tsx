import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, Users, Receipt, BarChart3, LogOut, Package,
  ShoppingCart, Building2, Briefcase, Landmark, Calendar, BookOpen,
  AppWindow, Building, ChevronDown, Sparkles,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Item = { label: string; to: string };
type Group = { label: string; icon: React.ComponentType<{ className?: string }>; to?: string; items?: Item[] };

const groups: Group[] = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Items", icon: Package, items: [
    { label: "Products", to: "/items/products" },
    { label: "Services", to: "/items/services" },
    { label: "Categories", to: "/items/categories" },
    { label: "Inventory", to: "/items/inventory" },
    { label: "Stock movements", to: "/items/stock-movements" },
  ]},
  { label: "Sales", icon: ShoppingCart, items: [
    { label: "Invoices", to: "/invoices" },
    { label: "Customers", to: "/customers" },
    { label: "Estimates", to: "/sales/estimates" },
    { label: "Recurring invoices", to: "/sales/recurring" },
    { label: "Credit notes", to: "/sales/credit-notes" },
    { label: "Payments received", to: "/sales/payments" },
  ]},
  { label: "Purchases", icon: Briefcase, items: [
    { label: "Bills", to: "/purchases/bills" },
    { label: "Vendors", to: "/purchases/vendors" },
    { label: "Purchase orders", to: "/purchases/orders" },
    { label: "Expenses", to: "/expenses" },
  ]},
  { label: "HR", icon: Building2, items: [
    { label: "Employees", to: "/hr/employees" },
    { label: "Expense claims", to: "/hr/claims" },
    { label: "Departments", to: "/hr/departments" },
    { label: "Leave management", to: "/hr/leave" },
  ]},
  { label: "Banking", icon: Landmark, items: [
    { label: "Accounts", to: "/banking/accounts" },
    { label: "Bank feeds", to: "/banking/feeds" },
    { label: "Transactions", to: "/banking/transactions" },
    { label: "Transfers", to: "/banking/transfers" },
    { label: "Reconciliations", to: "/banking/reconciliations" },
  ]},
  { label: "Calendar", icon: Calendar, to: "/calendar" },
  { label: "Accounting", icon: BookOpen, items: [
    { label: "Chart of accounts", to: "/accounting/chart" },
    { label: "Journal entries", to: "/accounting/journals" },
    { label: "General ledger", to: "/accounting/ledger" },
    { label: "Trial balance", to: "/accounting/trial-balance" },
  ]},
  { label: "Reports", icon: BarChart3, to: "/reports" },
  { label: "Apps", icon: AppWindow, to: "/apps" },
  { label: "Companies", icon: Building, to: "/companies" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", search: { mode: "login" } });
  }

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-sm shrink-0">FA</div>
          {!collapsed && <span className="font-bold text-base gradient-text">Free Accounting</span>}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {groups.map((g) => {
                if (!g.items) {
                  return (
                    <SidebarMenuItem key={g.label}>
                      <SidebarMenuButton asChild isActive={isActive(g.to!)} tooltip={g.label}>
                        <Link to={g.to!}><g.icon className="h-4 w-4" /><span>{g.label}</span></Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                const open = g.items.some((i) => isActive(i.to));
                return (
                  <Collapsible key={g.label} defaultOpen={open} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={g.label}>
                          <g.icon className="h-4 w-4" />
                          <span>{g.label}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {g.items.map((i) => (
                            <SidebarMenuSubItem key={i.to}>
                              <SidebarMenuSubButton asChild isActive={isActive(i.to)}>
                                <Link to={i.to}>{i.label}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Plan</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="mx-2 rounded-lg border bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary"><Sparkles className="h-3 w-3" /> Free plan</div>
              {!collapsed && <p className="text-xs text-muted-foreground mt-1">Upgrade for AI Bookkeeper, advanced reports, and no ads.</p>}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        {!collapsed && <div className="px-2 text-xs text-muted-foreground truncate">{email}</div>}
        <Button variant="ghost" size="sm" onClick={signOut} className="justify-start gap-2">
          <LogOut className="h-4 w-4" /> {!collapsed && "Sign out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
