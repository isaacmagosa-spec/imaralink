"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabaseBrowser";

type Session = Awaited<ReturnType<ReturnType<typeof createSupabaseBrowser>["auth"]["getSession"]>>["data"]["session"];

export default function UserMenu() {
  const supabase = createSupabaseBrowser();
  const router = useRouter();
  const [session, setSession] = useState<Session>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <button
        onClick={() => router.push("/(auth)/login?next=/browse")}
        className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Sign in
      </button>
    );
  }

  const user = session.user;
  const name = user.user_metadata?.full_name || user.email || "User";
  const initials = name
    .split(" ")
    .map((s: string) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function signOut() {
    await supabase.auth.signOut();
    router.refresh();
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 text-white"
        aria-label="Account"
      >
        {initials}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border bg-white shadow-lg">
          <div className="px-3 py-2 text-sm">
            <div className="truncate font-semibold">{name}</div>
            <div className="truncate text-xs text-slate-500">{user.email}</div>
          </div>
          <button
            onClick={() => (window.location.href = "/list")}
            className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
          >
            List your property
          </button>
          <button
            onClick={signOut}
            className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
