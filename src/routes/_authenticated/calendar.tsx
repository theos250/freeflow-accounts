import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/coming-soon";
export const Route = createFileRoute("/_authenticated/calendar")({
  head: () => ({ meta: [{ title: "Calendar — Free Accounting" }] }),
  component: () => <ComingSoon title="Calendar" description="See payment due dates, invoice reminders, and employee events in one view." items={["Payment due dates", "Invoice reminders", "Employee events"]} />,
});
