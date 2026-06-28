import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/items/categories")({
  head: () => ({ meta: [{ title: "Categories — Free Accounting" }] }),
  component: () => <ComingSoon title="Categories" description="Group products and services to power reporting and inventory analytics." />,
});
