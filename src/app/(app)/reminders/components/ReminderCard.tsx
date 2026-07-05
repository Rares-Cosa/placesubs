"use client";

import { useState } from "react";
import type { Subscription } from "@/types/subscription";
import { updateReminder } from "@/app/(app)/dashboard/actions";

type ReminderKey = "oneWeek" | "threeDays" | "dayBefore";

const OPTIONS: { key: ReminderKey; label: string }[] = [
  { key: "oneWeek", label: "1 week" },
  { key: "threeDays", label: "3 days" },
  { key: "dayBefore", label: "Day before" },
];

function formatRenews(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ReminderCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  // Local state seeded from the DB values, so toggles feel instant.
  const [prefs, setPrefs] = useState({
    oneWeek: subscription.remindOneWeek,
    threeDays: subscription.remindThreeDays,
    dayBefore: subscription.remindDayBefore,
  });
  const [pending, setPending] = useState<ReminderKey | null>(null);

  const toggle = async (key: ReminderKey) => {
    const nextValue = !prefs[key];

    // Optimistic update — flip the UI immediately.
    setPrefs((p) => ({ ...p, [key]: nextValue }));
    setPending(key);

    const result = await updateReminder(subscription.id, key, nextValue);

    // If the server rejected it, roll back.
    if (!result.ok) {
      setPrefs((p) => ({ ...p, [key]: !nextValue }));
    }
    setPending(null);
  };

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-surface p-6 shadow-sm">
      {/* Header: name + renewal date */}
      <div>
        <p className="text-lg font-bold text-text-primary">{subscription.name}</p>
        <p className="mt-0.5 text-sm text-text-secondary">
          Renews {formatRenews(subscription.nextBillingDate)}
        </p>
      </div>

      {/* Toggles */}
      <div className="flex gap-2.5">
        {OPTIONS.map((opt) => {
          const on = prefs[opt.key];
          return (
            <button
              key={opt.key}
              onClick={() => toggle(opt.key)}
              disabled={pending === opt.key}
              className={`flex-1 rounded-full px-2 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
                on
                  ? "bg-pricing-bg text-highlight-soft"
                  : "bg-card-inset text-text-secondary hover:text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}