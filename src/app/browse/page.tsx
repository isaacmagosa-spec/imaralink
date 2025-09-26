import { getSupabaseClient } from "@/lib/supabaseClient";
import ListingCard, { Listing } from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";

export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

async function getListings(sp: SearchParams) {
  const q = typeof sp.q === "string" ? sp.q.trim() : undefined;
  const t = typeof sp.type === "string" ? sp.type : undefined;
  const type: "rent" | "sale" | undefined = t === "rent" || t === "sale" ? t : undefined;

  const supabase = getSupabaseClient();

  let query = supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (type) query = query.eq("type", type);
  if (q) query = query.ilike("title", `%${q}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Listing[];
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const type = typeof sp.type === "string" && (sp.type === "rent" || sp.type === "sale") ? sp.type : "";

  const listings = await getListings(sp);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Browse Listings</h1>
        <p className="text-white/80">Short stays, monthly rentals, and homes for sale.</p>
      </div>

      <SearchFilters q={q} type={type as any} />

      {listings.length === 0 ? (
        <p className="mt-8 text-white/90">No listings found. Try different filters.</p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </section>
      )}
    </>
  );
}
