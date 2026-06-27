import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, FileText, Users, Receipt, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth", search: { mode: "login" } });
    return { user: data.user };
  },
  component: AppShell,
});

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/invoices", label: "Invoices", icon: FileText },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/expenses", label: "Expenses", icon: Receipt },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

function AppShell() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", search: { mode: "login" } });
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="hidden md:flex flex-col w-60 border-r bg-card">
        <Link to="/dashboard" className="px-6 py-5 text-xl font-bold gradient-text border-b">Free Accounting</Link>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              activeProps={{ className: "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium bg-primary/10 text-primary" }}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{email}</div>
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between border-b bg-card px-4 py-3">
          <Link to="/dashboard" className="font-bold gradient-text">Free Accounting</Link>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
        </div>
        <div className="md:hidden flex overflow-x-auto gap-1 border-b bg-card px-2 py-2">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="px-3 py-1.5 text-xs rounded-md text-muted-foreground" activeProps={{ className: "px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary" }}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
