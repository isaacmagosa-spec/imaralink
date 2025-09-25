import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";
import SearchFilters from "@/components/SearchFilters";
import ListingCard, { type Listing } from "@/components/ListingCard";

export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;
function toInt(v: string | undefined, fallback: number) {
  const n = parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default async function Browse({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const q = typeof sp.q === "string" ? sp.q.trim() : undefined;
  const rawType = typeof sp.type === "string" ? sp.type : undefined;
  const category = typeof sp.category === "string" ? sp.category : undefined;

  // Map “Stays” => treat as rent for now (DB has type = 'rent' | 'sale')
  const type: "rent" | "sale" | undefined =
    category === "stays"
      ? "rent"
      : rawType === "rent" || rawType === "sale"
      ? rawType
      : undefined;

  const page = toInt(typeof sp.page === "string" ? sp.page : undefined, 1);
  const limit = toInt(typeof sp.limit === "string" ? sp.limit : undefined, 12);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = getSupabaseClient();

  let query = supabase
    .from("listings")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (type) query = query.eq("type", type);
  if (q) query = query.ilike("title", `%${q}%`);

  const { data, error, count } = await query;
  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Browse Listings</h1>
        <p className="text-red-400 mt-3">Error: {error.message}</p>
      </main>
    );
  }

  const listings = (data ?? []) as Listing[];
  const total = count ?? 0;
  const pages = Math.max(1, Math.ceil(total / limit));

  const keep = new URLSearchParams();
  if (q) keep.set("q", q);
  if (category) keep.set("category", category);
  if (!category && type) keep.set("type", type);
  keep.set("limit", String(limit));

  const prevHref = (() => {
    const p = new URLSearchParams(keep);
    p.set("page", String(Math.max(1, page - 1)));
    return `/browse?${p.toString()}`;
  })();

  const nextHref = (() => {
    const p = new URLSearchParams(keep);
    p.set("page", String(Math.min(pages, page + 1)));
    return `/browse?${p.toString()}`;
  })();

  const heading =
    category === "stays"
      ? "Short Stays"
      : type === "rent"
      ? "Homes for Rent"
      : type === "sale"
      ? "Homes for Sale"
      : "Explore Listings";

  const sub =
    category === "stays"
      ? "Book furnished short-term stays (weekend to monthly)."
      : type === "rent"
      ? "Apartments, bedsitters, and more monthly rentals."
      : type === "sale"
      ? "Find homes to buy across Kenya."
      : "Short stays, rentals, and homes for sale — all in one place.";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e1630] to-[#0b1223] p-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">{heading}</h1>
        <p className="mt-1 text-white/70">{sub}</p>
        <div className="mt-4">
          <SearchFilters />
        </div>
      </section>

      {listings.length === 0 ? (
        <p className="mt-10 text-white/70">No listings found. Try a different search.</p>
      ) : (
        <>
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </section>

          <div className="mt-10 flex items-center justify-between">
            <div className="text-sm text-white/60">
              Page {page} of {pages} • {total} result{total === 1 ? "" : "s"}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={prevHref}
                aria-disabled={page <= 1}
                className={
                  "rounded-md border border-white/15 px-3 py-2 text-sm " +
                  (page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-white/10")
                }
              >
                ← Previous
              </Link>
              <Link
                href={nextHref}
                aria-disabled={page >= pages}
                className={
                  "rounded-md border border-white/15 px-3 py-2 text-sm " +
                  (page >= pages ? "pointer-events-none opacity-40" : "hover:bg-white/10")
                }
              >
                Next →
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
