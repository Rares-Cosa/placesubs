import type { Subscription, SubscriptionCategory } from "@/types/subscription";

const categoryColors: Record<SubscriptionCategory, string> = {
  entertainment: "bg-category-entertainment",
  productivity: "bg-category-productivity",
  health: "bg-category-health",
};

interface SubscriptionCardProps {
  subscription: Subscription;
  isSelected: boolean;
  onClick: () => void;
}

export default function SubscriptionCard({
  subscription,
  isSelected,
  onClick,
}: SubscriptionCardProps) {
  const logoColor = categoryColors[subscription.category];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl bg-surface px-4 py-3 text-left transition-all hover:opacity-90 ${
        isSelected ? "ring-2 ring-accent" : ""
      }`}
    >
      <div
        className={`flex h-13 w-13 items-center justify-center rounded-xl ${logoColor}`}
      >
        <span className="text-xl font-semibold text-text-primary">
          {subscription.logo}
        </span>
      </div>
      <span className="text-base font-semibold text-text-primary">
        {subscription.name}
      </span>
    </button>
  );
}