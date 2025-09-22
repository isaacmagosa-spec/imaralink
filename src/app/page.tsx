import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6 py-10">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Find your next home</h1>
        <p className="mt-2 text-gray-600">
          Search rentals and properties for sale in your area.
        </p>
        <div className="mt-5">
          <Link
            href="/browse"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 transition"
          >
            Start Browsing
          </Link>
        </div>
      </div>
    </section>
  );
}
