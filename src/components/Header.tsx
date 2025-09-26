import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1f3a]/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/browse" className="group inline-flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/90 text-blue-900 grid place-items-center font-black">
            I
          </div>
          <span className="text-white text-lg font-semibold tracking-wide group-hover:opacity-90">
            Imaralink
          </span>
        </Link>

        <nav className="hidden gap-2 md:flex">
          <Link className="btn-ghost" href="/browse">Browse</Link>
          <Link className="btn-ghost" href="/list">List your property</Link>
          <Link className="btn-ghost" href="/saved">Saved</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link className="btn-light hidden sm:inline-flex" href="/list">
            + List property
          </Link>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
