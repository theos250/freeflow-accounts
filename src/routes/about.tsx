import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: "About FinFlowTrack | Smart Accounting for Growing Businesses",
      },
      {
        name: "description",
        content:
          "Learn about FinFlowTrack, our mission, vision, security commitment, and how we're helping businesses manage their finances with confidence.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-5xl font-bold tracking-tight">
        About FinFlowTrack
      </h1>

      <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
        FinFlowTrack is a modern cloud accounting platform designed for
        freelancers, startups, NGOs, and growing businesses. Our mission is to
        simplify financial management through secure, intelligent, and scalable
        software.
      </p>

      {/* Additional sections:
          - Mission
          - Vision
          - Features
          - Security
          - Roadmap
          - FAQ
          - CTA
      */}
    </main>
  );
}
