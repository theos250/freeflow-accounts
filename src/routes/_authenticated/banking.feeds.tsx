import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/banking/feeds")({
  head: () => ({ meta: [{ title: "Bank feeds — Free Accounting" }] }),
  component: () => (
    <ComingSoon
      title="Bank feeds"
      description="Automatic daily sync of transactions via Plaid and direct bank feeds."
    />
  ),
});
