"use client";

import { useState, useTransition } from "react";
import { createSubscription } from "@/app/(app)/dashboard/actions";
import {
  BILLING_CYCLES,
  CATEGORIES,
  CURRENCIES,
} from "@/lib/validation/subscription";
import { cn } from "@/lib/cn";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

type Props = {
  onSuccess: () => void;
};

export function AddSubscriptionForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(formData: FormData) {
    setGeneralError(null);
    setFieldErrors({});

    startTransition(async () => {
      const result = await createSubscription(formData);

      if (result.ok) {
        onSuccess();
      } else {
        setGeneralError(result.error);
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    });
  }

  return (
    <form action={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
      <Field label="Name" error={fieldErrors.name?.[0]}>
        <input
          name="name"
          type="text"
          required
          autoFocus
          autoComplete="off"
          maxLength={60}
          placeholder="Netflix"
          className={inputClass(!!fieldErrors.name)}
        />
      </Field>

      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Field label="Price" error={fieldErrors.price?.[0]}>
          <input
            name="price"
            type="number"
            required
            min="0.01"
            step="0.01"
            placeholder="9.99"
            className={inputClass(!!fieldErrors.price)}
          />
        </Field>

        <Field label="Currency" error={fieldErrors.currency?.[0]}>
          <select
            name="currency"
            required
            defaultValue="EUR"
            className={selectClass(!!fieldErrors.currency)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Billing cycle" error={fieldErrors.billingCycle?.[0]}>
          <select
            name="billingCycle"
            required
            defaultValue="monthly"
            className={selectClass(!!fieldErrors.billingCycle)}
          >
            {BILLING_CYCLES.map((c) => (
              <option key={c} value={c}>
                {capitalize(c)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Category" error={fieldErrors.category?.[0]}>
          <select
            name="category"
            required
            defaultValue="streaming"
            className={selectClass(!!fieldErrors.category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {capitalize(c)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Next billing date" error={fieldErrors.nextBillingDate?.[0]}>
        <input
          name="nextBillingDate"
          type="date"
          required
          defaultValue={todayISO()}
          className={inputClass(!!fieldErrors.nextBillingDate)}
        />
      </Field>

      {generalError && (
        <p className="text-sm text-red-600" role="alert">
          {generalError}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "mt-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-surface",
          "transition-opacity hover:opacity-90",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
        )}
      >
        {isPending ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "h-10 rounded-lg border bg-surface px-3 text-sm text-text-primary",
    "placeholder:text-text-secondary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20",
    hasError
      ? "border-red-400 focus-visible:ring-red-200"
      : "border-border focus-visible:border-accent/30",
  );
}

function selectClass(hasError: boolean) {
  return cn(
    "h-10 rounded-lg border bg-surface px-3 text-sm text-text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20",
    hasError
      ? "border-red-400 focus-visible:ring-red-200"
      : "border-border focus-visible:border-accent/30",
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}