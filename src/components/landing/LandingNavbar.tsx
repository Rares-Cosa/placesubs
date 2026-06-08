import Link from "next/link";

export default function LandingNavbar({ minimal = false }: { minimal?: boolean }) {
  return (
    <nav className="flex items-center justify-between px-12 h-18">
      {/* Logo — goes back to landing Hero */}
      <Link href="/" className="text-xl font-semibold text-text-primary">
        placesubs
      </Link>

      {!minimal && (
        <>
          {/* Middle — section anchors */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#features" className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary">
              Features
            </Link>
            <Link href="/#pricing" className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary">
              Pricing
            </Link>
          </div>

          {/* Right — auth entry points */}
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-[15px] font-medium text-text-primary">
              Login
            </Link>
            <Link href="/register" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white">
              Register
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}