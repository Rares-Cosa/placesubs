import { supabase } from "@/lib/supabase";
import type { Subscription } from "@/types/subscription";
import DashboardContent from "./components/DashboardContent";

export default async function DashboardPage() {
  // Fetch subscriptions from Supabase
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("name", { ascending: true });

  // Handle fetch errors
  if (error) {
    console.error("Failed to fetch subscriptions:", error);
    return (
      <div className="px-12 py-8">
        <h1 className="text-5xl font-bold text-text-primary text-center">
          Optimize Your Subscriptions
        </h1>
        <p className="mt-12 text-center text-text-secondary">
          Could not load subscriptions. Please try again later.
        </p>
      </div>
    );
  }

  // Map database columns (snake_case) to our TypeScript interface (camelCase)
  const subscriptions: Subscription[] = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    logo: row.logo,
    category: row.category,
    price: Number(row.price),
    currency: row.currency,
    billingCycle: row.billing_cycle,
    nextBillingDate: row.next_billing_date,
    startDate: row.start_date,
  }));

  return (
    <div className="px-12 py-8">
      <h1 className="text-5xl font-bold text-text-primary text-center">
        Optimize Your Subscriptions
      </h1>
      <DashboardContent subscriptions={subscriptions} />
    </div>
  );
}