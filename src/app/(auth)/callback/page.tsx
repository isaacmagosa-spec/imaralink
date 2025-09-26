"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

export default function AuthCallback() {
  const sp = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"working" | "ok" | "error">("working");
  const [message, setMessage] = useState("Finalizing sign-in…");

  useEffect(() => {
    const supabase = getBrowserSupabase();
    const code = sp.get("code");
    const token_hash = sp.get("token_hash");
    const type = sp.get("type");

    (async () => {
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (token_hash && type === "magiclink") {
          const { error } = await supabase.auth.verifyOtp({
            type: "magiclink",
            token_hash,
          });
          if (error) throw error;
        } else {
          throw new Error("Missing auth parameters.");
        }
        setStatus("ok");
        setMessage("Signed in! Redirecting…");
        setTimeout(() => router.replace("/browse"), 800);
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message ?? "Unable to complete sign-in.");
      }
    })();
  }, [sp, router]);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 text-center">
        <p
          className={
            status === "error"
              ? "font-medium text-rose-700"
              : "font-medium text-slate-800"
          }
        >
          {message}
        </p>
      </div>
    </main>
  );
}
