import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/expenses")({
  head: () => ({ meta: [{ title: "Expenses — Free Accounting" }] }),
  component: ExpensesPage,
});

type Expense = { id: string; category: string | null; vendor: string | null; description: string | null; amount: number; expense_date: string; currency: string };

function fmt(n: number, c = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(n || 0);
}

function ExpensesPage() {
  const [items, setItems] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [form, setForm] = useState({ category: "", vendor: "", description: "", amount: "0", expense_date: new Date().toISOString().slice(0, 10), currency: "USD" });

  async function load() {
    const { data, error } = await supabase.from("expenses").select("*").order("expense_date", { ascending: false });
    if (error) return toast.error(error.message);
    setItems(data as Expense[]);
  }
  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm({ category: "", vendor: "", description: "", amount: "0", expense_date: new Date().toISOString().slice(0, 10), currency: "USD" });
    setOpen(true);
  }
  function openEdit(x: Expense) {
    setEditing(x);
    setForm({ category: x.category ?? "", vendor: x.vendor ?? "", description: x.description ?? "", amount: String(x.amount), expense_date: x.expense_date, currency: x.currency });
    setOpen(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const payload = { ...form, amount: Number(form.amount) || 0, user_id: u.user.id };
    const { error } = editing
      ? await supabase.from("expenses").update(payload).eq("id", editing.id)
      : await supabase.from("expenses").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Expense updated" : "Expense added");
    setOpen(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this expense?")) return;
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track every dollar that leaves your business.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-gradient-hero"><Plus className="h-4 w-4" /> New expense</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit expense" : "New expense"}</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-3">
              <div><Label>Vendor</Label><Input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Software, Travel" /></div>
              <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Amount</Label><Input required type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
                <div><Label>Date</Label><Input type="date" value={form.expense_date} onChange={(e) => setForm({ ...form, expense_date: e.target.value })} /></div>
              </div>
              <Button type="submit" className="w-full bg-gradient-hero">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border rounded-xl">
        {items.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No expenses yet.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow><TableHead>Date</TableHead><TableHead>Vendor</TableHead><TableHead>Category</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="w-32"></TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {items.map((x) => (
                <TableRow key={x.id}>
                  <TableCell>{x.expense_date}</TableCell>
                  <TableCell className="font-medium">{x.vendor}</TableCell>
                  <TableCell>{x.category}</TableCell>
                  <TableCell className="text-right">{fmt(Number(x.amount), x.currency)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(x)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(x.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
