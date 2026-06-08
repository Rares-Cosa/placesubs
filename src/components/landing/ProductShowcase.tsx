import { ClipboardList, Clock, LineChart, CheckCircle2 } from "lucide-react";

const subscriptions = [
  { id: "streaming", letter: "S", name: "Streaming", category: "entertainment" },
  { id: "cloud", letter: "C", name: "Cloud Storage", category: "productivity" },
  { id: "gym", emoji: "💪", name: "Gym", category: "health" },
] as const;

const categoryBg: Record<string, string> = {
  entertainment: "bg-category-entertainment",
  productivity: "bg-category-productivity",
  health: "bg-category-health",
};

const features = [
  {
    Icon: ClipboardList,
    title: "Track All Subscriptions",
    description: "See every subscription you have, with costs, billing dates, and renewal dates.",
    bullets: ["View all subscriptions in one dashboard", "Compare costs across different providers"],
  },
  {
    Icon: Clock,
    title: "Set Reminders",
    description: "Get notified before your next payment, so you don't miss renewals.",
    bullets: ["Custom reminders for any subscription", "Get alerts for upcoming renewals"],
  },
  {
    Icon: LineChart,
    title: "See Total Costs",
    description: "Calculate your total subscription costs and avoid overpaying.",
    bullets: ["Monthly and yearly cost comparisons", "Identify subscriptions you can cancel"],
  },
] as const;

export default function ProductShowcase() {
  return (
    <section id="features" className="bg-surface px-6 pt-16 pb-24">
      {/* Heading + subtext — stays narrow */}
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Optimize Your Subscriptions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
          See exactly where your money goes — every subscription in one clear view.
        </p>
      </div>

      {/* Feature cards — wider container so they spread on large screens */}
      <div className="mx-auto mt-14 max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-border bg-surface p-7 shadow-sm"
            >
              <feature.Icon className="h-8 w-8 text-highlight" strokeWidth={2} />
              <h3 className="mt-5 text-xl font-bold text-text-primary">{feature.title}</h3>
              <p className="mt-3 text-text-secondary">{feature.description}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-highlight" strokeWidth={2.5} />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard showcase — stays narrow */}
      <div className="mx-auto mt-20 max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: list + add button */}
          <div className="flex flex-col gap-3">
            {subscriptions.map((sub) => {
              const selected = sub.id === "streaming";
              return (
                <div
                  key={sub.id}
                  className={`flex items-center gap-4 rounded-2xl border bg-surface p-4 ${
                    selected ? "border-text-primary order-last md:order-0" : "border-border"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-text-primary ${categoryBg[sub.category]}`}
                  >
                    {"emoji" in sub ? sub.emoji : sub.letter}
                  </div>
                  <span className="font-medium text-text-primary">{sub.name}</span>
                </div>
              );
            })}

            <div className="order-first flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-4 font-semibold text-surface md:order-0 md:mt-auto">
              <span aria-hidden>+</span>
              Add Subscription
            </div>
          </div>

          {/* Right: detail card */}
          <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-category-entertainment text-base font-bold text-text-primary">
                S
              </div>
              <div>
                <p className="text-xl font-bold text-text-primary">Streaming</p>
                <p className="text-sm text-text-secondary">Entertainment</p>
              </div>
            </div>

            <div className="my-6 h-px bg-border" />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Next Billing
                </p>
                <p className="mt-1 text-2xl font-bold text-text-primary">Apr 26, 2026</p>
              </div>
              <span className="rounded-full bg-card-inset px-3 py-1 text-sm text-text-secondary">
                in 7 days
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-card-inset p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Price
                </p>
                <p className="mt-1 text-xl font-bold text-text-primary">$15.99</p>
              </div>
              <div className="rounded-2xl bg-card-inset p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Billing
                </p>
                <p className="mt-1 text-xl font-bold text-text-primary">Monthly</p>
              </div>
            </div>

            <div className="my-6 h-px bg-border" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                Total Spent
              </p>
              <p className="mt-1 text-xl font-bold text-text-primary">
                $191.88 <span className="text-sm font-normal text-text-secondary">over 12 months</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}