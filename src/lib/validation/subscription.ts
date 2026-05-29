import { z } from "zod";

export const CATEGORIES = [
  "streaming",
  "software",
  "fitness",
  "news",
  "gaming",
  "other",
] as const;

export const BILLING_CYCLES = ["monthly", "yearly"] as const;

export const CURRENCIES = ["EUR", "USD", "RON", "GBP"] as const;

export const subscriptionInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Name is required" })
    .max(60, { error: "Name is too long" }),
  price: z
    .number({ error: "Price must be a number" })
    .positive({ error: "Price must be greater than zero" })
    .max(1_000_000, { error: "Price seems too high" }),
  currency: z.enum(CURRENCIES, { error: "Pick a currency" }),
  billingCycle: z.enum(BILLING_CYCLES, { error: "Pick a billing cycle" }),
  category: z.enum(CATEGORIES, { error: "Pick a category" }),
  nextBillingDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Use YYYY-MM-DD format" }),
});

export type SubscriptionInput = z.infer<typeof subscriptionInputSchema>;