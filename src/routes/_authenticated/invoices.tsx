import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/invoices")({
  head: () => ({ meta: [{ title: "Invoices — Free Accounting" }] }),
  component: InvoicesPage,
});

type Invoice = {
  id: string; invoice_number: string; customer_id: string | null; issue_date: string; due_date: string | null;
  status: string; total: number; currency: string;
  customers?: { name: string } | null;
};
type Customer = { id: string; name: string };

const STATUSES = ["draft", "sent", "paid", "overdue"];

function fmt(n: number, c = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(n || 0);
}

function InvoicesPage() {
  const [items, setItems] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [form, setForm] = useState({
    invoice_number: "", customer_id: "", issue_date: new Date().toISOString().slice(0, 10),
    due_date: "", status: "draft", total: "0", currency: "USD", notes: "",
  });

  async function load() {
    const [inv, cust] = await Promise.all([
      supabase.from("invoices").select("*, customers(name)").order("issue_date", { ascending: false }),
      supabase.from("customers").select("id,name").order("name"),
    ]);
    if (inv.error) toast.error(inv.error.message); else setItems(inv.data as Invoice[]);
    if (cust.data) setCustomers(cust.data as Customer[]);
  }
  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm({
      invoice_number: `INV-${Date.now().toString().slice(-6)}`,
      customer_id: "", issue_date: new Date().toISOString().slice(0, 10),
      due_date: "", status: "draft", total: "0", currency: "USD", notes: "",
    });
    setOpen(true);
  }
  function openEdit(i: Invoice) {
    setEditing(i);
    setForm({
      invoice_number: i.invoice_number, customer_id: i.customer_id ?? "",
      issue_date: i.issue_date, due_date: i.due_date ?? "", status: i.status,
      total: String(i.total), currency: i.currency, notes: "",
    });
    setOpen(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const total = Number(form.total) || 0;
    const payload = {
      user_id: u.user.id,
      invoice_number: form.invoice_number,
      customer_id: form.customer_id || null,
      issue_date: form.issue_date,
      due_date: form.due_date || null,
      status: form.status,
      currency: form.currency,
      subtotal: total, tax: 0, total,
      notes: form.notes,
    };
    const { error } = editing
      ? await supabase.from("invoices").update(payload).eq("id", editing.id)
      : await supabase.from("invoices").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Invoice updated" : "Invoice created");
    setOpen(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this invoice?")) return;
    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Create and track invoices.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-gradient-hero"><Plus className="h-4 w-4" /> New invoice</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit invoice" : "New invoice"}</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-3">
              <div><Label>Invoice number</Label><Input required value={form.invoice_number} onChange={(e) => setForm({ ...form, invoice_number: e.target.value })} /></div>
              <div>
                <Label>Customer</Label>
                <Select value={form.customer_id} onValueChange={(v) => setForm({ ...form, customer_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Issue date</Label><Input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} /></div>
                <div><Label>Due date</Label><Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Total</Label><Input type="number" step="0.01" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} /></div>
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-hero">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border rounded-xl">
        {items.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">No invoices yet.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow><TableHead>#</TableHead><TableHead>Customer</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Total</TableHead><TableHead className="w-32"></TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {items.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.invoice_number}</TableCell>
                  <TableCell>{i.customers?.name ?? "—"}</TableCell>
                  <TableCell>{i.issue_date}</TableCell>
                  <TableCell><Badge variant={i.status === "paid" ? "default" : "secondary"}>{i.status}</Badge></TableCell>
                  <TableCell className="text-right">{fmt(Number(i.total), i.currency)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(i)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(i.id)}><Trash2 className="h-4 w-4" /></Button>
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
