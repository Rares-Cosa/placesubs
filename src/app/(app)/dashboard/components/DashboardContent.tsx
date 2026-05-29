"use client";

import { useState } from "react";
import type { Subscription } from "@/types/subscription";
import SubscriptionList from "./SubscriptionList";
import DetailPanel from "./DetailPanel";
import MobileSubscriptionList from "./MobileSubscriptionList";

interface DashboardContentProps {
  subscriptions: Subscription[];
}

export default function DashboardContent({ subscriptions }: DashboardContentProps) {
  // Desktop: first subscription is selected by default (always visible in detail panel)
  const [desktopSelectedId, setDesktopSelectedId] = useState<string>(
    subscriptions[0].id,
  );

  // Mobile: nothing is open by default — user taps to expand
  const [mobileSelectedId, setMobileSelectedId] = useState<string | null>(null);

  const selectedSubscription = subscriptions.find(
    (sub) => sub.id === desktopSelectedId,
  );

  if (!selectedSubscription) return null;

  return (
    <>
      {/* Mobile + tablet: single column, accordion cards */}
      <div className="mt-8 lg:hidden">
        <MobileSubscriptionList
          subscriptions={subscriptions}
          selectedId={mobileSelectedId}
          onSelect={setMobileSelectedId}
        />
      </div>

      {/* Desktop: master-detail */}
      <div className="mt-12 hidden gap-6 lg:flex">
        <SubscriptionList
          subscriptions={subscriptions}
          selectedId={desktopSelectedId}
          onSelect={setDesktopSelectedId}
        />
        <DetailPanel subscription={selectedSubscription} />
      </div>
    </>
  );
}