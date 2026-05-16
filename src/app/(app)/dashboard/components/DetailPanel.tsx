import type { Subscription, SubscriptionCategory } from "@/types/subscription";
import {
  getDaysUntil,
  formatDate,
  formatCurrency,
  capitalize,
  calculateTotalSpent,
} from "@/lib/format";

const categoryColors: Record<SubscriptionCategory, string> = {
  entertainment: "bg-category-entertainment",
  productivity: "bg-category-productivity",
  health: "bg-category-health",
};

const categoryLabels: Record<SubscriptionCategory, string> = {
  entertainment: "Entertainment",
  productivity: "Productivity",
  health: "Health",
};

interface DetailPanelProps {
  subscription: Subscription;
}

export default function DetailPanel({ subscription }: DetailPanelProps) {
  const logoColor = categoryColors[subscription.category];
  const categoryLabel = categoryLabels[subscription.category];
  const daysUntil = getDaysUntil(subscription.nextBillingDate);
  const formattedDate = formatDate(subscription.nextBillingDate);
  const formattedPrice = formatCurrency(subscription.price, subscription.currency);
  const billingLabel = capitalize(subscription.billingCycle);
  const { total, monthsCount } = calculateTotalSpent(
    subscription.price,
    subscription.billingCycle,
    subscription.startDate
  );
  const formattedTotal = formatCurrency(total, subscription.currency);

  return (
    <div className="flex flex-1 flex-col gap-8 rounded-3xl bg-surface p-10">
      {/* Header — logo + name/category + edit button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-13 w-13 items-center justify-center rounded-xl ${logoColor}`}
          >
            <span className="text-xl font-semibold text-text-primary">
              {subscription.logo}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[28px] font-bold leading-none text-text-primary">
              {subscription.name}
            </h2>
            <p className="text-sm font-medium text-text-secondary">
              {categoryLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Edit subscription"
          className="text-xl hover:opacity-70 transition-opacity"
        >
          ✏️
        </button>
      </div>

      <div className="h-px bg-border" />

      {/* Next billing section */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          Next billing
        </p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-text-primary">
            {formattedDate}
          </p>
          <span className="rounded-full bg-category-entertainment px-3 py-1.5 text-[13px] font-medium text-text-primary">
            {daysUntil}
          </span>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Info cards — Price + Billing */}
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-card-inset p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Price
          </p>
          <p className="text-2xl font-bold text-text-primary">{formattedPrice}</p>
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-card-inset p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Billing
          </p>
          <p className="text-2xl font-bold text-text-primary">{billingLabel}</p>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Total spent insight */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          Total spent
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-text-primary">{formattedTotal}</p>
          <p className="text-[15px] font-medium text-text-secondary">
            over {monthsCount} months
          </p>
        </div>
      </div>
    </div>
  );
}