export default function EmptyState({
  title = "No listings found",
  subtitle = "Try adjusting filters or search terms.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-6 py-12 text-center">
      <div className="mb-3 text-4xl">🔎</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-600">{subtitle}</p>
    </div>
  );
}
