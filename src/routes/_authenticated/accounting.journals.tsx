import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/accounting/journals")({
  head: () => ({ meta: [{ title: "Journal entries — Free Accounting" }] }),
  component: () => <ComingSoon title="Journal entries" description="Post manual journal entries with debits, credits, and references." />,
});
