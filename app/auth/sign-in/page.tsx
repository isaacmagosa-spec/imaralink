"use client";

import { useState, Suspense, FormEvent } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function SignInPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
      else {
        setMsg("Signed in. Redirecting…");
        // window.location.href = "/"; // optional redirect
      }
    } catch (err: any) {
      setMsg(err?.message ?? "Unexpected error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm bg-white p-6 rounded-2xl shadow space-y-4"
        >
          <h1 className="text-2xl font-bold">Sign in</h1>

          <label className="block">
            <span className="text-sm text-gray-700">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2"
              placeholder="••••••••"
            />
          </label>

          {msg && <p className="text-sm text-red-600" role="status">{msg}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg p-2 font-medium bg-black text-white disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="underline">Sign up</Link>
          </p>
        </form>
      </main>
    </Suspense>
  );
}
