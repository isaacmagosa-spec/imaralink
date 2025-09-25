"use client";

import Link from "next/link";

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const links = [
    { href: "/browse", label: "Browse" },
    { href: "/browse?type=stay", label: "Short Stays" },
    { href: "/browse?type=rent", label: "Rent" },
    { href: "/browse?type=sale", label: "Buy" },
  ];

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-[#0b1223] border-l border-white/10 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold">Menu</div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <nav className="space-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="block rounded-lg border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <a
            href="#signin"
            onClick={(e) => {
              e.preventDefault();
              const btn = document.getElementById("open-auth");
              (btn as HTMLButtonElement | null)?.click();
              onClose();
            }}
            className="block text-center rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white py-3 font-semibold transition"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
