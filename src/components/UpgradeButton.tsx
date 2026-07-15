"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/app/(app)/dashboard/checkout-actions";

export default function UpgradeButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    // The action redirects to Stripe on success; if it returns, it errored.
    const result = await createCheckoutSession();
    if (result && !result.ok) {
      setIsLoading(false);
      // Could show result.error here; keeping it simple for now.
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={isLoading}
      className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface transition-opacity disabled:opacity-60"
    >
      {isLoading ? "Redirecting…" : "Upgrade to Pro — €5"}
    </button>
  );
}