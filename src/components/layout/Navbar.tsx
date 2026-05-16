import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 h-18">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold text-text-primary">
        placesubs
      </Link>

      {/* Right side — Login + Register */}
      <div className="flex items-center gap-6">
        <Link
          href="/login"
          className="text-[15px] font-medium text-text-primary"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}