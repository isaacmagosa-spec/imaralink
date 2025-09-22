"use client";

import { useSearchParams } from "next/navigation";

export default function SearchFilters() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const type = sp.get("type") ?? "";

  return (
    <form className="grid grid-cols-1 sm:grid-cols-3 gap-3" method="get" action="/browse">
      <input
        type="search"
        name="q"
        placeholder="Search by title (e.g. Kileleshwa)"
        defaultValue={q}
        className="rounded-lg border px-3 py-2"
      />
      <select
        name="type"
        defaultValue={type}
        className="rounded-lg border px-3 py-2"
      >
        <option value="">All types</option>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </form>
  );
}
