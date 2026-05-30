"use client";

import type { Subscription } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";
import DetailPanel from "./DetailPanel";
import { AddSubscriptionButton } from "@/components/AddSubscriptionButton";

interface MobileSubscriptionListProps {
  subscriptions: Subscription[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function MobileSubscriptionList({
  subscriptions,
  selectedId,
  onSelect,
}: MobileSubscriptionListProps) {
  function handleCardClick(id: string) {
    onSelect(id === selectedId ? null : id);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Add button at the top — easier to reach than scrolling all the way down */}
      <div className="[&>button]:w-full">
        <AddSubscriptionButton variant="primary" />
      </div>

      {subscriptions.map((subscription) => {
        const isOpen = subscription.id === selectedId;

        return (
          <div key={subscription.id} className="flex flex-col">
            <SubscriptionCard
              subscription={subscription}
              isSelected={isOpen}
              onClick={() => handleCardClick(subscription.id)}
              showSummary
            />

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pt-3">
                  <DetailPanel subscription={subscription} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}