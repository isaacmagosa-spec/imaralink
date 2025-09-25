export default function TypePill({ type }: { type: "stay" | "rent" | "sale" | string }) {
  const map: Record<string, string> = {
    stay: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    rent: "bg-blue-500/15 text-blue-300 border-blue-400/30",
    sale: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  };
  const cls = map[type] || "bg-white/10 text-white/80 border-white/15";
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide ${cls}`}>
      {type}
    </span>
  );
}
