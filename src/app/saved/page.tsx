"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Listing = {
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

const KEY = "imaralink:favorites";

export default function SavedPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [all, setAll] = useState<Listing[] | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const s = raw ? (JSON.parse(raw) as string[]) : [];
      setIds(s);
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    async function run() {
      try {
        const res = await fetch("/api/listings", { cache: "no-store" });
        const json = await res.json();
        setAll(json.listings ?? []);
      } catch {
        setAll([]);
      }
    }
    run();
  }, []);

  const saved = (all ?? []).filter((l) => ids.includes(l.id));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand-800">Saved homes</h1>
      {ids.length === 0 ? (
        <p className="mt-4 text-slate-600">
          You haven’t saved any homes yet. Browse and tap the heart to save.
        </p>
      ) : all === null ? (
        <p className="mt-4 text-slate-600">Loading your saved homes…</p>
      ) : saved.length === 0 ? (
        <p className="mt-4 text-slate-600">
          None of your saved homes are available right now.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((l) => (
            <Link key={l.id} href={`/listing/${l.id}`} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow">
              <div className="mb-3 h-40 w-full rounded-lg bg-slate-100" />
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-snug">{l.title}</h3>
                <span className="rounded bg-brand-50 px-2 py-1 text-[12px] text-brand-700 border border-brand-100">
                  {l.type}
                </span>
              </div>
              <div className="mt-1 text-sm text-slate-600">{l.city ?? "—"}{l.area ? ` • ${l.area}` : ""}</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
