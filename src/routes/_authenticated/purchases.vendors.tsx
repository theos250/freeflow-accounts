import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/purchases/vendors")({
  head: () => ({ meta: [{ title: "Vendors — Free Accounting" }] }),
  component: () => <ComingSoon title="Vendors" description="Track your suppliers, contact details, payment terms, and 1099 status." />,
});
