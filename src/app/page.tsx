import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Find your next home with <span className="text-blue-600">ImaraLink</span>
        </h1>
        <p className="mt-3 text-gray-600">
          Search rentals and properties for sale across Kenya.
        </p>
        <div className="mt-6">
          <Link
            href="/browse"
            className="inline-block rounded-lg bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 transition"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </main>
  );
}
