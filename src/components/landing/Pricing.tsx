import Link from "next/link";
import { Check, Leaf, Zap, Lock } from "lucide-react";

const freeFeatures = [
  "Manage all your subscriptions in one place",
  "See cost for your subscriptions",
  "See when your next billing is",
];

const proFeatures = [
  "Everything included in Free",
  "See total amount on a monthly or yearly basis",
  "Set custom reminders before next payment",
];

export default function Pricing() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-highlight/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-text-primary">
            Pricing
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Start for free, upgrade when you need more power. No hidden fees, ever.
          </p>
        </div>

        {/* Dark pricing block */}
        <div className="mt-14 rounded-[2rem] bg-pricing-bg p-4 shadow-xl sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
            {/* Free tier */}
            <div className="relative rounded-3xl border border-pricing-border bg-pricing-card p-7">
              <div className="absolute -top-4 left-7 flex h-10 w-10 items-center justify-center rounded-full bg-pricing-border text-pricing-text">
                <Leaf className="h-5 w-5" strokeWidth={2} />
              </div>
              <span className="inline-block rounded-md bg-pricing-border px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-pricing-text">
                Free
              </span>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-black text-pricing-text">€0</span>
                <span className="text-pricing-muted">/forever</span>
              </div>
              <p className="mt-3 text-pricing-muted">
                Essential tools to manage your basic subscriptions.
              </p>

              <div className="my-6 h-px bg-pricing-border" />

              <ul className="flex flex-col gap-4">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-pricing-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pricing-muted" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-8 block rounded-xl border border-pricing-border py-3.5 text-center font-semibold text-pricing-text transition-colors hover:bg-pricing-border"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro tier */}
            <div className="relative rounded-3xl border border-highlight bg-pricing-card p-7">
              <div className="absolute -top-4 left-7 flex h-10 w-10 items-center justify-center rounded-full bg-highlight text-text-primary shadow-[0_0_20px_rgba(255,214,10,0.5)]">
                <Zap className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="flex gap-2">
                <span className="inline-block rounded-md bg-highlight/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-highlight">
                  Pro
                </span>
                <span className="inline-block rounded-md bg-highlight px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-text-primary">
                  Best Value
                </span>
              </div>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-black text-pricing-text">€5</span>
                <span className="text-pricing-muted">/lifetime</span>
              </div>
              <p className="mt-3 text-pricing-muted">
                Advanced insights and custom reminders, forever.
              </p>

              <div className="my-6 h-px bg-pricing-border" />

              <ul className="flex flex-col gap-4">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-pricing-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-highlight" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-8 block rounded-xl bg-highlight py-3.5 text-center font-bold text-text-primary shadow-[0_0_24px_rgba(255,214,10,0.4)] transition-transform hover:scale-[1.02]"
              >
                Upgrade to Pro — €5
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-sm text-text-secondary">
          <Lock className="h-3.5 w-3.5" strokeWidth={2.5} />
          Secure payment via Stripe.
        </p>
      </div>
    </section>
  );
}