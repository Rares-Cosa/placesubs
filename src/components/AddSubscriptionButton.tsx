"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { cn } from "@/lib/cn";

type Props = {
  /**
   * Visual variant of the trigger button.
   * - "primary" — used in the empty state. Larger, more prominent.
   * - "secondary" — smaller, less attention-grabbing.
   */
  variant?: "primary" | "secondary";
};

export function AddSubscriptionButton({ variant = "primary" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-2 font-medium",
            "transition-opacity hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
            variant === "primary" &&
              "h-12 rounded-2xl bg-accent px-6 text-sm text-surface",
            variant === "secondary" &&
              "h-10 rounded-xl bg-accent px-4 text-sm text-surface",
          )}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add Subscription
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add subscription</DialogTitle>
          <DialogDescription>
            Track a new recurring expense.
          </DialogDescription>
        </DialogHeader>

        <SubscriptionForm mode="create" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}