"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function UserMenu({
  name,
  email,
  isPro,
}: {
  name: string;
  email: string;
  isPro: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const initial = (name || "?").trim().charAt(0).toUpperCase();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const avatar = (size: string, text: string) => (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-[#fff3bf] ${text} font-bold text-[#8a6d00] select-none`}
    >
      {initial}
    </span>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="block cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        {avatar("h-10 w-10", "text-[15px]")}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[52px] z-50 w-[276px] rounded-[20px] border border-border bg-surface p-2 shadow-[0_12px_34px_-10px_rgba(0,0,0,0.16)]"
        >
          <div className="flex items-center gap-3 px-3 pt-3 pb-3.5">
            {avatar("h-10 w-10", "text-base")}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-[15px] font-semibold text-text-primary">
                  {name}
                </span>
                <span
                  className={`inline-flex items-center gap-[3px] rounded-full px-2 py-[3px] text-[10px] font-bold tracking-[0.06em] ${
                    isPro
                      ? "bg-highlight text-text-primary"
                      : "bg-card-inset text-text-secondary"
                  }`}
                >
                  {isPro && <Zap size={10} fill="currentColor" strokeWidth={0} />}
                  {isPro ? "Pro" : "Free"}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[13px] text-text-secondary">
                {email}
              </div>
            </div>
          </div>

          <div className="mx-1.5 my-0.5 h-px bg-border" />

          <div className="flex flex-col py-1">
            <Link
              href="/account"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-card-inset"
            >
              <Settings size={16} /> Account
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#c0392b] hover:bg-[#fdecea] disabled:opacity-60"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}