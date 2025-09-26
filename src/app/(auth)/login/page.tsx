"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/browse";

  const supabase = createSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin + next },
      });
      if (error) throw error;
      setSent(true);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to send magic link.");
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + next },
      });
      if (error) throw error;
    } catch (e: any) {
      setErr(e?.message ?? "Google sign-in failed.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-1 text-slate-600">Use a magic link or Google.</p>

      {sent ? (
        <div className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-emerald-800">
          Check your email for the sign-in link.
        </div>
      ) : (
        <form onSubmit={sendMagicLink} className="mt-6 space-y-4 rounded-2xl border border-slate-200/70 bg-white/80 p-5">
          {err && <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">{err}</div>}

          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send magic link"}
          </button>

          <div className="text-center text-xs text-slate-500">or</div>

          <button
            type="button"
            onClick={loginGoogle}
            disabled={loading}
            className="w-full rounded-lg border px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
          >
            Continue with Google
          </button>
        </form>
      )}
    </main>
  );
}
