import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/sales/estimates")({
  head: () => ({ meta: [{ title: "Estimates — Free Accounting" }] }),
  component: () => <ComingSoon title="Estimates" description="Send quotes and proposals; convert them to invoices in one click." />,
});
