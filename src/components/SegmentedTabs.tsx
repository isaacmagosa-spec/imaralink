"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Tab = { key: "" | "stays" | "rent" | "sale"; label: string };
const TABS: Tab[] = [
  { key: "", label: "Explore" },
  { key: "stays", label: "Stays" }, // maps to type=rent
  { key: "rent", label: "Rent" },
  { key: "sale", label: "Buy" },
];

export default function SegmentedTabs() {
  const router = useRouter();
  const sp = useSearchParams();

  const activeType = sp!.get("type") ?? "";

  function select(key: Tab["key"]) {
    const p = new URLSearchParams(sp!.toString());
    if (key === "") {
      p.delete("type");
    } else if (key === "stays") {
      p.set("type", "rent");
    } else {
      p.set("type", key);
    }
    router.push(`/browse${p.toString() ? `?${p}` : ""}`);
  }

  return (
    <div className="inline-flex rounded-xl bg-slate-800/30 p-1 ring-1 ring-white/10">
      {TABS.map((t) => {
        const selected =
          t.key === ""
            ? activeType === ""
            : t.key === "stays"
            ? activeType === "rent"
            : activeType === t.key;
        return (
          <button
            key={t.key}
            onClick={() => select(t.key)}
            className={`min-w-[84px] rounded-lg px-3 py-1.5 text-sm font-medium transition
              ${selected ? "bg-white text-slate-900 shadow" : "text-slate-200 hover:bg-white/10"}`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

