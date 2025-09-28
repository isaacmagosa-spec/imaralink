"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Tab = { key: "short" | "monthly" | "sale"; label: string };
const TABS: Tab[] = [
  { key: "short", label: "Short Stays" },
  { key: "monthly", label: "Monthly Rent" },
  { key: "sale", label: "Buy" },
];

export default function CategoryTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const active = (sp!.get("category") as Tab["key"]) || "monthly";

  function setCategory(key: Tab["key"]) {
    const params = new URLSearchParams(sp!.toString());
    if (key) params.set("category", key);
    else params.delete("category");
    // Reset page-like params if you add them later
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="inline-flex rounded-2xl border bg-white p-1 shadow-sm">
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setCategory(t.key)}
            className={[
              "px-4 py-2 text-sm rounded-xl transition",
              isActive
                ? "bg-brand-600 text-white shadow"
                : "text-slate-600 hover:bg-slate-50"
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}


