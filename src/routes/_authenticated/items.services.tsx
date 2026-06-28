import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/items/services")({
  head: () => ({ meta: [{ title: "Services — Free Accounting" }] }),
  component: () => <ComingSoon title="Services" description="Define billable services, hourly rates, and service packages for your invoices." items={["Service catalog", "Hourly rates", "Packages"]} />,
});
