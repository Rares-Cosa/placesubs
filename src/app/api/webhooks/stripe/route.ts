import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  // Verify the event genuinely came from Stripe using the signing secret.
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // We only care about a completed checkout.
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (!userId) {
      console.error("No user_id in session metadata");
      return NextResponse.json({ received: true });
    }

    // Only grant Pro if the payment actually succeeded.
    if (session.payment_status === "paid") {
      const supabase = createAdminClient();
      const { error } = await supabase
        .from("profiles")
        .update({
          is_pro: true,
          pro_since: new Date().toISOString(),
          stripe_customer_id:
            typeof session.customer === "string" ? session.customer : null,
        })
        .eq("id", userId);

      if (error) {
        console.error("Failed to mark user Pro:", error);
        // Return 500 so Stripe retries later.
        return NextResponse.json({ error: "DB update failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}