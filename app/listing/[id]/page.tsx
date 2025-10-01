import { getSupabaseClient } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 0;

type Params = { id: string };

type Listing = {
  id: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  city?: string | null;
  area?: string | null;
  description?: string | null;
  images?: string[] | null;
  created_at?: string | null;
};

async function getListing(id: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("listing fetch error:", error.message);
    return null;
  }
  return (data as Listing) ?? null;
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const l = await getListing(id);
  if (!l) {
    return (
      <div className="card">
        <h1 className="text-lg font-semibold">Listing not found</h1>
        <p className="text-slate-600">Try browsing other properties.</p>
        <Link href="/browse" className="btn-primary mt-4 inline-block">Back to Browse</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": l.type === "sale" ? "Offer" : "RentalProperty",
    name: l.title,
    description: l.description,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://imaralink-app.vercel.app"}/listing/${id}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: l.area,
      addressRegion: l.city,
      addressCountry: "KE",
    },
    offers: {
      "@type": "Offer",
      price: l.price,
      priceCurrency: l.currency ?? "KES",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3 card">
          <div className="mb-3 h-64 w-full overflow-hidden rounded-xl bg-slate-100 grid place-items-center text-xs text-slate-500">
            {Array.isArray(l.images) && l.images.length > 0 ? (
              <img src={l.images[0]} alt={l.title} className="h-full w-full object-cover" />
            ) : (
              <span>Photo coming soon</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{l.title}</h1>
          <p className="mt-2 text-slate-700">{l.description ?? "No description provided."}</p>
        </div>

        <aside className="md:col-span-2 card">
          <div className="text-blue-700 text-2xl font-bold">
            {new Intl.NumberFormat("en-KE", { style: "currency", currency: l.currency }).format(l.price)}
          </div>
          <div className="mt-2 text-slate-700">
            {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""} • {(l.bedrooms ?? 0)} bed · {(l.bathrooms ?? 0)} bath
          </div>
          <Link href={`/listing/${l.id}/contact`} className="btn-primary mt-4 inline-block w-full text-center">
            Contact agent / owner
          </Link>
        </aside>
      </div>
    </>
  );
}
