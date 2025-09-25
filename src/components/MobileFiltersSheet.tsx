"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import QuickFilters from "./QuickFilters";
import SearchFilters from "./SearchFilters";

export default function MobileFiltersSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center gap-2 rounded-full bg-white text-indigo-900 px-4 py-2 font-medium shadow hover:shadow-md transition"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 top-0 bg-[#0b1223]">
            <div className="mx-auto max-w-2xl h-full flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <div className="text-lg font-semibold">Filters</div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              <div className="px-4 py-4 overflow-y-auto space-y-6">
                <QuickFilters />
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <SearchFilters />
                </div>
              </div>

              <div className="mt-auto px-4 pb-5 pt-3 border-t border-white/10 bg-white/5">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white py-3 font-semibold transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
