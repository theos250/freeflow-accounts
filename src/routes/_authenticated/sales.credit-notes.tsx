import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/sales/credit-notes")({
  head: () => ({ meta: [{ title: "Credit notes — Free Accounting" }] }),
  component: () => <ComingSoon title="Credit notes" description="Issue refunds and credits against existing invoices with full audit trail." />,
});
