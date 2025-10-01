import { Suspense } from "react";
import SignUpClient from "./sign-up.client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-200">Loading sign-up…</div>}>
      <SignUpClient />
    </Suspense>
  );
}
