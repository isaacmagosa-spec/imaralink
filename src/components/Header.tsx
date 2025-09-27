"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header-surface">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href="/browse" className="flex items-center gap-2 font-semibold">
          <span className="inline-grid h-7 w-7 place-items-center rounded-lg bg-white/10">I</span>
          Imaralink
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/browse" className="hover:text-white">Browse</Link>
          <Link href="/list" className="hover:text-white">List your property</Link>
          <Link href="/saved" className="hover:text-white">Saved</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/list" className="btn-ghost">+ List property</Link>
          <div className="inline-grid h-8 w-8 place-items-center rounded-full bg-white/10">U</div>
        </div>
      </div>
    </header>
  );
}
