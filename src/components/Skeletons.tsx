import React from "react";

export function FilterSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur-sm">
      <div className="h-8 w-40 rounded-lg bg-slate-200/60" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-slate-200/50" />
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-10 w-20 rounded-lg bg-slate-200/60" />
        <div className="h-10 w-24 rounded-lg bg-slate-200/60" />
      </div>
    </div>
  );
}

export function ListingsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm"
        >
          <div className="h-40 w-full bg-slate-100" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-2/3 bg-slate-200 rounded" />
            <div className="h-3 w-1/3 bg-slate-200 rounded" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-3 w-1/2 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
