"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SearchFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = React.useState(sp.get("q") ?? "");
  const [type, setType] = React.useState(sp.get("type") ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (type) params.set("type", type);
    router.push(`/browse?${params.toString()}`);
  }
  function onClear() {
    setQ("");
    setType("");
    router.push("/browse");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card mb-6 p-4 md:p-5"
    >
      <div className="mb-3 text-lg font-semibold text-white">
        Find your next home
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        <input
          className="input md:col-span-2"
          type="search"
          placeholder="Search title or area"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All types</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

        <div className="md:col-span-2 flex gap-2">
          <button type="button" onClick={onClear} className="btn btn-ghost w-full md:w-auto">
            Clear
          </button>
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Apply
          </button>
        </div>
      </div>
    </form>
  );
}
