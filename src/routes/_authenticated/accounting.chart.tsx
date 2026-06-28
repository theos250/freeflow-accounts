import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/accounting/chart")({
  head: () => ({ meta: [{ title: "Chart of accounts — Free Accounting" }] }),
  component: () => <ComingSoon title="Chart of accounts" description="A complete double-entry chart of accounts customizable to your business." />,
});
