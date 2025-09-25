"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function ResetPage() {
  const sb = getSupabaseClient();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
      });
      if (error) throw error;
      setMsg("If that email exists, a reset link has been sent.");
    } catch (e: any) {
      setErr(e?.message || "Could not send reset email");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-brand-900">Reset your password</h1>
      <p className="mt-1 text-sm text-slate-600">We’ll email you a reset link.</p>

      {msg && <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{msg}</p>}
      {err && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          placeholder="Your account email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
        <button
          disabled={busy}
          className="w-full rounded-lg bg-brand-700 px-4 py-2 font-medium text-white hover:bg-brand-800 disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <div className="mt-4 text-sm text-slate-600">
        <Link href="/login" className="text-brand-700 hover:underline">Back to sign in</Link>
      </div>
    </>
  );
}
