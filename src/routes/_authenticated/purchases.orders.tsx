import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/purchases/orders")({
  head: () => ({ meta: [{ title: "Purchase orders — Free Accounting" }] }),
  component: () => <ComingSoon title="Purchase orders" description="Create POs, track approvals, and convert to bills on receipt." />,
});
