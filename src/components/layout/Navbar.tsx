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
      {/* Logo — goes to dashboard, not landing */}
      <Link href="/dashboard" className="text-xl font-semibold text-text-primary">
        placesubs
      </Link>

      {/* Middle — app navigation */}
      <div className="hidden items-center gap-8 md:flex">
        <Link href="/dashboard" className="text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary">
          Dashboard
        </Link>
      </div>

      {/* Right — user + logout */}
      <div className="flex items-center gap-6">
        <span className="text-[15px] font-medium text-text-primary">
          {user?.user_metadata.full_name ?? user?.email}
        </span>
        <LogoutButton />
      </div>
    </nav>
  );
}