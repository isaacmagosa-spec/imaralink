import { getSupabaseClient } from "@/lib/supabaseClient";
import Link from "next/link";

type Listing = {
  id: string;
  created_at: string;
  title: string;
  type: "rent" | "sale" | "stay";
  price: number;
  currency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  city?: string | null;
  area?: string | null;
  description?: string | null;
  images?: string[] | null;
};

function money(n: number, cur: string) {
  try {
    return new Intl.NumberFormat("en-KE", { style: "currency", currency: cur }).format(n);
  } catch {
    return `${cur} ${n.toLocaleString()}`;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  const { data } = await supabase.from("listings").select("title,city,area,type,price,currency").eq("id", id).maybeSingle();
  const t = data?.title ? `${data.title} • ImaraLink` : "Listing • ImaraLink";
  return {
    title: t,
    openGraph: {
      title: t,
      description: data ? `${data.city ?? ""} ${data.area ? "• " + data.area : ""} — ${money(data.price, data.currency)}` : undefined,
    },
  };
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Listing not available</h1>
        <p className="text-white/70 mt-2">It may have been removed or is temporarily unavailable.</p>
        <div className="mt-6">
          <Link href="/browse" className="btn btn-primary">Back to browse</Link>
        </div>
      </main>
    );
  }

  const l = data as Listing;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-7 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/40 to-indigo-900/10 h-64 md:h-80 flex items-center justify-center">
              <span className="text-sm text-white/70">Main photo</span>
            </div>
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-white/10 h-24 md:h-36 flex items-center justify-center">
                  <span className="text-[11px] text-white/70">Photo {i + 2}</span>
                </div>
              ))}
            </div>
          </div>

          <h1 className="mt-6 text-2xl font-bold leading-tight">{l.title}</h1>
          <div className="mt-1 text-white/70">
            {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""} • <span className="uppercase text-xs tracking-wide">{l.type}</span>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Price</div>
              <div className="text-lg font-semibold">{money(l.price, l.currency)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Bedrooms</div>
              <div className="text-lg font-semibold">{l.bedrooms ?? 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Bathrooms</div>
              <div className="text-lg font-semibold">{l.bathrooms ?? 0}</div>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">About this place</h2>
            <p className="mt-2 text-white/80 leading-relaxed">
              {l.description ?? "No description provided yet."}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Location</h2>
            <div className="mt-3 h-56 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/30 to-indigo-900/10 flex items-center justify-center">
              <span className="text-sm text-white/70">Map placeholder</span>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
            <div>
              <div className="text-xs text-white/60">Price</div>
              <div className="text-2xl font-bold">{money(l.price, l.currency)}</div>
            </div>
            <a href={`/listing/${l.id}/contact`} className="btn btn-primary w-full text-center">
              Inquire
            </a>
            <div className="text-xs text-white/60">
              Safe messaging—your contact details are only shared when you choose.
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
