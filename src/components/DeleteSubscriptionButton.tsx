"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { deleteSubscription } from "@/app/(app)/dashboard/actions";
import { cn } from "@/lib/cn";

type Props = {
  /**
   * The ID of the subscription to delete (Supabase UUID).
   */
  subscriptionId: string;
  /**
   * Optional callback fired after a successful delete.
   * The parent uses this to update its UI state (e.g., select the next
   * subscription in the list, or show the empty state).
   */
  onDeleted?: () => void;
};

export function DeleteSubscriptionButton({
  subscriptionId,
  onDeleted,
}: Props) {
  // Dialog open/close state. Controlled (rather than letting Radix manage it)
  // so we can programmatically close it from inside the delete handler.
  const [open, setOpen] = useState(false);

  // useTransition gives us isPending without manual state management.
  // While in flight: disable buttons, show "Deleting..." text.
  const [isPending, startTransition] = useTransition();

  // High-level error to show inside the dialog (e.g., network failure).
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    setError(null);

    startTransition(async () => {
      const result = await deleteSubscription(subscriptionId);

      if (result.ok) {
        setOpen(false);
        onDeleted?.();
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        // Reset error state every time the dialog opens or closes,
        // otherwise a previous error would linger if the user reopens it.
        setOpen(next);
        if (!next) setError(null);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Delete subscription"
          className={cn(
            "text-xl transition-opacity hover:opacity-70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 rounded-md",
          )}
        >
          <Trash2 className="h-5 w-5 text-text-secondary" strokeWidth={2} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete subscription</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this subscription? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => setOpen(false)}
            className={cn(
              "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5",
              "text-sm font-medium text-text-primary",
              "transition-colors hover:bg-card-inset",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20",
            )}
          >
            No
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className={cn(
                "flex-1 rounded-xl bg-red-400 px-4 py-2.5",
                "text-sm font-medium text-white",
                "transition-colors hover:bg-red-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300",
            )}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}