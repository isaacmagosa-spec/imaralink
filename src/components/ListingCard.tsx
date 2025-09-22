import Link from "next/link";

export type Listing = {
  id: string;
  created_at?: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  city?: string | null;
  area?: string | null;
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-KE", { style: "currency", currency }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const l = listing;
  return (
    <Link
      href={`/listing/${l.id}`}
      className="block rounded-xl border bg-white p-4 hover:shadow transition"
    >
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
  );
}
