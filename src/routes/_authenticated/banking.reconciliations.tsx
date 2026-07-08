import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/banking/reconciliations")({
  head: () => ({ meta: [{ title: "Reconciliations — Free Accounting" }] }),
  component: () => (
    <ComingSoon
      title="Reconciliations"
      description="Match book balances to bank statements with one-click reconciliation."
    />
  ),
});
