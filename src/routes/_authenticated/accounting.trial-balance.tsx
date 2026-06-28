import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/accounting/trial-balance")({
  head: () => ({ meta: [{ title: "Trial balance — Free Accounting" }] }),
  component: () => <ComingSoon title="Trial balance" description="Period-end trial balance with debit/credit totals per account." />,
});
