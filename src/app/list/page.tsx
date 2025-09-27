"use client";
import { useState } from "react";

export default function ListPage() {
  const [form, setForm] = useState({
    title: "",
    type: "rent",
    price: 15000,
    currency: "KES",
    city: "",
    area: "",
    bedrooms: 0,
    bathrooms: 0,
    description: "",
  });

  return (
    <div className="container-tight py-8">
      <h1 className="text-3xl font-bold">List your property</h1>
      <p className="mt-1 text-slate-300">
        Create a listing for short stay, monthly rent, or sale.
      </p>

      <form
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:col-span-2">
          <label className="label">Title</label>
          <input
            className="input"
            placeholder="e.g. Cozy bedsitter in Kileleshwa"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Type</label>
          <select
            className="select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "rent" | "sale" })}
          >
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="number"
            className="input"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })}
          />
        </div>

        <div>
          <label className="label">Currency</label>
          <select
            className="select"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label className="label">City</label>
          <input
            className="input"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Area</label>
          <input
            className="input"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </div>

        <div>
          <label className="label">Bedrooms</label>
          <input
            type="number"
            className="input"
            value={form.bedrooms}
            onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) || 0 })}
          />
        </div>

        <div>
          <label className="label">Bathrooms</label>
          <input
            type="number"
            className="input"
            value={form.bathrooms}
            onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) || 0 })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            rows={4}
            className="input"
            placeholder="Tell guests/buyers about the property"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn-primary">Create listing</button>
        </div>
      </form>
    </div>
  );
}
