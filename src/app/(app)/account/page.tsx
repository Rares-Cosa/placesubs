import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/layout/LogoutButton";
import UpgradeButton from "@/components/UpgradeButton";
import { Zap } from "lucide-react";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro, pro_since")
    .eq("id", user.id)
    .single();

  const isPro = profile?.is_pro ?? false;
  const name = user.user_metadata.full_name ?? user.email ?? "";
  const email = user.email ?? "";
  const initial = name.trim().charAt(0).toUpperCase();

  const memberSince = profile?.pro_since
    ? new Date(profile.pro_since).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const basics = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Sign-in method", value: "Google" },
  ];

  return (
    <div className="mx-auto max-w-[720px] px-6 pt-14 pb-24">
      {/* Header */}
      <header className="mb-10 flex items-center gap-5">
        <span className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-[#fff3bf] text-[28px] font-bold text-[#8a6d00] select-none">
          {initial}
        </span>
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-text-primary">
            {name}
          </h1>
          <p className="mt-1 text-base text-text-secondary">{email}</p>
        </div>
      </header>

      {/* Plan card */}
      <section
        className={`rounded-3xl border p-8 shadow-sm ${
          isPro
            ? "border-pricing-bg bg-pricing-bg"
            : "border-border bg-surface"
        }`}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                isPro ? "text-pricing-muted" : "text-text-secondary"
              }`}
            >
              Your plan
            </p>
            <p
              className={`mt-1.5 text-2xl font-bold tracking-tight ${
                isPro ? "text-background" : "text-text-primary"
              }`}
            >
              {isPro ? "PlaceSubs Pro" : "Free plan"}
            </p>
            <p
              className={`mt-1.5 text-[15px] ${
                isPro ? "text-pricing-muted" : "text-text-secondary"
              }`}
            >
              {isPro
                ? memberSince
                  ? `Member since ${memberSince}`
                  : "Lifetime access"
                : "Upgrade to see your total spend and set custom reminders."}
            </p>
          </div>

          {isPro && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-highlight px-3.5 py-2 text-[13px] font-bold whitespace-nowrap text-text-primary">
              <Zap size={14} fill="currentColor" strokeWidth={0} />
              PRO
            </span>
          )}
        </div>

        {!isPro && (
          <div className="mt-5">
            <UpgradeButton />
          </div>
        )}
      </section>

      {/* Account basics */}
      <section className="mt-6 rounded-3xl border border-border bg-surface px-7 py-2 shadow-sm">
        {basics.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between py-5 ${
              i < basics.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="text-sm text-text-secondary">{row.label}</span>
            <span className="text-[15px] font-medium text-text-primary">
              {row.value}
            </span>
          </div>
        ))}
      </section>

      {/* Log out */}
      <div className="mt-8">
        <LogoutButton />
      </div>

      {/* TODO: Billing section — receipt / payment history (not built yet) */}
      {/* TODO: Delete account — destructive, needs confirmation (not built yet) */}
    </div>
  );
}