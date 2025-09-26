export default function HeroBand() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800/40 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8">
      <div className="relative z-10">
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Find your next place with <span className="text-indigo-400">Imara</span>Link
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Short stays, monthly rentals, and homes to buy — curated across Kenya.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200">
            Trusted listings
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200">
            Local support
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200">
            Flexible stays
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
    </section>
  );
}
