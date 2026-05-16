import type { Subscription } from "@/types/subscription";

export const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    name: "Netflix",
    logo: "N",
    category: "entertainment",
    price: 15.99,
    currency: "USD",
    billingCycle: "monthly",
    nextBillingDate: "2026-05-26",
    startDate: "2025-04-26",
  },
  {
    id: "sub_2",
    name: "Claude",
    logo: "C",
    category: "productivity",
    price: 20.0,
    currency: "USD",
    billingCycle: "monthly",
    nextBillingDate: "2026-05-15",
    startDate: "2025-08-15",
  },
  {
    id: "sub_3",
    name: "Gym",
    logo: "💪",
    category: "health",
    price: 45.0,
    currency: "USD",
    billingCycle: "monthly",
    nextBillingDate: "2026-05-01",
    startDate: "2024-05-01",
  },
];