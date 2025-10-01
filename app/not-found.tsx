import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        We couldn’t find that page. It may have moved or never existed.
      </p>
      <div className="mt-6">
        <Link
          href="/browse"
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Go to Browse
        </Link>
      </div>
    </main>
  );
}
