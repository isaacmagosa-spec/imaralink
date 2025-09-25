"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

function isActive(
  key: "all" | "stays" | "rent" | "sale",
  pathname: string,
  sp: URLSearchParams
) {
  if (pathname !== "/browse") return key === "all" && pathname === "/";
  const t = sp.get("type");
  const category = sp.get("category");
  if (key === "all") return !t && !category;
  if (key === "stays") return category === "stays";
  if (key === "rent") return t === "rent" && !category;
  if (key === "sale") return t === "sale" && !category;
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs: { label: string; href: string; key: "all" | "stays" | "rent" | "sale" }[] = [
    { label: "Explore", href: "/browse", key: "all" },
    { label: "Stays", href: "/browse?category=stays", key: "stays" },
    { label: "Rent", href: "/browse?type=rent", key: "rent" },
    { label: "Buy", href: "/browse?type=sale", key: "sale" },
  ];

  return (
    <header className="border-b border-white/10 bg-[#0b1223]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/browse" className="text-xl font-extrabold tracking-tight">
          Imara<span className="text-indigo-400">Link</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((t) => {
            const active = isActive(t.key, pathname, new URLSearchParams(searchParams));
            return (
              <Link
                key={t.key}
                href={t.href}
                className={
                  "px-3 py-2 rounded-md text-sm font-medium transition " +
                  (active
                    ? "bg-indigo-500 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10")
                }
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-md border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
          >
            Log in
          </Link>
          <a
            href="mailto:hello@imaralink.example?subject=List%20my%20property"
            className="rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 text-sm font-semibold"
          >
            List your property
          </a>
        </div>
      </div>
    </header>
  );
}
