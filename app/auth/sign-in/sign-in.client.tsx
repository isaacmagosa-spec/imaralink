"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (!url || !anon) {
      // No env present at build/run — avoid crashing the build:
      router.replace("/browse");
      return;
    }

    // TODO: plug in your real Supabase sign-in flow here (e.g. OAuth, magic link).
    // For now, just send user to /browse.
    const next = sp.get("next") || "/browse";
    router.replace(next);
  }, [router, sp, url, anon]);

  return null;
}
