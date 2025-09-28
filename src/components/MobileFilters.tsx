"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function MobileFilters() {
  const sp = useSearchParams();
  const q = sp!.get("q") ?? "";
  const type = sp!.get("type") ?? "";

  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-white font-medium shadow hover:bg-indigo-700 transition"
      >
        Filters
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white p-4 shadow-2xl">
            <div className="mx-auto max-w-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border px-3 py-1.5 text-sm"
                >
                  Close
                </button>
              </div>

              <form className="mt-4 space-y-3" method="get" onSubmit={() => setOpen(false)}>
                <input
                  type="search"
                  name="q"
                  placeholder="Search by title or area"
                  defaultValue={q}
                  className="w-full rounded-lg border px-3 py-2"
                />

                <select
                  name="type"
                  defaultValue={type}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="">All types</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Buy</option>
                </select>

                <div className="flex gap-3 pt-1">
                  <a
                    href="/browse"
                    className="flex-1 rounded-lg border px-4 py-2 text-center font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Clear
                  </a>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


