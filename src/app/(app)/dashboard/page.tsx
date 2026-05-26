import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Subscription } from "@/types/subscription";
import DashboardContent from "./components/DashboardContent";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login");
  }

  // Fetch subscriptions for the authenticated user
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
  const subscriptions: Subscription[] = (data ?? []).map((row: SubscriptionRow) => ({
    id: row.id,
    name: row.name,
    logo: row.logo,
    category: row.category as Subscription["category"],
    price: Number(row.price),
    currency: row.currency,
    billingCycle: row.billing_cycle as Subscription["billingCycle"],
    nextBillingDate: row.next_billing_date,
    startDate: row.start_date,
  }));

  return (
    <div className="px-12 py-8">
      <h1 className="text-5xl font-bold text-text-primary text-center">
        Optimize Your Subscriptions
      </h1>
      {subscriptions.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-lg">
            No subscriptions yet.
          </p>
          <p className="text-text-secondary text-sm mt-2">
            Add your first subscription to start tracking.
          </p>
        </div>
      ) : (
        <DashboardContent subscriptions={subscriptions} />
      )}
    </div>
  );
}

// Database row shape (snake_case, as stored in Supabase)
type SubscriptionRow = {
  id: string;
  name: string;
  logo: string;
  category: string;
  price: number | string;
  currency: string;
  billing_cycle: string;
  next_billing_date: string;
  start_date: string;
};