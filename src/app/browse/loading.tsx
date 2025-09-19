export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Browse Listings</h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-white p-4 animate-pulse"
          >
            <div className="aspect-[4/3] w-full rounded-lg bg-gray-200" />
            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
            <div className="mt-4 h-6 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
