import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";
import NavLink from "../NavLink";
import Logo from "../Logo";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between px-12 h-18">
      {/* Logo — goes to dashboard, not landing */}
      <Logo />

      {/* Middle — app navigation */}
      <div className="hidden items-center gap-8 md:flex">
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/reminders">Reminders</NavLink>
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