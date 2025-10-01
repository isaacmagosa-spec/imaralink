// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Book short stays, rent monthly, or buy your
              <span className="block text-slate-900">next home</span>
            </h1>

            <p className="mt-4 max-w-xl text-slate-600">
              ImaraLink brings together the best homes across Kenya — simple search,
              beautiful listings, fast contact.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/browse?type=stays"
                className="inline-flex items-center rounded-xl bg-indigo-700 px-4 py-2 font-medium text-white hover:bg-indigo-800 transition"
              >
                Explore short stays
              </Link>

              <Link
                href="/browse?type=rent"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 hover:bg-slate-50 transition"
              >
                Browse monthly rentals
              </Link>

              <Link
                href="/browse?type=sale"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 hover:bg-slate-50 transition"
              >
                Homes for sale
              </Link>
            </div>
          </div>

          <div>
            {/* Right-side visual placeholder */}
            <div className="h-64 w-full rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-inner md:h-80" />
          </div>
        </div>
      </section>

      {/* PROMO STRIP (navy) */}
      <section className="bg-[#0b1b2d]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <h3 className="font-semibold text-white">Short Stays</h3>
              <p className="mt-1 text-sm text-white/70">
                Hand-picked furnished apartments and BnBs for nights and weeks.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <h3 className="font-semibold text-white">Monthly Rentals</h3>
              <p className="mt-1 text-sm text-white/70">
                Apartments and houses ready for long-term living.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <h3 className="font-semibold text-white">Homes for Sale</h3>
              <p className="mt-1 text-sm text-white/70">
                New builds and resales from trusted agents and owners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
