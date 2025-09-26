"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserAvatar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-full bg-white text-blue-900 font-semibold grid place-items-center"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        U
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="px-3 py-2 text-slate-700">My Account</div>
          <div className="border-t" />
          <div className="flex flex-col p-1">
            <Link href="/account/listings" className="rounded-lg px-3 py-2 hover:bg-slate-100">
              My Listings
            </Link>
            <Link href="/login" className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Log in
            </Link>
            <Link href="/register" className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Create account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
