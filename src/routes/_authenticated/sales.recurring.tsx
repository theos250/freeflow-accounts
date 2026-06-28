import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/sales/recurring")({
  head: () => ({ meta: [{ title: "Recurring invoices — Free Accounting" }] }),
  component: () => <ComingSoon title="Recurring invoices" description="Automate subscription billing on weekly, monthly, or annual schedules." />,
});
