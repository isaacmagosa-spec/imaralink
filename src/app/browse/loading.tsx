import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <div className="h-6 w-56 animate-pulse bg-white/10 rounded" />
        <div className="mt-2 h-4 w-80 animate-pulse bg-white/10 rounded" />
      </div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>
    </main>
  );
}
