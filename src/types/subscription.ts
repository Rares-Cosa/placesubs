export type SubscriptionCategory =
  | "streaming"
  | "software"
  | "fitness"
  | "news"
  | "gaming"
  | "other";

export type BillingCycle = "monthly" | "yearly";

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  price: number;
  /** Currency code, e.g., "USD", "EUR", "RON" */
  currency: string;
  billingCycle: BillingCycle;
  /** ISO date string of the next billing date */
  nextBillingDate: string;
  /** ISO date string of when the user started this subscription */
  startDate: string;
  remindOneWeek: boolean;
  remindThreeDays: boolean;
  remindDayBefore: boolean;
}