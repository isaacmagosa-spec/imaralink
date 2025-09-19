import { notFound } from "next/navigation";

type Listing = {
  id: string;
  created_at: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  city?: string | null;
  area?: string | null;
  description?: string | null;
  images?: string[] | null;
  contact_name?: string | null;
  contact_phone?: string | null;
};

function baseUrl() {
  // Production on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Local dev fallback (adjust port if you run a different one)
  return `http://127.0.0.1:${process.env.PORT ?? 3001}`;
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${baseUrl()}/api/listings/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to load listing (${res.status})`);
  }

  const { listing } = (await res.json()) as { listing: Listing };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">{listing.title}</h1>
      <p className="text-gray-600 mt-2">
        {listing.city || ""} {listing.area ? `• ${listing.area}` : ""}
      </p>

      <section className="mt-6 space-y-3">
        <div className="text-lg">
          <span className="font-semibold">
            {listing.currency} {listing.price.toLocaleString()}
          </span>{" "}
          <span className="uppercase text-xs ml-2 rounded bg-gray-100 px-2 py-1">
            {listing.type}
          </span>
        </div>

        {!!listing.bedrooms && (
          <div className="text-gray-700">{listing.bedrooms} bed</div>
        )}
        {!!listing.bathrooms && (
          <div className="text-gray-700">{listing.bathrooms} bath</div>
        )}

        {listing.description && (
          <p className="text-gray-800 mt-4">{listing.description}</p>
        )}

        {(listing.images?.length ?? 0) > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-6">
            {listing.images!.map((src, i) => (
              <div key={i} className="aspect-video bg-gray-100 rounded" />
              // Swap the div above with Next/Image when real image URLs exist
            ))}
          </div>
        )}

        {(listing.contact_phone || listing.contact_name) && (
          <div className="mt-8">
            <a
              href={listing.contact_phone ? `tel:${listing.contact_phone}` : "#"}
              className="inline-block rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              {listing.contact_phone
                ? `Call ${listing.contact_name ?? "owner/agent"}`
                : `Contact ${listing.contact_name ?? "owner/agent"}`}
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
