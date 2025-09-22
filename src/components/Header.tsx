"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href ? "text-blue-700" : "text-gray-700 hover:text-blue-700";

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Imaralink
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className={isActive("/")}>Home</Link>
          <Link href="/browse" className={isActive("/browse")}>Browse</Link>
        </nav>
      </div>
    </header>
  );
}
