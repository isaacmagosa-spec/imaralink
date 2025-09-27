"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type FormState = {
  title: string;
  type: "rent" | "sale";
  price: number | "";
  currency: string;
  city: string;
  area: string;
  bedrooms: number | "";
  bathrooms: number | "";
  description: string;
};

const initial: FormState = {
  title: "",
  type: "rent",
  price: 15000,
  currency: "KES",
  city: "Nairobi",
  area: "Kileleshwa",
  bedrooms: 0,
  bathrooms: 0,
  description: "",
};

export default function ListingForm() {
  const router = useRouter();
  const [state, setState] = React.useState<FormState>(initial);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!state.title.trim()) return setError("Please enter a title.");
    if (!state.price || Number(state.price) <= 0) return setError("Enter a valid price.");

    setLoading(true);
    try {
      const res = await fetch("/api/listings/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: state.title.trim(),
          type: state.type,
          price: Number(state.price),
          currency: state.currency,
          city: state.city.trim() || null,
          area: state.area.trim() || null,
          bedrooms: Number(state.bedrooms) || 0,
          bathrooms: Number(state.bathrooms) || 0,
          description: state.description.trim() || null,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const json = await res.json();
      const id = json?.listing?.id as string | undefined;
      router.push(id ? `/listing/${id}` : "/browse");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 md:p-6 space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">List your property</h1>
        <p className="text-slate-300">Create a listing for short stay, monthly rent, or sale.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-slate-300">Title</label>
          <input className="input" placeholder="e.g. Cozy bedsitter in Kileleshwa"
            value={state.title} onChange={(e) => onChange("title", e.target.value)} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Type</label>
          <select className="select" value={state.type}
            onChange={(e) => onChange("type", e.target.value as "rent" | "sale")}>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Price</label>
            <input className="input" type="number" min={0} value={state.price}
              onChange={(e) => onChange("price", e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Currency</label>
            <select className="select" value={state.currency}
              onChange={(e) => onChange("currency", e.target.value)}>
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">City</label>
          <input className="input" value={state.city}
            onChange={(e) => onChange("city", e.target.value)} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Area</label>
          <input className="input" value={state.area}
            onChange={(e) => onChange("area", e.target.value)} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Bedrooms</label>
          <input className="input" type="number" min={0} value={state.bedrooms}
            onChange={(e) => onChange("bedrooms", e.target.value === "" ? "" : Number(e.target.value))} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Bathrooms</label>
          <input className="input" type="number" min={0} value={state.bathrooms}
            onChange={(e) => onChange("bathrooms", e.target.value === "" ? "" : Number(e.target.value))} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm text-slate-300">Description</label>
          <textarea className="textarea"
            placeholder="Tell guests/buyers about the property"
            value={state.description}
            onChange={(e) => onChange("description", e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create listing"}
        </button>
      </div>
    </form>
  );
}
