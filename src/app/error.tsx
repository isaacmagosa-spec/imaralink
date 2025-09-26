"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-slate-950">
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white">Something went wrong</h1>
          <p className="mt-2 text-slate-300">
            {error?.message || "An unexpected error occurred."}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
            >
              Try again
            </button>
            <Link
              href="/browse"
              className="rounded-lg border px-4 py-2 font-medium text-white"
            >
              Go to Browse
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
