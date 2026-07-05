import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendReminderParams = {
  to: string;
  subscriptionName: string;
  renewalDate: string; // YYYY-MM-DD
  daysBefore: number;  // 7, 3, or 1
  price: number;
  currency: string;
};

export async function sendReminder({
  to,
  subscriptionName,
  renewalDate,
  daysBefore,
  price,
  currency,
}: SendReminderParams) {
  const whenText =
    daysBefore === 1 ? "tomorrow" : `in ${daysBefore} days`;

  const prettyDate = new Date(renewalDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { data, error } = await resend.emails.send({
    from: "PlaceSubs <reminders@placesubs.com>",
    to,
    subject: `${subscriptionName} renews ${whenText}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
        <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 16px;">
          Heads up — ${subscriptionName} renews ${whenText}
        </h1>
        <p style="font-size: 16px; line-height: 1.5; color: #5c5c56; margin: 0 0 24px;">
          Your <strong>${subscriptionName}</strong> subscription renews on
          <strong>${prettyDate}</strong> for
          <strong>${currency}${price.toFixed(2)}</strong>.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #5c5c56; margin: 0 0 24px;">
          If you still use it, no action needed. If not, now's a good time to cancel.
        </p>
        <p style="font-size: 13px; color: #9a9a92; margin: 32px 0 0;">
          You're receiving this because you set a reminder in PlaceSubs.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error(`Failed to send reminder to ${to}:`, error);
    return { ok: false as const, error };
  }

  return { ok: true as const, id: data?.id };
}