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
  subscription: Subscription;
};

export function EditSubscriptionButton({ subscription }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Edit subscription"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-card-inset",
            "cursor-pointer text-text-secondary transition-colors",
            "hover:bg-border hover:text-text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          )}
        >
          <Pencil className="h-[18px] w-[18px]" strokeWidth={2} />
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