import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/accounting/ledger")({
  head: () => ({ meta: [{ title: "General ledger — Free Accounting" }] }),
  component: () => <ComingSoon title="General ledger" description="Drill into every transaction posted to every account." />,
});
