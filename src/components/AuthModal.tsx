"use client";

import { useEffect, useRef } from "react";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div
          ref={ref}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1630] p-6 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Sign in</h2>
            <button
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="space-y-3"
          >
            <div>
              <label className="mb-1 block text-sm text-white/80">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/80">Password</label>
              <input
                type="password"
                required
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white py-3 font-semibold transition"
            >
              Continue
            </button>
            <p className="text-center text-sm text-white/60">
              This is a demo UI (no real auth yet).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
