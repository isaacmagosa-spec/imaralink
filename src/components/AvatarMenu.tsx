"use client";

import React from "react";
import Link from "next/link";

export default function AvatarMenu() {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!btnRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!btnRef.current.parentElement?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 text-white text-sm font-semibold flex items-center justify-center ring-1 ring-white/50 shadow"
        title="My Account"
      >
        ME
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white/90 backdrop-blur p-1 shadow-lg"
        >
          <Link
            href="/list/new"
            className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
          >
            List your property
          </Link>
          <div className="my-1 h-px bg-slate-200" />
          <button
            className="w-full text-left rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
            onClick={() => alert('Sign in coming soon')}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}
