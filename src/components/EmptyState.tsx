import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="mt-12 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-white/10 bg-white/5 grid place-items-center text-2xl">
        🏡
      </div>
      <h3 className="text-lg font-semibold">No listings match your filters</h3>
      <p className="mt-1 text-white/70">Try adjusting your search or clear all filters.</p>
      <div className="mt-4">
        <Link
          href="/browse"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10"
        >
          Clear filters
        </Link>
      </div>
    </div>
  );
}
