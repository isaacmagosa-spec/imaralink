"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpClient() {
  const router = useRouter();

  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (!url || !anon) {
      router.replace("/browse");
      return;
    }
    // TODO: your real sign-up flow goes here
    router.replace("/browse");
  }, [router, url, anon]);

  return null;
}
