import { Suspense } from "react";
import CallbackClient from "./callback.client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-200">Completing sign-in…</div>}>
      <CallbackClient />
    </Suspense>
  );
}
