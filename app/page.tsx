import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-56px)] grid place-items-center">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          From bedsitters to penthouses — <span className="text-blue-600">rent or buy</span> with confidence
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          ImaraLink connects Owners & Agents with people ready to Rent & Buy. Browse verified listings or list yours in minutes.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/browse" className="rounded-2xl bg-blue-600 text-white px-4 py-2 font-semibold shadow">Browse Listings</Link>
          <Link href="/auth" className="rounded-2xl border px-4 py-2 font-semibold hover:bg-gray-100">Owners & Agents — List a Property</Link>
        </div>
      </div>
    </main>
  );
}