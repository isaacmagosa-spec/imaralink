"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackClient() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // TODO: replace with your actual auth callback handling (Supabase, etc.)
    const next = sp.get("next") || "/browse";
    router.replace(next);
  }, [sp, router]);

  return null;
}
