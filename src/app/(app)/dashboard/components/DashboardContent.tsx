"use client";

import { useState } from "react";
import type { Subscription } from "@/types/subscription";
import SubscriptionList from "./SubscriptionList";
import DetailPanel from "./DetailPanel";
import MobileSubscriptionList from "./MobileSubscriptionList";

interface DashboardContentProps {
  subscriptions: Subscription[];
}

export default function DashboardContent({
  subscriptions,
}: DashboardContentProps) {
  // Both selection IDs are nullable. When null (or stale), the fallback
  // resolution below picks the first subscription in the current list.
  const [desktopSelectedId, setDesktopSelectedId] = useState<string | null>(
    subscriptions[0]?.id ?? null,
  );
  const [mobileSelectedId, setMobileSelectedId] = useState<string | null>(null);

  // Resolve the current selection. If the saved ID doesn't match anything in
  // the latest subscriptions list (e.g. the user just deleted it), we fall
  // back to the first subscription so the detail panel always has something
  // to show.
  const selectedSubscription =
    subscriptions.find((sub) => sub.id === desktopSelectedId) ??
    subscriptions[0];

  if (!selectedSubscription) return null;

  // Called by DetailPanel after a successful delete. We reset both selection
  // IDs so the fallback logic above naturally picks the new first
  // subscription. If the list becomes empty, page.tsx handles the empty
  // state — DashboardContent isn't even rendered.
  function handleDeleted() {
    setDesktopSelectedId(null);
    setMobileSelectedId(null);
  }

  return (
    <>
      {/* Mobile + tablet: single column, accordion cards */}
      <div className="mt-8 lg:hidden">
        <MobileSubscriptionList
          subscriptions={subscriptions}
          selectedId={mobileSelectedId}
          onSelect={setMobileSelectedId}
          onDeleted={handleDeleted}
        />
      </div>

      {/* Desktop: master-detail */}
      <div className="mt-12 hidden gap-6 lg:flex lg:items-start h-[500px]">
        <SubscriptionList
          subscriptions={subscriptions}
          selectedId={desktopSelectedId}
          onSelect={setDesktopSelectedId}
        />
        <DetailPanel
          subscription={selectedSubscription}
          onDeleted={handleDeleted}
        />
      </div>
    </>
  );
}