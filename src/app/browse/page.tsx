import SegmentedTabs from "@/components/SegmentedTabs";
import SearchFilters from "@/components/SearchFilters";
import ListingCard, { Listing } from "@/components/ListingCard";
import EmptyState from "@/components/EmptyState";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Browse({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const q = typeof sp.q === "string" ? sp.q.trim() : undefined;
  const tStr = typeof sp.type === "string" ? sp.type : "";
  const type: "rent" | "sale" | undefined =
    tStr === "rent" || tStr === "sale" ? (tStr as "rent" | "sale") : undefined;

  const min = typeof sp.min === "string" && sp.min ? Number(sp.min) : undefined;
  const max = typeof sp.max === "string" && sp.max ? Number(sp.max) : undefined;
  const beds = typeof sp.beds === "string" && sp.beds ? Number(sp.beds) : undefined;
  const baths = typeof sp.baths === "string" && sp.baths ? Number(sp.baths) : undefined;

  const supabase = getSupabaseClient();

  let query = supabase.from("listings").select("*").order("created_at", { ascending: false });
  if (type) query = query.eq("type", type);
  if (q) query = query.ilike("title", `%${q}%`);
  if (typeof min === "number" && !Number.isNaN(min)) query = query.gte("price", min);
  if (typeof max === "number" && !Number.isNaN(max)) query = query.lte("price", max);
  if (typeof beds === "number" && !Number.isNaN(beds)) query = query.gte("bedrooms", beds);
  if (typeof baths === "number" && !Number.isNaN(baths)) query = query.gte("bathrooms", baths);

  const { data, error } = await query;

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-white/90">Browse Listings</h1>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          Error: {error.message}
        </div>
      </main>
    );
  }

  const listings = (data ?? []) as Listing[];
  const count = listings.length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white/90">Browse Listings</h1>
        <div className="text-sm text-slate-300">{count} {count === 1 ? "home" : "homes"}</div>
      </div>

      <div className="mb-4">
        <SegmentedTabs />
      </div>

      <SearchFilters />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
        {count === 0 ? (
          <EmptyState title="No listings match your filters" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} l={l} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
