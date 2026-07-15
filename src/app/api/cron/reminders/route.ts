import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendReminder } from "@/lib/email/sendReminder";

// The three reminder offsets and which column gates each one.
const REMINDER_OFFSETS = [
  { days: 7, column: "remind_one_week" },
  { days: 3, column: "remind_three_days" },
  { days: 1, column: "remind_day_before" },
] as const;

// Format a Date as YYYY-MM-DD (matches Postgres `date` columns).
function toDateString(d: Date) {
  return d.toISOString().split("T")[0];
}

export async function GET(request: Request) {
  // --- Auth: only allow Vercel Cron (or you, with the secret) to trigger this ---
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Cache user email + Pro status so we don't look up the same user twice.
  const userCache = new Map<string, { email: string | null; isPro: boolean }>();

  const getUserInfo = async (userId: string) => {
    if (userCache.has(userId)) return userCache.get(userId)!;

    const { data: authData } = await supabase.auth.admin.getUserById(userId);
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_pro")
      .eq("id", userId)
      .single();

    const info = {
      email: authData.user?.email ?? null,
      isPro: profile?.is_pro ?? false,
    };
    userCache.set(userId, info);
    return info;
  };

  const today = new Date();
  let sent = 0;
  let failed = 0;
  let skippedNotPro = 0;

  // For each offset, find subscriptions renewing exactly that many days out
  // with the matching reminder toggle ON.
  for (const offset of REMINDER_OFFSETS) {
    const target = new Date(today);
    target.setDate(target.getDate() + offset.days);
    const targetDate = toDateString(target);

    const { data: subs, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("next_billing_date", targetDate)
      .eq(offset.column, true);

    if (error) {
      console.error(`Query failed for ${offset.column}:`, error);
      continue;
    }

    for (const sub of subs ?? []) {
      const { email, isPro } = await getUserInfo(sub.user_id);

      // Reminders are a Pro feature — skip non-Pro users.
      if (!isPro) {
        skippedNotPro++;
        continue;
      }

      if (!email) {
        console.error(`No email for user ${sub.user_id}, skipping`);
        failed++;
        continue;
      }

      const result = await sendReminder({
        to: email,
        subscriptionName: sub.name,
        renewalDate: sub.next_billing_date,
        daysBefore: offset.days,
        price: Number(sub.price),
        currency: sub.currency,
      });

      if (result.ok) sent++;
      else failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, skippedNotPro });
}