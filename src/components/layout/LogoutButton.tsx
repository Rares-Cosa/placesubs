"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex w-full cursor-pointer items-center justify-center rounded-full border border-border bg-surface px-6 py-4 text-[15px] font-semibold text-text-primary transition-colors hover:bg-[#f2f0e8] disabled:opacity-60"
    >
      Log out
    </button>
  );
}