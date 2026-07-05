"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { subscriptionInputSchema } from "@/lib/validation/subscription";

/**
 * Result shape returned to the client.
 * Discriminated union so the client can narrow with `if (result.ok)`.
 */
export type CreateSubscriptionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Creates a subscription for the currently authenticated user.
 *
 * Flow:
 * 1. Extract form fields from FormData
 * 2. Coerce numeric strings to numbers (HTML form inputs are always strings)
 * 3. Validate against the shared Zod schema
 * 4. Confirm the user is authenticated via Supabase server client
 * 5. Insert into the subscriptions table — RLS enforces user_id = auth.uid()
 *    `start_date` is set to today, `created_at`/`updated_at` use DB defaults
 * 6. Revalidate the dashboard so the new row appears immediately
 */
export async function createSubscription(
  formData: FormData,
): Promise<CreateSubscriptionResult> {
  // --- Step 1 & 2: extract + coerce ---
  const raw = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    currency: formData.get("currency"),
    billingCycle: formData.get("billingCycle"),
    category: formData.get("category"),
    nextBillingDate: formData.get("nextBillingDate"),
  };

  // --- Step 3: validate ---
  const parsed = subscriptionInputSchema.safeParse(raw);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      ok: false,
      error: "Please fix the errors below",
      fieldErrors: flattened.fieldErrors as Record<string, string[]>,
    };
  }

  // --- Step 4: confirm auth ---
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "You must be signed in to add subscriptions" };
  }

  // --- Step 5: insert ---
  // Today's date in YYYY-MM-DD format for `start_date`.
  // Postgres `date` columns accept this format directly.
  const today = new Date().toISOString().split("T")[0];

  const { error: insertError } = await supabase.from("subscriptions").insert({
    user_id: user.id,
    name: parsed.data.name,
    category: parsed.data.category,
    price: parsed.data.price,
    currency: parsed.data.currency,
    billing_cycle: parsed.data.billingCycle,
    next_billing_date: parsed.data.nextBillingDate,
    start_date: today,
  });

  if (insertError) {
    console.error("Failed to insert subscription:", insertError);
    return {
      ok: false,
      error: "Something went wrong. Please try again.",
    };
  }

  // --- Step 6: revalidate ---
  revalidatePath("/dashboard");

  return { ok: true };
}

/**
 * Result shape returned to the client after a delete attempt.
 */
export type DeleteSubscriptionResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Deletes a subscription owned by the currently authenticated user.
 *
 * Flow:
 * 1. Confirm the user is authenticated
 * 2. Delete the row. RLS ensures users can only delete their own subscriptions
 *    (even if the client passes an ID they don't own, Supabase will return
 *    zero rows affected — safe).
 * 3. Revalidate the dashboard so the list re-renders without the deleted row.
 *
 * Errors are returned as { ok: false } rather than thrown — same pattern as
 * createSubscription — so the dialog can show specific messages inline.
 */
export async function deleteSubscription(
  subscriptionId: string,
): Promise<DeleteSubscriptionResult> {
  // Basic input sanity check — UUIDs are always 36 chars. Don't trust the client.
  if (typeof subscriptionId !== "string" || subscriptionId.length !== 36) {
    return { ok: false, error: "Invalid subscription ID" };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "You must be signed in to delete subscriptions" };
  }

  // The .eq("user_id", user.id) is technically redundant because of RLS, but it's
  // defense-in-depth: even if someone misconfigures the RLS policy, this query
  // would still only delete the row owned by the authenticated user.
  const { error: deleteError } = await supabase
    .from("subscriptions")
    .delete()
    .eq("id", subscriptionId)
    .eq("user_id", user.id);

  if (deleteError) {
    console.error("Failed to delete subscription:", deleteError);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  revalidatePath("/dashboard");

  return { ok: true };
}

/**
 * Result shape returned to the client after an update attempt.
 * Same shape as create: includes optional field-level errors so the form
 * can highlight individual inputs.
 */
export type UpdateSubscriptionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Updates a subscription owned by the currently authenticated user.
 *
 * Flow:
 * 1. Sanity-check the subscription ID
 * 2. Extract + coerce form fields (same as create)
 * 3. Validate against the same Zod schema as create — identical rules
 * 4. Confirm the user is authenticated
 * 5. UPDATE the row scoped by id AND user_id (defense-in-depth alongside RLS)
 *    Note: we deliberately do NOT update `user_id` or `start_date` —
 *    those are immutable for a subscription's lifetime.
 * 6. Revalidate the dashboard so the change appears immediately
 */
export async function updateSubscription(
  subscriptionId: string,
  formData: FormData,
): Promise<UpdateSubscriptionResult> {
  // --- Step 1: sanity-check the ID ---
  if (typeof subscriptionId !== "string" || subscriptionId.length !== 36) {
    return { ok: false, error: "Invalid subscription ID" };
  }

  // --- Step 2 & 3: extract, coerce, validate ---
  const raw = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    currency: formData.get("currency"),
    billingCycle: formData.get("billingCycle"),
    category: formData.get("category"),
    nextBillingDate: formData.get("nextBillingDate"),
  };

  const parsed = subscriptionInputSchema.safeParse(raw);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      ok: false,
      error: "Please fix the errors below",
      fieldErrors: flattened.fieldErrors as Record<string, string[]>,
    };
  }

  // --- Step 4: confirm auth ---
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "You must be signed in to edit subscriptions" };
  }

  // --- Step 5: update ---
  // Scope by both id and user_id. RLS already restricts to the user's own
  // rows, but the explicit user_id check is belt-and-suspenders against any
  // future RLS misconfiguration.
  const { error: updateError } = await supabase
    .from("subscriptions")
    .update({
      name: parsed.data.name,
      category: parsed.data.category,
      price: parsed.data.price,
      currency: parsed.data.currency,
      billing_cycle: parsed.data.billingCycle,
      next_billing_date: parsed.data.nextBillingDate,
    })
    .eq("id", subscriptionId)
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Failed to update subscription:", updateError);
    return {
      ok: false,
      error: "Something went wrong. Please try again.",
    };
  }

  // --- Step 6: revalidate ---
  revalidatePath("/dashboard");

  return { ok: true };
}

/**
 * Result shape returned to the client after a reminder toggle.
 */
export type UpdateReminderResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * The three reminder columns a user can toggle per subscription.
 * Whitelisted so the client can never inject an arbitrary column name —
 * the client sends a key ("oneWeek"), we map it to the real column here.
 */
const REMINDER_COLUMNS = {
  oneWeek: "remind_one_week",
  threeDays: "remind_three_days",
  dayBefore: "remind_day_before",
} as const;

type ReminderKey = keyof typeof REMINDER_COLUMNS;

/**
 * Toggles a single reminder preference for a subscription owned by the
 * authenticated user.
 *
 * Flow mirrors updateSubscription:
 * 1. Sanity-check the subscription ID, the reminder key, and the value
 * 2. Confirm the user is authenticated
 * 3. UPDATE the single boolean column, scoped by id AND user_id
 *    (defense-in-depth alongside RLS)
 * 4. Revalidate the reminders page so the change persists on reload
 */
export async function updateReminder(
  subscriptionId: string,
  key: ReminderKey,
  value: boolean,
): Promise<UpdateReminderResult> {
  // --- Step 1: sanity-check inputs ---
  if (typeof subscriptionId !== "string" || subscriptionId.length !== 36) {
    return { ok: false, error: "Invalid subscription ID" };
  }

  const column = REMINDER_COLUMNS[key];
  if (!column) {
    return { ok: false, error: "Invalid reminder type" };
  }

  if (typeof value !== "boolean") {
    return { ok: false, error: "Invalid reminder value" };
  }

  // --- Step 2: confirm auth ---
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { ok: false, error: "You must be signed in to update reminders" };
  }

  // --- Step 3: update the single column ---
  const { error: updateError } = await supabase
    .from("subscriptions")
    .update({ [column]: value })
    .eq("id", subscriptionId)
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Failed to update reminder:", updateError);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  // --- Step 4: revalidate ---
  revalidatePath("/reminders");

  return { ok: true };
}