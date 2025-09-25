import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-white/70 mt-2">Let’s take you back to the marketplace.</p>
      <div className="mt-6">
        <Link href="/browse" className="btn btn-primary">Browse listings</Link>
      </div>
    </main>
  );
}
