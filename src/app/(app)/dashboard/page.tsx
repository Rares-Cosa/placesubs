import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Subscription } from "@/types/subscription";
import DashboardContent from "./components/DashboardContent";
import { AddSubscriptionButton } from "@/components/AddSubscriptionButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch subscriptions:", error);
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
        <h1 className="text-3xl font-bold text-text-primary text-center sm:text-4xl lg:text-5xl">
          Optimize Your Subscriptions
        </h1>
        <p className="mt-8 text-center text-text-secondary lg:mt-12">
          Could not load subscriptions. Please try again later.
        </p>
      </div>
    );
  }

  const subscriptions: Subscription[] = (data ?? []).map(
    (row: SubscriptionRow) => ({
      id: row.id,
      name: row.name,
      category: row.category as Subscription["category"],
      price: Number(row.price),
      currency: row.currency,
      billingCycle: row.billing_cycle as Subscription["billingCycle"],
      nextBillingDate: row.next_billing_date,
      startDate: row.start_date,
    }),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
      <h1 className="text-3xl font-bold text-text-primary text-center sm:text-4xl lg:text-5xl">
        Optimize Your Subscriptions
      </h1>

      {subscriptions.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-6 lg:mt-12">
          <div className="text-center">
            <p className="text-text-secondary text-lg">No subscriptions yet.</p>
            <p className="text-text-secondary text-sm mt-2">
              Add your first subscription to start tracking.
            </p>
          </div>
          <AddSubscriptionButton variant="primary" />
        </div>
      ) : (
        <DashboardContent subscriptions={subscriptions} />
      )}
    </div>
  );
}

type SubscriptionRow = {
  id: string;
  name: string;
  category: string;
  price: number | string;
  currency: string;
  billing_cycle: string;
  next_billing_date: string;
  start_date: string;
};