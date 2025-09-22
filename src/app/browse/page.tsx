import SearchFilters from "@/components/SearchFilters";
import ListingCard, { type Listing } from "@/components/ListingCard";
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
  const tStr = typeof sp.type === "string" ? sp.type : undefined;
  const type: "rent" | "sale" | undefined =
    tStr === "rent" || tStr === "sale" ? tStr : undefined;

  const supabase = getSupabaseClient();

  let query = supabase.from("listings").select("*").order("created_at", { ascending: false });

  if (type) query = query.eq("type", type);
  if (q) query = query.ilike("title", `%${q}%`);

  const { data, error } = await query;

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Browse Listings</h1>
        <p className="text-red-600 mt-3">Error: {error.message}</p>
      </main>
    );
  }

  const listings = (data ?? []) as Listing[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Browse Listings</h1>

      <div className="mb-6">
        <SearchFilters />
      </div>

      {listings.length === 0 ? (
        <p className="mt-8 text-gray-600">No listings found. Try a different search.</p>
      ) : (
        <section className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </section>
      )}
    </main>
  );
}
