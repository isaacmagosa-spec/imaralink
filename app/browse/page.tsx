import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";
import SearchFilters from "@/components/SearchFilters";
import ListingCard, { Listing } from "@/components/ListingCard";

export const revalidate = 0;

async function getListings(searchParams: URLSearchParams) {
  const q = (searchParams.get("q") || "").trim();
  const t = searchParams.get("type") || "";

  const supabase = getSupabaseClient();
  let query = supabase.from("listings").select("*").order("created_at", { ascending: false });
  if (q) query = query.ilike("title", `%${q}%`);
  if (t === "rent" || t === "sale") query = query.eq("type", t);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Listing[];
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = new URLSearchParams(Object.entries(await searchParams));
  const listings = await getListings(sp);

  return (
    <div className="container">
      <h1 className="mb-2 text-2xl font-bold text-white">Browse Listings</h1>
      <p className="mb-5 text-slate-300">Short stays, monthly rentals, and homes for sale.</p>

      <SearchFilters />

      {listings.length === 0 ? (
        <p className="mt-8 text-slate-300">No listings found. Try different filters.</p>
      ) : (
        <section className="card card-hover mt-4 p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => <ListingCard key={l.id} l={l} />)}
          </div>
        </section>
      )}
    </div>
  );
}
