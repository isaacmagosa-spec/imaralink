import { supabase } from "../../lib/supabaseClient";

export default async function Browse() {
  const { data, error } = await supabase
    .from("listings")
    .select("id, title, type, price, city, area")
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Browse Listings</h1>
        <p className="text-red-600 mt-4">Error loading listings: {error.message}</p>
      </main>
    );
  }

  if (!data || data.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Browse Listings</h1>
        <p className="text-gray-600 mt-4">No listings yet. Add one from the dashboard.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Browse Listings</h1>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((l: any) => (
          <a key={l.id} href={`/listing/${l.id}`} className="border rounded-xl p-4 bg-white hover:shadow">
            <div className="text-lg font-semibold">{l.title}</div>
            <div className="text-sm text-gray-600 capitalize">
              {l.type} • {l.city || l.area || "—"}
            </div>
            <div className="mt-2 font-bold">
              KES {new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(Number(l.price))}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
