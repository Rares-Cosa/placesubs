import Link from "next/link";
import NavLink from "../NavLink";
import Logo from "../Logo";

export default function LandingNavbar({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <nav className="relative flex items-center justify-between px-10 h-16">
        {/* Logo — back to landing top */}
        <Logo />

        {!minimal && (
          <>
            {/* Middle — absolutely centered on the page */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
              <NavLink href="/#features">Features</NavLink>
              <NavLink href="/#pricing">Pricing</NavLink>
              <NavLink href="/#about">About</NavLink>
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
    </header>
  );
}