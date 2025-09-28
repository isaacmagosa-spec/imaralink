"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Chip = {
  label: string;
  params: Record<string, string>;
};

const chips: Chip[] = [
  { label: "Budget • under 20k", params: { maxPrice: "20000" } },
  { label: "Family • 3+ beds", params: { beds: "3" } },
  { label: "Stays • short", params: { type: "stay" } },
  { label: "Rent • Nairobi", params: { type: "rent", q: "Nairobi" } },
  { label: "Buy • Kileleshwa", params: { type: "sale", q: "Kileleshwa" } },
];

export default function QuickFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();

  const onClick = (p: Record<string, string>) => {
    const next = new URLSearchParams(sp!.toString());
    Object.entries(p).forEach(([k, v]) => {
      if (v === "") next.delete(k);
      else next.set(k, v);
    });
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c.label}
          onClick={() => onClick(c.params)}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 transition"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}




