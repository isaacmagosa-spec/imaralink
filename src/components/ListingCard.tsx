import Link from "next/link";

export type Listing = {
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

function TypePill({ t }: { t: "rent" | "sale" }) {
  const isSale = t === "sale";
  return (
    <span
      className={
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ring-1 " +
        (isSale
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-indigo-50 text-indigo-700 ring-indigo-200")
      }
    >
      {isSale ? "Buy" : "Rent"}
    </span>
  );
}

export default function ListingCard({ l }: { l: Listing }) {
  const href = `/listing/${l.id}`;
  const location = [l.city, l.area].filter(Boolean).join(" • ") || "—";
  const price = formatMoney(l.price, l.currency);

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition
                 hover:shadow-md hover:ring-2 hover:ring-indigo-200"
    >
      {/* Image (placeholder) */}
      <div className="relative h-40 w-full bg-slate-100">
        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
          Photo coming soon
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-semibold text-slate-900 group-hover:text-indigo-800">
            {l.title}
          </h3>
          <TypePill t={l.type} />
        </div>

        <div className="text-sm text-slate-600">{location}</div>

        <div className="mt-3 text-indigo-800 font-bold">{price}</div>

        <div className="mt-2 text-sm text-slate-700">
          {(l.bedrooms ?? 0)} bed · {(l.bathrooms ?? 0)} bath
        </div>
      </div>
    </Link>
  );
}
