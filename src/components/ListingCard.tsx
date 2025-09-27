import Link from "next/link";

export type Listing = {
  id: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  city?: string | null;
  area?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
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
    <span className={`badge ${isSale ? "badge-sale" : "badge-rent"}`}>
      {isSale ? "BUY" : "RENT"}
    </span>
  );
}

export default function ListingCard({ l }: { l: Listing }) {
  const href = `/listing/${l.id}`;
  return (
    <Link
      href={href}
      className="card card-hover block overflow-hidden no-underline"
    >
      <div className="h-40 w-full bg-white/[0.06]"></div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 font-semibold text-white">{l.title}</h3>
          <TypePill t={l.type} />
        </div>
        <div className="text-sm text-slate-300">
          {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""}
        </div>
        <div className="text-lg font-bold text-sky-300">
          {formatMoney(l.price, l.currency)}
        </div>
        <div className="text-sm text-slate-400">
          {l.bedrooms ?? 0} bed · {l.bathrooms ?? 0} bath
        </div>
      </div>
    </Link>
  );
}
