import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/banking/accounts")({
  head: () => ({ meta: [{ title: "Bank accounts — Free Accounting" }] }),
  component: () => <ComingSoon title="Bank accounts" description="Connect every bank account, credit card, and wallet you use." />,
});
