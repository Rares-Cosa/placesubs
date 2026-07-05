"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-[15px] transition-colors ${
        isActive
          ? "font-bold text-text-primary"
          : "font-medium text-text-secondary hover:text-text-primary"
      }`}
    >
      {children}
    </Link>
  );
}