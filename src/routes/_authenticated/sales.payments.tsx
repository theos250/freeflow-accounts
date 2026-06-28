import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/sales/payments")({
  head: () => ({ meta: [{ title: "Payments received — Free Accounting" }] }),
  component: () => <ComingSoon title="Payments received" description="Record and reconcile customer payments across multiple payment methods." />,
});
