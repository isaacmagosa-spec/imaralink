import { notFound } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import Gallery from "@/components/Gallery";
import StickyContactCard from "@/components/StickyContactCard";

export const revalidate = 0;

type Params = { id: string };

type Listing = {
  id: string;
  created_at: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  city?: string | null;
  area?: string | null;
  description?: string | null;
  amenities?: string[] | null;
  images?: string[] | null;
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  const { data } = await supabase.from("listings").select("title,city,area").eq("id", id).maybeSingle();

  const t = data?.title ?? "Listing";
  const loc = [data?.area, data?.city].filter(Boolean).join(", ");
  return {
    title: loc ? `${t} · ${loc} · ImaraLink` : `${t} · ImaraLink`,
  };
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();

  if (error) {
    // Surface 404 for not found, otherwise generic
    if ((error as any).code === "PGRST116") notFound();
  }
  if (!data) notFound();

  const l = data as Listing;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left: gallery + details */}
        <div className="lg:col-span-8 space-y-6">
          <Gallery images={l.images} />

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">{l.title}</h1>
            <div className="mt-1 text-slate-600">
              {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs uppercase text-slate-500">Type</div>
                <div className="text-sm font-semibold text-slate-900">{l.type === "sale" ? "Buy" : "Rent"}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs uppercase text-slate-500">Bedrooms</div>
                <div className="text-sm font-semibold text-slate-900">{l.bedrooms ?? 0}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs uppercase text-slate-500">Bathrooms</div>
                <div className="text-sm font-semibold text-slate-900">{l.bathrooms ?? 0}</div>
              </div>
            </div>

            {l.description && (
              <div className="mt-5">
                <h2 className="text-lg font-semibold text-slate-900">About this home</h2>
                <p className="mt-2 whitespace-pre-line text-slate-700">{l.description}</p>
              </div>
            )}

            {Array.isArray(l.amenities) && l.amenities.length > 0 && (
              <div className="mt-5">
                <h2 className="text-lg font-semibold text-slate-900">Amenities</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {l.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right: sticky contact card */}
        <div className="lg:col-span-4">
          <StickyContactCard
            listing={{
              id: l.id,
              title: l.title,
              type: l.type,
              price: l.price,
              currency: l.currency,
              bedrooms: l.bedrooms,
              bathrooms: l.bathrooms,
              city: l.city,
              area: l.area,
            }}
          />
        </div>
      </div>
    </main>
  );
}
