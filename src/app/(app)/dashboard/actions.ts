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