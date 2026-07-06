import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/banking/transfers")({
  head: () => ({ meta: [{ title: "Transfers — Free Accounting" }] }),
  component: () => (
    <ComingSoon
      title="Transfers"
      description="Move money between your accounts and keep books balanced."
    />
  ),
});
