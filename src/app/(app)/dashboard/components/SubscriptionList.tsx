import type { Subscription } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";
import { AddSubscriptionButton } from "@/components/AddSubscriptionButton";

interface SubscriptionListProps {
  subscriptions: Subscription[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SubscriptionList({
  subscriptions,
  selectedId,
  onSelect,
}: SubscriptionListProps) {
  return (
    <div className="flex w-95 flex-col h-full">
      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-y-auto p-1 -mx-1">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            isSelected={subscription.id === selectedId}
            onClick={() => onSelect(subscription.id)}
          />
        ))}
      </div>

      <div className="pt-6 [&>button]:w-full">
        <AddSubscriptionButton variant="primary" />
      </div>
    </div>
  );
}