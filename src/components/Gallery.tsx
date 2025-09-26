import React from "react";

export default function Gallery({ images }: { images?: string[] | null }) {
  const pics = Array.isArray(images) ? images.filter(Boolean) : [];
  const has = pics.length > 0;

  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {has ? (
        <>
          {/* Large hero */}
          <div className="sm:col-span-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img
              src={pics[0]!}
              alt="Property photo 1"
              className="h-72 w-full object-cover sm:h-[420px]"
              loading="eager"
            />
          </div>

          {/* Side thumbnails */}
          <div className="sm:col-span-2 grid gap-3">
            {(pics.slice(1, 5).length ? pics.slice(1, 5) : pics.slice(0, 2)).map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <img
                  src={src}
                  alt={`Property photo ${i + 2}`}
                  className="h-32 w-full object-cover sm:h-[200px]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        // Placeholder grid
        <>
          <div className="sm:col-span-3 h-72 sm:h-[420px] rounded-xl border border-slate-200 bg-slate-100/70 flex items-center justify-center text-slate-500">
            Photo coming soon
          </div>
          <div className="sm:col-span-2 grid gap-3">
            <div className="h-32 sm:h-[200px] rounded-xl border border-slate-200 bg-slate-100/70" />
            <div className="h-32 sm:h-[200px] rounded-xl border border-slate-200 bg-slate-100/70" />
          </div>
        </>
      )}
    </div>
  );
}
