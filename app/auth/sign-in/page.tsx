import { Suspense } from "react";
import SignInClient from "./sign-in.client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-200">Loading sign-in…</div>}>
      <SignInClient />
    </Suspense>
  );
}
