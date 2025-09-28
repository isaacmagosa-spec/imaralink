"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function SignUpPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp!.get("next") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    const { error } = await supabase.auth.signUp({ email, password });
    setBusy(false);

    if (error) {
      setErr(error.message);
      return;
    }
    // If email confirmation is ON, tell the user. Otherwise, go to account.
    router.push("/auth/sign-in?next=" + encodeURIComponent(next));
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-white/70 mt-1">It’s quick and free</p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        {err && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
            {err}
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-sm text-white/80">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none focus:border-brand-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-white/80">Password</label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none focus:border-brand-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? "Creating…" : "Create account"}
        </button>

        <p className="text-center text-sm text-white/70">
          Already have an account?{" "}
          <Link href={`/auth/sign-in?next=${encodeURIComponent(next)}`} className="text-brand-300 hover:text-brand-200">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}


