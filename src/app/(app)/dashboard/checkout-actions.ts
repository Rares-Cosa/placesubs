"use server";

import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/server";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, error: "You must be signed in to upgrade" };
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment", // one-time payment, not subscription
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "PlaceSubs Pro",
            description: "Lifetime access to PlaceSubs Pro features",
          },
          unit_amount: 500, // €5.00 in cents
        },
        quantity: 1,
      },
    ],
    // Tie the payment back to this user — the webhook reads this
    client_reference_id: user.id,
    customer_email: user.email,
    metadata: { user_id: user.id },
    success_url: `${origin}/dashboard?upgraded=1`,
    cancel_url: `${origin}/dashboard`,
  });

  if (!session.url) {
    return { ok: false as const, error: "Could not start checkout" };
  }

  redirect(session.url);
}