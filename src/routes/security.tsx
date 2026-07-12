import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Database,
  Eye,
  Lock,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const Route = createFileRoute("/security")({
  component: SecurityPage,

  head: () => ({
    meta: [
      {
        title:
          "Security | How FinFlowTrack Protects Your Financial Data",
      },
      {
        name: "description",
        content:
          "Learn how FinFlowTrack helps protect business and financial information through modern authentication, encryption, access controls, secure cloud infrastructure, and continuous security improvements.",
      },
    ],
  }),
});

function SecurityPage() {

  return (

    <div className="bg-background">

      {/* HERO */}

      <section className="border-b">

        <div className="container mx-auto max-w-7xl px-6 py-20">

          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">

            Security Center

          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-6xl">

            Security Built Into
            <br />
            Every Layer

          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">

            FinFlowTrack is designed with security in mind. We continuously
            improve our platform to help protect financial information,
            business records, and customer accounts using modern development
            and operational practices.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/privacy"
              className="rounded-lg border px-6 py-3 hover:bg-muted"
            >

              Privacy Policy

            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground"
            >

              Contact Security Team

              <ArrowRight className="ml-2 h-4 w-4"/>

            </Link>

          </div>

        </div>

      </section>





      {/* TRUST */}

      <section className="container mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border p-8">

            <ShieldCheck className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Secure Architecture
            </h3>

            <p className="mt-4 text-muted-foreground">
              Security considerations are incorporated throughout the design,
              development, and operation of the platform.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <Lock className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Protected Accounts
            </h3>

            <p className="mt-4 text-muted-foreground">
              Authentication and authorization controls help reduce
              unauthorized access to customer accounts.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <Database className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Reliable Infrastructure
            </h3>

            <p className="mt-4 text-muted-foreground">
              Customer information is stored using managed cloud
              infrastructure designed for availability and resilience.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <BadgeCheck className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Continuous Improvement
            </h3>

            <p className="mt-4 text-muted-foreground">
              We regularly review our platform and implement improvements to
              strengthen security and reliability.
            </p>

          </div>

        </div>

      </section>





      {/* SECURITY PRINCIPLES */}

      <section className="bg-muted/40">

        <div className="container mx-auto max-w-6xl px-6 py-20">

          <h2 className="text-4xl font-bold">

            Our Security Principles

          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">

            Protecting customer information requires a combination of secure
            technology, responsible operational practices, and continuous
            monitoring. Our approach focuses on reducing risk while providing
            a dependable accounting platform.

          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">

            <div className="rounded-xl border bg-background p-8">

              <Lock className="mb-5 h-10 w-10 text-primary"/>

              <h3 className="text-2xl font-semibold">
                Authentication & Access
              </h3>

              <ul className="mt-6 space-y-3 text-muted-foreground">

                <li>• Secure authentication</li>
                <li>• Role-based permissions</li>
                <li>• Company-level access isolation</li>
                <li>• Controlled administrative privileges</li>
                <li>• Session management</li>

              </ul>

            </div>

            <div className="rounded-xl border bg-background p-8">

              <Server className="mb-5 h-10 w-10 text-primary"/>

              <h3 className="text-2xl font-semibold">
                Platform Protection
              </h3>

              <ul className="mt-6 space-y-3 text-muted-foreground">

                <li>• Encrypted HTTPS communication</li>
                <li>• Secure cloud infrastructure</li>
                <li>• Database protection</li>
                <li>• Backup strategies</li>
                <li>• Infrastructure monitoring</li>

              </ul>

            </div>

          </div>

        </div>

      </section>
            {/* DATA PROTECTION */}

      <section className="container mx-auto max-w-7xl px-6 py-24">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Protecting Customer Data
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Financial information is among the most sensitive data a business
            manages. FinFlowTrack is designed with multiple layers of technical
            and operational safeguards to help protect customer information.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          <div className="rounded-xl border p-8">

            <Lock className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Encryption in Transit
            </h3>

            <p className="mt-4 text-muted-foreground">
              Communication between users and the platform is protected using
              encrypted HTTPS connections to reduce the risk of interception.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <Database className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Secure Data Storage
            </h3>

            <p className="mt-4 text-muted-foreground">
              Customer information is stored within managed cloud
              infrastructure designed for reliability, resilience,
              and operational security.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <ShieldCheck className="mb-5 h-10 w-10 text-primary"/>

            <h3 className="text-xl font-semibold">
              Continuous Protection
            </h3>

            <p className="mt-4 text-muted-foreground">
              Security controls are reviewed and improved as the platform
              evolves to address emerging risks and operational needs.
            </p>

          </div>

        </div>

      </section>





      {/* ACCESS CONTROL */}

      <section className="bg-muted/40">

        <div className="container mx-auto max-w-7xl px-6 py-24">

          <div className="grid gap-14 lg:grid-cols-2">

            <div>

              <UserCheck className="mb-6 h-12 w-12 text-primary"/>

              <h2 className="text-4xl font-bold">
                Role-Based Access Control
              </h2>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                FinFlowTrack supports role-based permissions so organizations
                can control who can view, edit, approve, or manage different
                areas of the platform.
              </p>

              <p className="mt-6 leading-8 text-muted-foreground">
                Businesses can assign permissions according to operational
                responsibilities while reducing unnecessary access to
                financial information.
              </p>

            </div>

            <div className="space-y-5">

              {[
                "Organization Administrators",
                "Company Administrators",
                "Accountants",
                "Finance Managers",
                "Sales & Invoicing",
                "Inventory Managers",
                "Payroll Managers",
                "Read-only Access",
              ].map((role)=>(

                <div
                  key={role}
                  className="flex items-center rounded-xl border bg-background p-5"
                >

                  <BadgeCheck className="mr-4 h-5 w-5 text-primary"/>

                  {role}

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>





      {/* MULTI-COMPANY SECURITY */}

      <section className="container mx-auto max-w-7xl px-6 py-24">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Multi-Company Data Isolation
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            FinFlowTrack supports multiple companies within a single account
            while keeping financial records logically separated according to
            the organizations a user is authorized to access.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {[
            {
              title:"Company Separation",
              desc:"Accounting records remain associated with their respective organizations."
            },
            {
              title:"Permission Controls",
              desc:"Users only access companies they've been invited to."
            },
            {
              title:"Subscription Limits",
              desc:"Company limits depend on the selected subscription plan."
            },
            {
              title:"Secure Collaboration",
              desc:"Invite employees while maintaining appropriate access controls."
            }
          ].map((item)=>(

            <div
              key={item.title}
              className="rounded-xl border p-8"
            >

              <Building2 className="mb-5 h-10 w-10 text-primary"/>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-muted-foreground">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>





      {/* AUDIT LOGGING */}

      <section className="bg-muted/40">

        <div className="container mx-auto max-w-6xl px-6 py-24">

          <h2 className="text-4xl font-bold">
            Audit Logging & Accountability
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Recording important activities helps organizations understand
            changes made within their accounting environment and supports
            operational accountability.
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">

            <div className="rounded-xl border bg-background p-8">

              <Eye className="mb-5 h-10 w-10 text-primary"/>

              <h3 className="text-2xl font-semibold">
                Activity Visibility
              </h3>

              <p className="mt-5 text-muted-foreground leading-8">
                Important administrative and financial events may be recorded
                to assist with operational reviews, troubleshooting, and
                business governance.
              </p>

            </div>

            <div className="rounded-xl border bg-background p-8">

              <Database className="mb-5 h-10 w-10 text-primary"/>

              <h3 className="text-2xl font-semibold">
                Change History
              </h3>

              <p className="mt-5 text-muted-foreground leading-8">
                Audit records help organizations understand when significant
                changes occurred and support responsible financial management.
              </p>

            </div>

          </div>

        </div>

      </section>





      {/* BACKUPS */}

      <section className="container mx-auto max-w-6xl px-6 py-24">

        <h2 className="text-4xl font-bold">
          Backups & Business Continuity
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Reliable accounting software requires planning for unexpected
          events. FinFlowTrack is designed with operational resilience in
          mind, including backup strategies and recovery planning appropriate
          to the services provided.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {[
            "Managed Infrastructure",
            "Database Backups",
            "Recovery Planning",
            "Continuous Improvements",
          ].map((item)=>(

            <div
              key={item}
              className="rounded-xl border p-8 text-center"
            >

              <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-primary"/>

              <h3 className="font-semibold">
                {item}
              </h3>

            </div>

          ))}

        </div>

      </section>
            {/* SECURITY MONITORING */}

      <section className="bg-muted/40">

        <div className="container mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Continuous Security Monitoring
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              Security is an ongoing process. We continually review platform
              performance, operational events, and security-related activities
              to improve reliability and reduce potential risks.
            </p>

          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-4">

            {[
              {
                title: "Application Monitoring",
                desc: "Monitor platform health and availability."
              },
              {
                title: "Infrastructure Monitoring",
                desc: "Observe cloud infrastructure performance and stability."
              },
              {
                title: "Operational Reviews",
                desc: "Review important operational events to improve reliability."
              },
              {
                title: "Continuous Improvements",
                desc: "Regularly enhance platform security and resilience."
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-xl border bg-background p-8"
              >

                <ShieldCheck className="mb-5 h-10 w-10 text-primary" />

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-muted-foreground">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>





      {/* SECURE DEVELOPMENT */}

      <section className="container mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-14 lg:grid-cols-2">

          <div>

            <Server className="mb-6 h-12 w-12 text-primary"/>

            <h2 className="text-4xl font-bold">
              Secure Software Development
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">

              Security considerations are integrated throughout our software
              development lifecycle. New features, updates, and improvements
              are reviewed with security, reliability, and maintainability
              in mind.

            </p>

          </div>

          <div className="space-y-5">

            {[
              "Code reviews",
              "Dependency management",
              "Authentication reviews",
              "Database security",
              "Permission validation",
              "Quality assurance testing",
              "Production monitoring",
              "Continuous platform improvements",
            ].map((item)=>(

              <div
                key={item}
                className="flex items-center rounded-xl border p-5"
              >

                <BadgeCheck className="mr-4 h-5 w-5 text-primary"/>

                {item}

              </div>

            ))}

          </div>

        </div>

      </section>





      {/* RESPONSIBLE DISCLOSURE */}

      <section className="bg-muted/40">

        <div className="container mx-auto max-w-6xl px-6 py-24">

          <h2 className="text-4xl font-bold">
            Responsible Vulnerability Disclosure
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">

            We appreciate responsible security research. If you believe you've
            identified a potential security issue within FinFlowTrack, we
            encourage you to report it privately so we can investigate and
            address it appropriately.

          </p>

          <div className="mt-12 rounded-xl border bg-background p-8">

            <h3 className="text-2xl font-semibold">
              Reporting Guidelines
            </h3>

            <ul className="mt-6 space-y-4 text-muted-foreground">

              <li>• Report findings responsibly and privately.</li>

              <li>• Allow reasonable time for investigation.</li>

              <li>• Do not access customer information without authorization.</li>

              <li>• Avoid disrupting production services.</li>

              <li>• Include reproduction steps whenever possible.</li>

            </ul>

          </div>

        </div>

      </section>





      {/* FAQ */}

      <section className="container mx-auto max-w-5xl px-6 py-24">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-16 space-y-8">

          <div className="rounded-xl border p-8">

            <h3 className="text-xl font-semibold">
              Is FinFlowTrack cloud-based?
            </h3>

            <p className="mt-4 text-muted-foreground">
              Yes. FinFlowTrack is designed as a cloud accounting platform,
              allowing authorized users to securely access business data online.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <h3 className="text-xl font-semibold">
              How is access controlled?
            </h3>

            <p className="mt-4 text-muted-foreground">
              Organizations can assign permissions to users based on their
              responsibilities using role-based access controls.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <h3 className="text-xl font-semibold">
              Are backups performed?
            </h3>

            <p className="mt-4 text-muted-foreground">
              FinFlowTrack is designed with backup and operational resilience
              strategies to support business continuity.
            </p>

          </div>

          <div className="rounded-xl border p-8">

            <h3 className="text-xl font-semibold">
              How can I report a security concern?
            </h3>

            <p className="mt-4 text-muted-foreground">
              Please contact our security team using the contact information
              below. We appreciate responsible disclosure of potential issues.
            </p>

          </div>

        </div>

      </section>





      {/* CONTACT */}

      <section className="bg-muted/40">

        <div className="container mx-auto max-w-6xl px-6 py-24">

          <div className="rounded-3xl border bg-background p-10">

            <h2 className="text-4xl font-bold">
              Contact the Security Team
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">

              If you have questions regarding platform security or wish to
              report a potential security issue, please contact our team.

            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div>

                <h3 className="font-semibold">
                  Security Contact
                </h3>

                <p className="mt-2 text-muted-foreground">
                  security@finflowtrack.com
                </p>

              </div>

              <div>

                <h3 className="font-semibold">
                  General Support
                </h3>

                <p className="mt-2 text-muted-foreground">
                  support@finflowtrack.com
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>





      {/* FINAL CTA */}

      <section className="border-t">

        <div className="container mx-auto max-w-5xl px-6 py-24 text-center">

          <h2 className="text-5xl font-bold">
            Security Is a Continuous Commitment
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-muted-foreground">

            FinFlowTrack is committed to continuously improving security,
            protecting customer information, and maintaining a dependable
            accounting platform for businesses around the world.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Link
              to="/privacy"
              className="rounded-lg border px-8 py-4"
            >
              Privacy Policy
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-primary px-8 py-4 text-primary-foreground"
            >
              Contact Us

              <ArrowRight className="ml-2 h-4 w-4"/>

            </Link>

          </div>

        </div>

      </section>

    </div>

  );

}
