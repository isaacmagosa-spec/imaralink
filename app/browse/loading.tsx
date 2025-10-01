import { FilterSkeleton, ListingsGridSkeleton } from "@/components/Skeletons";

export default function LoadingBrowse() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white">Browse Listings</h1>
      <div className="mt-6">
        <FilterSkeleton />
      </div>
      <div className="mt-6">
        <ListingsGridSkeleton count={6} />
      </div>
    </main>
  );
}
