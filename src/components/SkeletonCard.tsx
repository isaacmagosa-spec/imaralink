export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="h-44 w-full animate-pulse bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 animate-pulse bg-white/10 rounded" />
        <div className="h-3 w-1/2 animate-pulse bg-white/10 rounded" />
        <div className="h-4 w-1/3 animate-pulse bg-white/10 rounded" />
        <div className="h-3 w-1/2 animate-pulse bg-white/10 rounded" />
      </div>
    </div>
  );
}
