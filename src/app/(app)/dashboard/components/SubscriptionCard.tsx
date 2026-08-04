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
  showSummary?: boolean;
  /** Show the accordion chevron (mobile only). */
  showChevron?: boolean;
  /** Show a red "overdue" dot in the top-right. */
  isOverdue?: boolean;
}

export default function SubscriptionCard({
  subscription,
  isSelected,
  onClick,
  showSummary = false,
  showChevron = false,
  isOverdue = false,
}: SubscriptionCardProps) {
  const { bg, fg } = getLogoColor(subscription.name);
  const initial = getLogoInitial(subscription.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left",
        "cursor-pointer transition-colors",
        isSelected
          ? "bg-surface border border-border shadow-sm"
          : "bg-transparent border border-transparent hover:bg-surface/60",
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

      {/* Trailing indicators — overdue dot + chevron, grouped */}
      {(isOverdue || showChevron) && (
        <div className="flex shrink-0 items-center gap-2">
          {isOverdue && (
            <span className="h-2 w-2 rounded-full bg-red-500" />
          )}
          {showChevron && (
            <ChevronDown
              className={cn(
                "h-5 w-5 text-text-secondary transition-transform duration-300",
                isSelected && "rotate-180",
              )}
            />
          )}
        </div>
      )}
    </button>
  );
}