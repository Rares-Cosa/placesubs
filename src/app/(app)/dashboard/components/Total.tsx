type TotalProps = {
  monthly: number;
  yearly: number;
  currency?: string;
};

export default function Total({ monthly, yearly, currency = "€" }: TotalProps) {
  const fmt = (n: number) => currency + n.toFixed(2);

  return (
    <div className="mt-4 flex flex-col gap-6 rounded-3xl border border-border bg-surface py-5 px-7 md:flex-row md:items-center md:justify-between">
      {/* Left: label */}
      <div className="flex flex-col justify-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
          Total
        </p>
        <p className="text-3xl font-bold tracking-tight text-text-primary">
          All subscriptions
        </p>
      </div>

      {/* Right: two stat tiles */}
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Monthly */}
        <div className="flex flex-col justify-center rounded-2xl bg-card-inset px-7 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
            Monthly
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold tracking-tight text-text-primary">
              {fmt(monthly)}
            </span>
            <span className="text-base font-medium text-text-secondary">/mo</span>
          </div>
        </div>

        {/* Yearly */}
        <div className="flex flex-col justify-center rounded-2xl bg-pricing-bg px-7 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-pricing-muted">
            Yearly
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold tracking-tight text-background">
              {fmt(yearly)}
            </span>
            <span className="text-base font-medium text-pricing-muted">/yr</span>
          </div>
        </div>
      </div>
    </div>
  );
}