import Link from "next/link";

export const revalidate = 0;

export default function Home() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-brand-800">
              Book short stays, rent monthly, or buy your next home
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              ImaraLink brings together the best homes across Kenya — simple search, beautiful listings, fast contact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/browse?category=short" className="rounded-xl bg-brand-600 px-5 py-3 text-white hover:bg-brand-700">
                Explore short stays
              </Link>
              <Link href="/browse?category=monthly" className="rounded-xl border px-5 py-3 hover:bg-slate-50">
                Browse monthly rentals
              </Link>
              <Link href="/browse?category=sale" className="rounded-xl border px-5 py-3 hover:bg-slate-50">
                Homes for sale
              </Link>
            </div>
          </div>
          <div className="h-64 rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 border" />
        </div>
      </section>
    </main>
  );
}
