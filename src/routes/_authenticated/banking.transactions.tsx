import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/banking/transactions")({
  head: () => ({ meta: [{ title: "Transactions — Free Accounting" }] }),
  component: () => (
    <ComingSoon
      title="Transactions"
      description="Search, categorize, and split every transaction across your accounts."
    />
  ),
});
