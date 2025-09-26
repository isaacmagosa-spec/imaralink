"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const [type, setType] = useState(sp.get("type") ?? "");
  const [min, setMin] = useState(sp.get("min") ?? "");
  const [max, setMax] = useState(sp.get("max") ?? "");
  const [beds, setBeds] = useState(sp.get("beds") ?? "");
  const [baths, setBaths] = useState(sp.get("baths") ?? "");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (type) p.set("type", type);
    if (min) p.set("min", min);
    if (max) p.set("max", max);
    if (beds) p.set("beds", beds);
    if (baths) p.set("baths", baths);
    startTransition(() => router.push(`/browse${p.toString() ? `?${p}` : ""}`));
  }

  function clear() {
    startTransition(() => router.push("/browse"));
    setQ(""); setType(""); setMin(""); setMax(""); setBeds(""); setBaths("");
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Find your next home</h2>
        <a
          href="/listing/new"
          className="hidden sm:inline-flex rounded-lg bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700"
        >
          Post a Listing
        </a>
      </div>

      <form onSubmit={apply} className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search location or title (e.g. Kileleshwa)"
          className={`${inputCls} col-span-2 sm:col-span-2`}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`${inputCls} col-span-1`}
        >
          <option value="">All</option>
          <option value="rent">Rent</option>
          <option value="sale">Buy</option>
        </select>
        <input
          value={min}
          onChange={(e) => setMin(e.target.value)}
          inputMode="numeric"
          placeholder="Min price"
          className={`${inputCls} col-span-1`}
        />
        <input
          value={max}
          onChange={(e) => setMax(e.target.value)}
          inputMode="numeric"
          placeholder="Max price"
          className={`${inputCls} col-span-1`}
        />
        <input
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          inputMode="numeric"
          placeholder="Beds"
          className={`${inputCls} col-span-1`}
        />
        <input
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          inputMode="numeric"
          placeholder="Baths"
          className={`${inputCls} col-span-1`}
        />

        <div className="col-span-2 sm:col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {isPending ? "Applying…" : "Apply"}
          </button>
        </div>
      </form>
    </section>
  );
}
