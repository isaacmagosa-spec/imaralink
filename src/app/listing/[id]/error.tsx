"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-600 mt-2">
        {error?.message || "We couldn’t load this listing."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-block rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  );
}
