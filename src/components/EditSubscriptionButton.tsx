"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import type { Subscription } from "@/types/subscription";
import { cn } from "@/lib/cn";

type Props = {
  /**
   * The full subscription being edited. We need the whole object (not just
   * the ID) so the form can pre-populate every field with current values.
   */
  subscription: Subscription;
};

export function EditSubscriptionButton({ subscription }: Props) {
  // Controlled state so we can close the dialog programmatically after a
  // successful save (the form calls onSuccess, we flip open to false).
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Edit subscription"
          className={cn(
            "transition-opacity hover:opacity-70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 rounded-md",
          )}
        >
          <Pencil className="h-5 w-5 text-text-secondary" strokeWidth={2} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit subscription</DialogTitle>
          <DialogDescription>
            Update the details of this recurring expense.
          </DialogDescription>
        </DialogHeader>

        <SubscriptionForm
          mode="edit"
          subscription={subscription}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}