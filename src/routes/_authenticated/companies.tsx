import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/companies")({
  head: () => ({ meta: [{ title: "Companies — Free Accounting" }] }),
  component: () => <ComingSoon title="Multi-company workspace" description="Manage multiple businesses under one login. Switch instantly, keep books separate." items={["Company switcher", "Per-company users", "Consolidated reporting"]} />,
});
