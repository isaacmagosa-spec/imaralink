import React from "react";
import InquiryForm from "@/components/InquiryForm";

type Props = {
  listing: {
    id: string;
    title: string;
    type: "rent" | "sale";
    price: number;
    currency: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    city?: string | null;
    area?: string | null;
  };
};

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-KE", { style: "currency", currency }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString()}`;
  }
}

export default function StickyContactCard({ listing }: Props) {
  const badge = listing.type === "sale" ? "BUY" : "RENT";

  return (
    <aside className="sticky top-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">
              {listing.title}
            </h3>
            <span className="inline-flex shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
              {badge}
            </span>
          </div>
          <div className="mt-1 text-sm text-slate-600">
            {(listing.city ?? "—")}{listing.area ? ` • ${listing.area}` : ""}
          </div>
          <div className="mt-3 text-2xl font-bold text-indigo-700">
            {formatMoney(listing.price, listing.currency)}
          </div>
          <div className="mt-1 text-sm text-slate-700">
            {listing.bedrooms ?? 0} bed · {listing.bathrooms ?? 0} bath
          </div>
        </div>

        <div className="p-4">
          {/* Your client component handles the POST to /api/inquiries */}
          <InquiryForm listingId={listing.id} />
        </div>
      </div>
    </aside>
  );
}
