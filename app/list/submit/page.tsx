"use client";

import { useState } from "react";

export default function ListSubmitPage() {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setOk(null);
    setErr(null);

    try {
      // Stub UX: pretend we submit to moderation queue.
      await new Promise((r) => setTimeout(r, 900));
      setOk("Thanks! Your listing has been received for review.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to submit listing.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-black text-slate-900">List your property</h1>
      <p className="mt-2 text-sm text-slate-600">
        Short stays, monthly rentals, or for sale — basic details first. We’ll contact you to verify.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Title
            <input name="title" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Cozy 1BR in Kileleshwa" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Type
            <select name="type" required className="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="rent">Monthly Rental</option>
              <option value="sale">For Sale</option>
              <option value="short">Short Stay (Airbnb-style)</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-medium text-slate-700">
            Price
            <input type="number" min="0" name="price" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="15000" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Currency
            <select name="currency" className="mt-1 w-full rounded-lg border px-3 py-2">
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Bedrooms
            <input type="number" min="0" name="bedrooms" className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="1" />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            City
            <input name="city" className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Nairobi" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Area
            <input name="area" className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Kileleshwa" />
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea name="description" rows={4} className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Tell renters/buyers what makes this place great." />
        </label>

        <button
          disabled={busy}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {busy ? "Submitting…" : "Submit for review"}
        </button>

        {ok && <p className="text-sm text-green-700">{ok}</p>}
        {err && <p className="text-sm text-rose-700">{err}</p>}
      </form>
    </main>
  );
}
