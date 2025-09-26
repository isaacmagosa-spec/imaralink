import Link from "next/link";

export type Listing = {
  id: string;
  created_at?: string | null;
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

export default function ListingCard({ l }: { l: Listing }) {
  const badge = l.type === "sale" ? "Buy" : "Rent";
  const href = `/listing/${l.id}`;

  return (
    <Link
      href={href}
      className="card block hover:shadow-md transition-shadow"
    >
      <div className="mb-3 h-44 w-full overflow-hidden rounded-xl bg-slate-100 grid place-items-center text-xs text-slate-500">
        {Array.isArray(l.images) && l.images.length > 0 ? (
          <img
            src={l.images[0]}
            alt={l.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>Photo coming soon</span>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold leading-tight text-slate-900">{l.title}</h2>
        <span className="inline-flex shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] uppercase tracking-wide text-blue-700">
          {badge}
        </span>
      </div>

      <div className="mt-1 text-sm text-slate-600">
        {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""}
      </div>

      <div className="mt-3 text-blue-700 font-bold">
        {formatMoney(l.price, l.currency)}
      </div>

      <div className="mt-2 text-sm text-slate-700">
        {(l.bedrooms ?? 0)} bed · {(l.bathrooms ?? 0)} bath
      </div>
    </Link>
  );
}
