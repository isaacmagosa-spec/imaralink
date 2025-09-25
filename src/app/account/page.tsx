"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

type Session = {
  user: {
    id: string;
    email?: string;
  } | null;
} | null;

export default function AccountPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/auth/sign-in");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card p-6">Loading…</div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="card p-6">
          <p className="text-white/80">
            You are not signed in.{" "}
            <Link className="text-brand-300 hover:text-brand-200" href="/auth/sign-in">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-white/70">Welcome, {session.user.email || session.user.id}</p>
      </header>

      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Email</div>
            <div className="font-medium">{session.user.email || "—"}</div>
          </div>
          <button onClick={signOut} className="btn btn-outline">Sign out</button>
        </div>
      </div>
    </main>
  );
}
