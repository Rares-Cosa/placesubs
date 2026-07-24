import { createClient } from "@/lib/supabase/server";
import { getIsPro } from "@/lib/auth/isPro";
import UserMenu from "./UserMenu";
import NavLink from "../NavLink";
import Logo from "../Logo";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isPro = await getIsPro();

  return (
    <nav className="flex items-center justify-between px-12 h-18">
      {/* Logo — goes to dashboard, not landing */}
      <Logo href="/dashboard" />

      {/* Middle — app navigation */}
      <div className="hidden items-center gap-8 md:flex">
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/reminders">Reminders</NavLink>
      </div>

      {/* Right — user menu */}
      <UserMenu
        name={user?.user_metadata.full_name ?? user?.email ?? ""}
        email={user?.email ?? ""}
        isPro={isPro}
      />
    </nav>
  );
}