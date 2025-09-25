"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, anonKey);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setDone(null);
    setErr(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/browse` },
      });
      if (error) throw error;
      setDone("Check your email for the login link.");
    } catch (e: any) {
      setErr(e?.message ?? "Login failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1630] to-[#0b1223] p-6">
        <h1 className="text-2xl font-extrabold">Log in</h1>
        <p className="mt-1 text-white/70">
          Enter your email and we’ll send you a magic link.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 font-semibold disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send magic link"}
          </button>
        </form>

        {done && <p className="mt-4 text-emerald-300">{done}</p>}
        {err && <p className="mt-4 text-red-300">{err}</p>}
      </div>
    </main>
  );
}
