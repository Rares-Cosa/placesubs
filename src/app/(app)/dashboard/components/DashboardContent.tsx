"use client";

import { useState } from "react";
import type { Subscription } from "@/types/subscription";
import SubscriptionList from "./SubscriptionList";
import DetailPanel from "./DetailPanel";

interface DashboardContentProps {
  subscriptions: Subscription[];
}

export default function DashboardContent({ subscriptions }: DashboardContentProps) {
  // State: which subscription is currently selected
  const [selectedId, setSelectedId] = useState<string>(subscriptions[0].id);

  // Find the full subscription object from the ID
  const selectedSubscription = subscriptions.find((sub) => sub.id === selectedId);

  // Safety fallback in case the passed value is empty
  if (!selectedSubscription) {
    return null;
  }

  return (
    <div className="mt-12 flex gap-6">
      <SubscriptionList
        subscriptions={subscriptions}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <DetailPanel subscription={selectedSubscription} />
    </div>
  );
}