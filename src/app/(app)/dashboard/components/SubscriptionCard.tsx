"use client";

import { ChevronDown } from "lucide-react";
import type { Subscription } from "@/types/subscription";
import { getLogoColor, getLogoInitial } from "@/lib/logo";
import { formatCurrency, capitalize } from "@/lib/format";
import { cn } from "@/lib/cn";

interface SubscriptionCardProps {
  subscription: Subscription;
  isSelected: boolean;
  onClick: () => void;
  /**
   * When true, renders the price summary line and chevron — used on mobile/tablet
   * where cards are the only surface for subscription info.
   * When false, card is minimal (logo + name only) — used on desktop where
   * the detail panel shows everything.
   */
  showSummary?: boolean;
}

export default function SubscriptionCard({
  subscription,
  isSelected,
  onClick,
  showSummary = false,
}: SubscriptionCardProps) {
  const { bg, fg } = getLogoColor(subscription.name);
  const initial = getLogoInitial(subscription.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl bg-surface px-4 py-3 text-left",
        "transition-all hover:opacity-90",
        isSelected && "ring-2 ring-accent",
      )}
    >
      {/* Avatar */}
      <div
        className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: bg }}
      >
        <span className="text-xl font-semibold" style={{ color: fg }}>
          {initial}
        </span>
      </div>

      {/* Name + (optional) summary */}
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-base font-semibold text-text-primary truncate">
          {subscription.name}
        </span>
        {showSummary && (
          <span className="text-sm text-text-secondary">
            {formatCurrency(subscription.price, subscription.currency)}
            {" · "}
            {capitalize(subscription.billingCycle)}
          </span>
        )}
      </div>

      {/* Chevron — only when summary is shown (mobile) */}
      {showSummary && (
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-text-secondary transition-transform duration-300",
            isSelected && "rotate-180",
          )}
        />
      )}
    </button>
  );
}