import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Crown,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,

  head: () => ({
    meta: [
      {
        title:
          "Pricing | FinFlowTrack Accounting Software Plans for Growing Businesses",
      },
      {
        name: "description",
        content:
          "Explore FinFlowTrack pricing plans designed for freelancers, startups, NGOs, and growing businesses. Choose flexible accounting software plans with invoicing, inventory, reporting, and team collaboration.",
      },
    ],
  }),
});


function PricingPage() {

  return (

    <div className="bg-background">


      {/* HERO */}

      <section className="border-b">

        <div className="container mx-auto max-w-7xl px-6 py-20">


          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">

            Simple & Transparent Pricing

          </span>



          <h1 className="mt-6 text-5xl font-bold tracking-tight lg:text-6xl">

            Choose the Plan That
            <br />
            Grows With Your Business

          </h1>



          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">

            FinFlowTrack provides flexible accounting solutions for freelancers,
            startups, nonprofits, and growing companies. Start with what you
            need today and upgrade as your business expands.

          </p>



          <div className="mt-10 flex flex-wrap gap-4">


            <Link
              to="/features"
              className="rounded-lg border px-6 py-3 hover:bg-muted"
            >

              Explore Features

            </Link>



            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground"
            >

              Talk to Sales

              <ArrowRight className="ml-2 h-4 w-4"/>

            </Link>


          </div>


        </div>

      </section>



      {/* TRUST SECTION */}


      <section className="container mx-auto max-w-7xl px-6 py-16">


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">



          <div className="rounded-xl border p-8">


            <ShieldCheck className="mb-5 h-10 w-10 text-primary"/>


            <h3 className="text-xl font-semibold">

              Secure Billing

            </h3>


            <p className="mt-4 text-muted-foreground">

              Your account information and payment data are handled with modern
              security practices.

            </p>


          </div>





          <div className="rounded-xl border p-8">


            <Sparkles className="mb-5 h-10 w-10 text-primary"/>


            <h3 className="text-xl font-semibold">

              Flexible Plans

            </h3>


            <p className="mt-4 text-muted-foreground">

              Select a plan based on your business size, users, companies,
              and required features.

            </p>


          </div>





          <div className="rounded-xl border p-8">


            <Users className="mb-5 h-10 w-10 text-primary"/>


            <h3 className="text-xl font-semibold">

              Team Ready

            </h3>


            <p className="mt-4 text-muted-foreground">

              Invite team members and control access using permissions.

            </p>


          </div>





          <div className="rounded-xl border p-8">


            <Lock className="mb-5 h-10 w-10 text-primary"/>


            <h3 className="text-xl font-semibold">

              No Hidden Costs

            </h3>


            <p className="mt-4 text-muted-foreground">

              Clear pricing designed to help businesses plan confidently.

            </p>


          </div>



        </div>


      </section>



      {/* PRICING CARDS */}


      <section className="bg-muted/40">


        <div className="container mx-auto max-w-7xl px-6 py-20">


          <div className="text-center">


            <h2 className="text-4xl font-bold">

              Plans Designed For Every Stage

            </h2>


            <p className="mt-6 text-muted-foreground">

              Whether you are starting alone or managing a growing company,
              FinFlowTrack scales with your needs.

            </p>


          </div>



          <div className="mt-16 grid gap-8 lg:grid-cols-3">



            {/* FREE */}


            <div className="rounded-2xl border bg-background p-8">


              <h3 className="text-2xl font-bold">

                Free

              </h3>


              <p className="mt-3 text-muted-foreground">

                For individuals and small businesses getting started.

              </p>



              <div className="mt-8 text-4xl font-bold">

                $0

                <span className="text-base font-normal text-muted-foreground">

                  /month

                </span>

              </div>


              <ul className="mt-8 space-y-4">


                {[
                  "Basic accounting",
                  "Invoice creation",
                  "Expense tracking",
                  "Customer management",
                  "Basic reports",
                ].map((item)=>(

                  <li
                    key={item}
                    className="flex items-center"
                  >

                    <Check className="mr-3 h-5 w-5 text-green-600"/>

                    {item}

                  </li>

                ))}


              </ul>


              <Link
                to="/signup"
                className="mt-10 block rounded-lg border px-6 py-3 text-center"
              >

                Start Free

              </Link>


            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
                          {/* PROFESSIONAL */}


            <div className="relative rounded-2xl border-2 border-primary bg-background p-8 shadow-lg">


              <div className="absolute -top-4 left-6 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">

                Most Popular

              </div>



              <div className="flex items-center gap-3">


                <Sparkles className="h-7 w-7 text-primary"/>


                <h3 className="text-2xl font-bold">

                  Professional

                </h3>


              </div>



              <p className="mt-3 text-muted-foreground">

                For growing businesses that need advanced accounting tools and
                collaboration.

              </p>



              <div className="mt-8 text-4xl font-bold">

                $19

                <span className="text-base font-normal text-muted-foreground">

                  /month

                </span>

              </div>



              <ul className="mt-8 space-y-4">


                {[
                  "Everything in Free",
                  "Unlimited invoices",
                  "Inventory management",
                  "Bank reconciliation",
                  "Advanced financial reports",
                  "Up to 5 team members",
                  "Multiple currencies",
                  "Priority support",
                ].map((item)=>(

                  <li
                    key={item}
                    className="flex items-center"
                  >

                    <Check className="mr-3 h-5 w-5 text-green-600"/>

                    {item}

                  </li>

                ))}


              </ul>



              <Link
                to="/signup"
                className="mt-10 block rounded-lg bg-primary px-6 py-3 text-center text-primary-foreground"
              >

                Upgrade to Professional

              </Link>


            </div>






            {/* BUSINESS */}



            <div className="rounded-2xl border bg-background p-8">


              <div className="flex items-center gap-3">


                <Building2 className="h-7 w-7 text-primary"/>


                <h3 className="text-2xl font-bold">

                  Business

                </h3>


              </div>




              <p className="mt-3 text-muted-foreground">

                Built for companies managing multiple departments and teams.

              </p>




              <div className="mt-8 text-4xl font-bold">

                $49

                <span className="text-base font-normal text-muted-foreground">

                  /month

                </span>

              </div>




              <ul className="mt-8 space-y-4">


                {[
                  "Everything in Professional",
                  "Unlimited team members",
                  "Unlimited companies",
                  "Advanced inventory",
                  "Custom financial reports",
                  "Role-based permissions",
                  "Audit logs",
                  "Business analytics",
                ].map((item)=>(

                  <li
                    key={item}
                    className="flex items-center"
                  >

                    <Check className="mr-3 h-5 w-5 text-green-600"/>

                    {item}

                  </li>

                ))}


              </ul>




              <Link
                to="/signup"
                className="mt-10 block rounded-lg border px-6 py-3 text-center hover:bg-muted"
              >

                Start Business Plan

              </Link>


            </div>



          </div>



        </div>


      </section>
              {/* ENTERPRISE SECTION */}
              <section className="container mx-auto max-w-7xl px-6 py-20">


        <div className="rounded-3xl border bg-background p-10 lg:flex lg:items-center lg:justify-between">


          <div className="max-w-3xl">


            <div className="flex items-center gap-3">


              <Crown className="h-8 w-8 text-primary"/>


              <h2 className="text-3xl font-bold">

                Enterprise

              </h2>


            </div>



            <p className="mt-5 text-lg text-muted-foreground">

              Designed for organizations requiring advanced security,
              dedicated support, custom integrations, and large-scale
              accounting operations.

            </p>



            <div className="mt-8 grid gap-4 md:grid-cols-2">


              {[
                "Unlimited companies",
                "Unlimited users",
                "Dedicated account manager",
                "Custom onboarding",
                "Advanced security controls",
                "Priority technical support",
              ].map((item)=>(

                <div
                  key={item}
                  className="flex items-center"
                >

                  <BadgeCheck className="mr-3 h-5 w-5 text-primary"/>

                  {item}

                </div>

              ))}


            </div>



          </div>



          <Link
            to="/contact"
            className="mt-8 inline-flex items-center rounded-lg bg-primary px-7 py-3 text-primary-foreground lg:mt-0"
          >

            Contact Sales

            <ArrowRight className="ml-2 h-4 w-4"/>

          </Link>



        </div>


      </section>
              {/* SUBSCRIPTION LIMITS */}


      <section className="bg-muted/40">


        <div className="container mx-auto max-w-7xl px-6 py-20">


          <div className="text-center">


            <h2 className="text-4xl font-bold">

              Subscription Limits That Scale With You

            </h2>


            <p className="mt-6 text-muted-foreground">

              Every plan is designed around real business growth. Upgrade when
              you need more companies, users, automation, and advanced controls.

            </p>


          </div>



          <div className="mt-12 overflow-x-auto">


            <table className="w-full overflow-hidden rounded-xl border bg-background">


              <thead>


                <tr className="border-b">


                  <th className="p-5 text-left">

                    Plan

                  </th>


                  <th className="p-5 text-left">

                    Companies

                  </th>


                  <th className="p-5 text-left">

                    Users

                  </th>


                  <th className="p-5 text-left">

                    Storage

                  </th>


                  <th className="p-5 text-left">

                    Support

                  </th>


                </tr>


              </thead>



              <tbody>


                {[
                  [
                    "Free",
                    "1 company",
                    "1 user",
                    "Basic",
                    "Community support",
                  ],

                  [
                    "Professional",
                    "Up to 3 companies",
                    "5 users",
                    "Expanded",
                    "Priority support",
                  ],

                  [
                    "Business",
                    "Unlimited",
                    "Unlimited",
                    "Advanced",
                    "Business support",
                  ],

                  [
                    "Enterprise",
                    "Unlimited",
                    "Unlimited",
                    "Custom",
                    "Dedicated support",
                  ],
                ].map((row)=>(


                  <tr
                    key={row[0]}
                    className="border-b last:border-none"
                  >

                    {row.map((cell)=>(

                      <td
                        key={cell}
                        className="p-5"
                      >

                        {cell}

                      </td>

                    ))}


                  </tr>


                ))}


              </tbody>



            </table>


          </div>



        </div>


      </section>
              {/* FEATURE COMPARISON */}


      <section className="container mx-auto max-w-7xl px-6 py-20">


        <div className="text-center">


          <h2 className="text-4xl font-bold">

            Compare FinFlowTrack Features

          </h2>


          <p className="mt-6 text-muted-foreground">

            Choose the plan that matches your accounting workflow today and
            upgrade as your organization grows.

          </p>


        </div>




        <div className="mt-12 overflow-x-auto">


          <table className="w-full rounded-xl border">


            <thead>

              <tr className="border-b">


                <th className="p-5 text-left">

                  Feature

                </th>


                <th className="p-5">

                  Free

                </th>


                <th className="p-5">

                  Professional

                </th>


                <th className="p-5">

                  Business

                </th>


                <th className="p-5">

                  Enterprise

                </th>


              </tr>

            </thead>



            <tbody>


              {[
                [
                  "Invoicing",
                  true,
                  true,
                  true,
                  true,
                ],

                [
                  "Expense tracking",
                  true,
                  true,
                  true,
                  true,
                ],

                [
                  "Inventory management",
                  false,
                  true,
                  true,
                  true,
                ],

                [
                  "Multi-company support",
                  false,
                  true,
                  true,
                  true,
                ],

                [
                  "Team permissions",
                  false,
                  true,
                  true,
                  true,
                ],

                [
                  "Advanced reporting",
                  false,
                  true,
                  true,
                  true,
                ],

                [
                  "Audit logs",
                  false,
                  false,
                  true,
                  true,
                ],

                [
                  "Dedicated support",
                  false,
                  false,
                  false,
                  true,
                ],

              ].map((feature)=>(


                <tr
                  key={feature[0]}
                  className="border-b"
                >

                  <td className="p-5 font-medium">

                    {feature[0]}

                  </td>


                  {feature.slice(1).map((available)=>(


                    <td
                      key={String(available)}
                      className="p-5 text-center"
                    >

                      {available ? (

                        <Check className="mx-auto h-5 w-5 text-green-600"/>

                      ) : (

                        <span className="text-muted-foreground">

                          —

                        </span>

                      )}

                    </td>


                  ))}


                </tr>


              ))}


            </tbody>


          </table>


        </div>


      </section>
              {/* UPGRADE LOGIC */}


      <section className="bg-muted/40">


        <div className="container mx-auto max-w-7xl px-6 py-20">


          <div className="max-w-4xl">


            <h2 className="text-4xl font-bold">

              How Subscription Upgrades Work

            </h2>



            <p className="mt-6 text-lg text-muted-foreground">

              FinFlowTrack automatically adjusts available features based on
              your subscription plan.

            </p>



            <div className="mt-10 space-y-6">


              {[
                "Free users can create one company and manage basic accounting operations.",
                "Professional users unlock additional companies, inventory, and team collaboration.",
                "Business users receive unlimited users, advanced permissions, and organization controls.",
                "Enterprise customers receive customized limits and dedicated assistance.",
              ].map((item)=>(


                <div
                  key={item}
                  className="flex gap-4"
                >

                  <BadgeCheck className="h-6 w-6 text-primary shrink-0"/>

                  <p>

                    {item}

                  </p>


                </div>


              ))}


            </div>


          </div>


        </div>


      </section>
              {/* FAQ SECTION */}


      <section className="container mx-auto max-w-7xl px-6 py-20">


        <div className="max-w-3xl">


          <h2 className="text-4xl font-bold">

            Frequently Asked Questions

          </h2>



          <p className="mt-6 text-muted-foreground">

            Everything you need to know about FinFlowTrack pricing,
            subscriptions, and business growth.

          </p>


        </div>



        <div className="mt-12 grid gap-6 lg:grid-cols-2">


          {[
            [
              "Can I start using FinFlowTrack for free?",
              "Yes. The Free plan allows individuals and small businesses to manage basic accounting workflows without requiring payment information.",
            ],

            [
              "Can I upgrade my subscription later?",
              "Yes. You can upgrade whenever your business requires additional companies, users, inventory features, or advanced reporting.",
            ],

            [
              "What happens when I reach my plan limits?",
              "When your account reaches a subscription limit, FinFlowTrack will guide you toward upgrading before enabling additional capacity.",
            ],

            [
              "Can I manage multiple companies?",
              "Yes. Multi-company management is available on Professional plans and above, with larger organizations supported through Business and Enterprise plans.",
            ],

            [
              "Can I invite employees or accountants?",
              "Yes. Team invitations and permissions depend on your subscription level. Higher plans provide more users and advanced access control.",
            ],

            [
              "Is my financial data secure?",
              "FinFlowTrack follows modern security practices including protected authentication, database security controls, and permission-based access.",
            ],

          ].map(([question, answer])=>(


            <div
              key={question}
              className="rounded-xl border p-6"
            >

              <h3 className="text-lg font-semibold">

                {question}

              </h3>


              <p className="mt-3 text-muted-foreground">

                {answer}

              </p>


            </div>


          ))}


        </div>


      </section>
              {/* BILLING TRUST */}


      <section className="bg-muted/40">


        <div className="container mx-auto max-w-7xl px-6 py-16">


          <div className="grid gap-8 md:grid-cols-3">


            <div className="rounded-xl border bg-background p-8">


              <ShieldCheck className="h-10 w-10 text-primary"/>


              <h3 className="mt-5 text-xl font-semibold">

                Secure Account Protection

              </h3>


              <p className="mt-4 text-muted-foreground">

                Your business information is protected through secure
                authentication and access controls.

              </p>


            </div>




            <div className="rounded-xl border bg-background p-8">


              <BadgeCheck className="h-10 w-10 text-primary"/>


              <h3 className="mt-5 text-xl font-semibold">

                Transparent Subscriptions

              </h3>


              <p className="mt-4 text-muted-foreground">

                Know exactly what your plan includes before upgrading. No
                unexpected feature restrictions.

              </p>


            </div>




            <div className="rounded-xl border bg-background p-8">


              <Users className="h-10 w-10 text-primary"/>


              <h3 className="mt-5 text-xl font-semibold">

                Built For Growing Teams

              </h3>


              <p className="mt-4 text-muted-foreground">

                Start small and expand your accounting operations as your
                company grows.

              </p>


            </div>



          </div>


        </div>


      </section>
              {/* FINAL CTA */}


      <section className="container mx-auto max-w-7xl px-6 py-24">


        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">


          <h2 className="text-4xl font-bold lg:text-5xl">

            Start Managing Your Business Finances Today

          </h2>



          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">

            Join businesses using FinFlowTrack to simplify accounting,
            invoicing, expenses, inventory, and financial reporting.

          </p>



          <div className="mt-10 flex flex-wrap justify-center gap-4">


            <Link
              to="/signup"
              className="rounded-lg bg-background px-7 py-3 text-foreground"
            >

              Create Free Account

            </Link>



            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg border border-primary-foreground/30 px-7 py-3"
            >

              Contact Sales

              <ArrowRight className="ml-2 h-4 w-4"/>

            </Link>


          </div>


        </div>


      </section>



    </div>

  );

}
