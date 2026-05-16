import type { Subscription } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";
import AddSubscriptionButton from "./AddSubscriptionButton";

interface SubscriptionListProps {
  subscriptions: Subscription[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SubscriptionList({
  subscriptions,
  selectedId,
  onSelect,
}: SubscriptionListProps) {
  return (
    <div className="flex w-95 flex-col">
      <div className="flex flex-col gap-3">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            isSelected={subscription.id === selectedId}
            onClick={() => onSelect(subscription.id)}
          />
        ))}
      </div>

      <div className="mt-auto pt-6">
        <AddSubscriptionButton />
      </div>
    </div>
  );
}