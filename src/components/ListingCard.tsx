import Link from "next/link";
import ShareButton from "./ShareButton";

type Listing = {
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
  const badge =
    l.type === "sale" ? "Buy" : "Rent";
  const href = `/listing/${l.id}`;

  return (
    <div className="group rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      {/* Image */}
      <Link href={href} className="block">
        <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[var(--brand-50)] to-white">
          {/* Placeholder thumbnail */}
          <div className="absolute inset-0 grid place-items-center text-xs text-[var(--ink-500)]">
            Photo coming soon
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-700)] ring-1 ring-[var(--brand-200)]">
            {badge}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={href} className="font-semibold leading-tight text-[var(--ink-900)] hover:underline">
            {l.title}
          </Link>
          <ShareButton url={typeof window === 'undefined' ? href : window.location.origin + href} title={l.title} />
        </div>

        <div className="mt-1 text-sm text-[var(--ink-600)]">
          {(l.city ?? "—")}{l.area ? ` • ${l.area}` : ""}
        </div>

        <div className="mt-3 text-[var(--brand-700)] font-bold">
          {formatMoney(l.price, l.currency)}
        </div>

        <div className="mt-2 text-sm text-[var(--ink-700)]">
          {(l.bedrooms ?? 0)} bed · {(l.bathrooms ?? 0)} bath
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={href}
            className="inline-flex items-center rounded-lg bg-[var(--brand-600)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--brand-700)]"
          >
            View details
          </Link>
          <Link
            href={`/listing/${l.id}/contact`}
            className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm text-[var(--ink-700)] hover:bg-[var(--brand-50)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
