"use client";

import { useState } from "react";

type Payload = {
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  city?: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
};

export default function ListingForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload: Payload = {
      title: String(form.get("title") || "").trim(),
      type: (String(form.get("type") || "rent") as "rent" | "sale"),
      price: Number(form.get("price") || 0),
      currency: String(form.get("currency") || "KES"),
      city: String(form.get("city") || ""),
      area: String(form.get("area") || ""),
      bedrooms: Number(form.get("bedrooms") || 0),
      bathrooms: Number(form.get("bathrooms") || 0),
      description: String(form.get("description") || ""),
    };

    try {
      const res = await fetch("/api/listings/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const json = await res.json();
      const id = json?.listing?.id || json?.id;
      if (id) {
        window.location.assign(`/listing/${id}`);
        return;
      }
      setErr("Unexpected response. Please try again.");
    } catch (e: any) {
      setErr(e?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {err && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</div>}

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800">Title</label>
        <input required name="title" className="input" placeholder="e.g. Cozy bedsitter in Kileleshwa" />
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">Type</label>
          <select name="type" className="select" defaultValue="rent">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">Price</label>
          <input required name="price" type="number" min="0" className="input" placeholder="15000" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">Currency</label>
          <select name="currency" className="select" defaultValue="KES">
            <option value="KES">KES</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">City</label>
          <input name="city" className="input" placeholder="Nairobi" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">Area</label>
          <input name="area" className="input" placeholder="Kileleshwa" />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">Bedrooms</label>
          <input name="bedrooms" type="number" min="0" className="input" placeholder="0" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800">Bathrooms</label>
          <input name="bathrooms" type="number" min="0" className="input" placeholder="0" />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-800">Description</label>
        <textarea name="description" rows={4} className="input" placeholder="Tell guests/buyers about the property" />
      </div>

      <div className="flex justify-end gap-3">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create listing"}
        </button>
      </div>
    </form>
  );
}
