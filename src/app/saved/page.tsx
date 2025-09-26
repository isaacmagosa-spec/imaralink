"use client";

import React from "react";
import ListingCard, { Listing } from "@/components/ListingCard";

export default function SavedPage() {
  const [ids, setIds] = React.useState<string[]>([]);
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("savedIds");
      const arr: string[] = raw ? JSON.parse(raw) : [];
      setIds(arr);
      if (arr.length === 0) {
        setLoading(false);
        return;
      }
      const url = `/api/listings?ids=${encodeURIComponent(arr.join(","))}`;
      fetch(url)
        .then((r) => r.json())
        .then((j) => setListings(j.listings || []))
        .finally(() => setLoading(false));
    } catch {
      setLoading(false);
    }
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Saved</h1>
      <p className="mt-2 text-slate-600">Your bookmarked homes.</p>

      {loading ? (
        <div className="mt-8 text-slate-500">Loading…</div>
      ) : ids.length === 0 ? (
        <p className="mt-8 text-slate-600">You haven’t saved anything yet.</p>
      ) : listings.length === 0 ? (
        <p className="mt-8 text-slate-600">No saved listings found.</p>
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </section>
      )}
    </main>
  );
}
