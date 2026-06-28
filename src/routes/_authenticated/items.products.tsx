import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/items/products")({
  head: () => ({ meta: [{ title: "Products — Free Accounting" }] }),
  component: () => <ComingSoon title="Products" description="Manage your product catalog: SKUs, pricing, stock levels, variants, and barcodes." items={["Catalog", "Pricing rules", "Variants", "Barcodes", "Bulk import"]} />,
});
