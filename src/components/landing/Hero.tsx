import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-6xl md:text-7xl">
          <span className="block">Track all. Save more.</span>
          <span className="mt-3 inline-block rounded-md bg-highlight px-3 py-1">
            Cancel subs.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-text-secondary md:text-xl">
          Take full control of your recurring expenses. The simple, clean way
          to manage all your subscriptions in one place.
        </p>

        <Link
          href="/register"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-surface transition-transform hover:scale-[1.02]"
        >
          Get Started Free
          <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Decorative brand chips — static for now, we animate them next step */}
      <BrandChip letter="N" color="bg-red-50 text-red-500" className="left-[7%] top-[22%]" duration="6.5s" delay="0s" />
      <BrandChip letter="F" color="bg-purple-50 text-purple-600" className="right-[8%] top-[28%]" duration="8s" delay="1.2s" />
      <BrandChip letter="S" color="bg-green-50 text-green-600" className="left-[13%] top-[56%]" duration="7s" delay="0.5s" />
      <BrandChip letter="A" color="bg-blue-50 text-blue-600" className="right-[7%] top-[64%]" duration="6s" delay="2s" />
    </section>
  );
}

function BrandChip({
  letter,
  color,
  className,
  duration,
  delay,
}: {
  letter: string;
  color: string;
  className: string;
  duration: string;
  delay: string;
}) {
  return (
    <div
      className={`animate-float absolute hidden items-center gap-3 rounded-2xl bg-surface p-3 pr-12 shadow-lg xl:flex ${className}`}
      style={{ animationDuration: duration, animationDelay: delay }}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${color}`}>
        {letter}
      </div>
      <div className="h-2.5 w-16 rounded-full bg-black/10" />
    </div>
  );
}