import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Subscription } from "@/types/subscription";
import ReminderCard from "./components/ReminderCard";

export default async function RemindersPage() {
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
    .order("next_billing_date", { ascending: true });

  if (error) {
    console.error("Failed to fetch subscriptions:", error);
    return (
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-8 sm:py-6 lg:px-12">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Reminders
        </h1>
        <p className="mt-8 text-text-secondary">
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
      remindOneWeek: row.remind_one_week,
      remindThreeDays: row.remind_three_days,
      remindDayBefore: row.remind_day_before,
    }),
  );

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-8 sm:py-6 lg:px-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Reminders
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          Choose when we email you before each subscription renews. Pick any
          combination — or none to turn reminders off.
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <p className="mt-10 text-text-secondary">
          No subscriptions yet. Add one from the dashboard to set reminders.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((sub) => (
            <ReminderCard key={sub.id} subscription={sub} />
          ))}
        </div>
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
  remind_one_week: boolean;
  remind_three_days: boolean;
  remind_day_before: boolean;
};