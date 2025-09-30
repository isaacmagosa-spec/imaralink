import Link from "next/link";

type Listing = {
  id: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  city?: string | null;
  area?: string | null;
  images?: string[] | null;
};

async function getListings(): Promise<Listing[]> {
  const res = await fetch("/api/listings", { cache: "no-store" });
  if (!res.ok) return [];
  const json = (await res.json()) as { listings: Listing[] };
  return json.listings ?? [];
}

export default async function Browse() {
  const listings = await getListings();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Browse Listings</h1>
      <p className="text-gray-600 mt-2">Filters, search, and results will appear here.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l: Listing) => (
          <Link
            key={l.id}
            href={`/listing/${l.id}`}
            className="rounded-xl border bg-white p-4 hover:shadow transition"
          >
            <div className="font-semibold">{l.title}</div>
            <div className="text-sm text-gray-600">
              {l.currency} {l.price.toLocaleString()} • {l.type === "rent" ? "Rent" : "Sale"}
            </div>
            <div className="text-xs text-gray-500">
              {[l.city, l.area].filter(Boolean).join(", ")}
            </div>
          </Link>
        ))}
      </div>

      {listings.length === 0 && (
        <p className="text-gray-500 mt-8">No listings yet.</p>
      )}
    </main>
  );
}
