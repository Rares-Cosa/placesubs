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
  subscriptionId: string;
  onDeleted?: () => void;
};

export function DeleteSubscriptionButton({
  subscriptionId,
  onDeleted,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
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
        setOpen(next);
        if (!next) setError(null);
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Delete subscription"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-card-inset",
            "cursor-pointer text-text-secondary transition-colors",
            "hover:bg-red-50 hover:text-red-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          )}
        >
          <Trash2 className="h-[18px] w-[18px]" strokeWidth={2} />
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
              "flex-1 cursor-pointer rounded-xl border border-border bg-surface px-4 py-2.5",
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
              "flex-1 cursor-pointer rounded-xl bg-red-400 px-4 py-2.5",
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