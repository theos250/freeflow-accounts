import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, Receipt, TrendingUp, FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Free Accounting" }] }),
  component: Dashboard,
});

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n || 0);
}

function Dashboard() {
  const [stats, setStats] = useState({ revenue: 0, expenses: 0, profit: 0, outstanding: 0, invoiceCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [invRes, expRes] = await Promise.all([
        supabase.from("invoices").select("total,status"),
        supabase.from("expenses").select("amount"),
      ]);
      const invoices = invRes.data ?? [];
      const expenses = expRes.data ?? [];
      const revenue = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + Number(i.total), 0);
      const outstanding = invoices.filter((i) => i.status !== "paid" && i.status !== "draft").reduce((s, i) => s + Number(i.total), 0);
      const exp = expenses.reduce((s, e) => s + Number(e.amount), 0);
      setStats({ revenue, expenses: exp, profit: revenue - exp, outstanding, invoiceCount: invoices.length });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Revenue", value: fmt(stats.revenue), icon: DollarSign, tone: "text-secondary" },
    { label: "Expenses", value: fmt(stats.expenses), icon: Receipt, tone: "text-accent" },
    { label: "Profit", value: fmt(stats.profit), icon: TrendingUp, tone: "text-primary" },
    { label: "Outstanding invoices", value: fmt(stats.outstanding), icon: FileText, tone: "text-muted-foreground" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-muted-foreground mb-8">A snapshot of your business.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className={`h-4 w-4 ${c.tone}`} />
            </div>
            <div className="mt-2 text-2xl font-bold">{loading ? "—" : c.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-card border rounded-xl p-6">
        <h2 className="font-semibold mb-1">Get started</h2>
        <p className="text-sm text-muted-foreground">
          Add a customer, create your first invoice, and start logging expenses to see real-time profitability.
        </p>
      </div>
    </div>
  );
}
