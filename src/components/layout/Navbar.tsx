import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between px-12 h-18">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold text-text-primary">
        placesubs
      </Link>

      {/* Right side — depends on auth state */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-[15px] font-medium text-text-primary">
              {user.user_metadata.full_name ?? user.email}
            </span>
            <LogoutButton />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}