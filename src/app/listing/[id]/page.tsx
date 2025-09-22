import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const revalidate = 0; // always render fresh

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
  images?: string[] | null;
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-KE", { style: "currency", currency }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
}

// Use the real title for SEO when possible.
// Next.js (app router) passes params as a Promise in v15.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("listings")
      .select("title")
      .eq("id", id)
      .maybeSingle();

    const title = data?.title?.trim();
    return {
      title: title ? `${title} • Imaralink` : `Listing • Imaralink`,
      description: title ? `Details for ${title} on Imaralink.` : "Listing details on Imaralink.",
    };
  } catch {
    return {
      title: `Listing • Imaralink`,
      description: "Listing details on Imaralink.",
    };
  }
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <main className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Error loading listing</h1>
          <p className="mt-2 text-red-600">{error.message}</p>
          <div className="mt-6">
            <Link href="/browse" className="text-blue-700 hover:underline">
              ← Back to Browse
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    notFound();
  }

  const l = data as Listing;

  return (
    <main className="mx-auto max-w-3xl">
      <article className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Image placeholder */}
        <div className="mb-5 h-56 w-full rounded-xl bg-gray-100 flex items-center justify-center text-sm text-gray-500">
          Photo coming soon
        </div>

        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold leading-tight">{l.title}</h1>
          <span className="inline-flex shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] uppercase tracking-wide">
            {l.type}
          </span>
        </div>

        <div className="mt-1 text-gray-600">
          {(l.city ?? "—")}
          {l.area ? ` • ${l.area}` : ""}
        </div>

        <div className="mt-3 text-blue-700 text-xl font-bold">
          {formatMoney(l.price, l.currency)}
        </div>

        <div className="mt-2 text-sm text-gray-700">
          {l.bedrooms ?? 0} bed · {l.bathrooms ?? 0} bath
        </div>

        {l.description ? (
          <p className="mt-5 whitespace-pre-wrap text-gray-800">{l.description}</p>
        ) : null}

        <div className="mt-8 flex gap-3">
          <Link
            href={`/listing/${l.id}/contact`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Contact Owner/Agent
          </Link>
          <Link href="/browse" className="rounded-lg border px-4 py-2 hover:bg-gray-50 transition">
            Back to Browse
          </Link>
        </div>
      </article>
    </main>
  );
}
