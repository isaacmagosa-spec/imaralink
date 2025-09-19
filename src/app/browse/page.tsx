import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const revalidate = 0; // always fresh (or use: export const dynamic = "force-dynamic")

type Listing = {
  id: string;
  created_at: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string; // e.g. "KES"
  bedrooms?: number | null;
  bathrooms?: number | null;
  city?: string | null;
  area?: string | null;
  description?: string | null;
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-KE", { style: "currency", currency }).format(value);
  } catch {
    // Fallback if an unknown currency sneaks in
    return `${currency} ${value.toLocaleString()}`;
  }
}

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

  // Base query
  let query = supabase.from("listings").select("*").order("created_at", { ascending: false });

  // Filters
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
      <h1 className="text-2xl font-bold">Browse Listings</h1>

      {/* Filters (GET form -> updates URL) */}
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" method="get">
        <input
          type="search"
          name="q"
          placeholder="Search by title (e.g. Kileleshwa)"
          defaultValue={q}
          className="rounded-lg border px-3 py-2"
        />
        <select
          name="type"
          defaultValue={type ?? ""}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All types</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </form>

      {/* Results */}
      {listings.length === 0 ? (
        <p className="mt-8 text-gray-600">No listings found. Try a different search.</p>
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <Link
              key={l.id}
              href={`/listing/${l.id}`}
              className="block rounded-xl border bg-white p-4 hover:shadow transition"
            >
              {/* Image placeholder (you can wire real images later) */}
              <div className="mb-3 h-40 w-full rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                Photo coming soon
              </div>

              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold leading-tight">{l.title}</h2>
                <span className="inline-flex shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] uppercase tracking-wide">
                  {l.type}
                </span>
              </div>

              <div className="mt-1 text-sm text-gray-600">
                {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""}
              </div>

              <div className="mt-3 text-blue-700 font-bold">
                {formatMoney(l.price, l.currency)}
              </div>

              <div className="mt-2 text-sm text-gray-700">
                {l.bedrooms ?? 0} bed · {l.bathrooms ?? 0} bath
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
