import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Listing not found</h1>
      <p className="text-gray-600 mt-2">
        The listing you’re looking for doesn’t exist or was removed.
      </p>
      <div className="mt-6">
        <Link
          href="/browse"
          className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50"
        >
          ← Back to Browse
        </Link>
      </div>
    </main>
  );
}
