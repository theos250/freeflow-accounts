import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/purchases/bills")({
  head: () => ({ meta: [{ title: "Bills — Free Accounting" }] }),
  component: () => <ComingSoon title="Bills" description="Manage vendor bills, due dates, and payment scheduling." />,
});
