import { ListingCardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 h-6 w-48 rounded-lg bg-white/20" />
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
