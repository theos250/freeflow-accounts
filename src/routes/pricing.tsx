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


            </div/>
