"use client";

import { useState } from "react";

export default function ListingGallery({ images }: { images: string[] }) {
  const hasImages = images && images.length > 0;
  const [active, setActive] = useState(0);

  if (!hasImages) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100">
        <div className="flex h-72 items-center justify-center text-sm text-slate-500">
          Photos coming soon
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white">
      <div className="aspect-[16/10] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Listing photo"
          src={images[active]}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-5 gap-2 p-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`overflow-hidden rounded-lg border ${
              i === active ? "border-indigo-600" : "border-slate-200"
            }`}
            title={`Photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={src} className="h-16 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
