import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/items/stock-movements")({
  head: () => ({ meta: [{ title: "Stock movements — Free Accounting" }] }),
  component: StockMovementsPage,
});

type Movement = {
  id: string;
  item_id: string;
  invoice_id: string | null;
  quantity_change: number;
  balance_after: number | null;
  reason: string;
  note: string | null;
  created_at: string;
  items?: { name: string; sku: string | null } | null;
  invoices?: { invoice_number: string } | null;
};

type ItemOpt = { id: string; name: string };

const REASON_LABEL: Record<string, string> = {
  invoice_paid: "Invoice paid",
  invoice_reversed: "Payment reversed",
  invoice_deleted: "Paid invoice deleted",
};

function reasonVariant(r: string): "default" | "secondary" | "destructive" {
  if (r === "invoice_paid") return "default";
  if (r === "invoice_reversed") return "secondary";
  return "destructive";
}

function StockMovementsPage() {
  const [rows, setRows] = useState<Movement[]>([]);
  const [items, setItems] = useState<ItemOpt[]>([]);
  const [itemFilter, setItemFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    let q = supabase
      .from("stock_movements")
      .select("*, items(name, sku), invoices(invoice_number)")
      .order("created_at", { ascending: false })
      .limit(500);
    if (itemFilter !== "all") q = q.eq("item_id", itemFilter);
    const [mv, it] = await Promise.all([
      q,
      supabase.from("items").select("id,name").eq("type", "product").eq("track_inventory", true).order("name"),
    ]);
    if (mv.error) toast.error(mv.error.message);
    else setRows((mv.data ?? []) as Movement[]);
    if (it.data) setItems(it.data as ItemOpt[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, [itemFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Stock movements</h1>
          <p className="text-muted-foreground">Audit trail of every inventory change driven by invoices.</p>
        </div>
        <Select value={itemFilter} onValueChange={setItemFilter}>
          <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tracked products</SelectItem>
            {items.map((i) => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-xl">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No stock movements yet. They appear automatically when a tracked product's invoice is marked paid.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Balance after</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((m) => {
                const positive = Number(m.quantity_change) > 0;
                return (
                  <TableRow key={m.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(m.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{m.items?.name ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={reasonVariant(m.reason)}>{REASON_LABEL[m.reason] ?? m.reason}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{m.invoices?.invoice_number ?? m.note ?? "—"}</TableCell>
                    <TableCell className={`text-right tabular-nums font-medium ${positive ? "text-emerald-600" : "text-red-600"}`}>
                      {positive ? "+" : ""}{Number(m.quantity_change)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{m.balance_after ?? "—"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
