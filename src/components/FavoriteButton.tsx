"use client";

import React, { useEffect, useState } from "react";

export default function FavoriteButton({ id }: { id: string }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fav_ids") || "[]";
      const arr: string[] = JSON.parse(raw);
      setFav(arr.includes(id));
    } catch {}
  }, [id]);

  function toggle() {
    try {
      const raw = localStorage.getItem("fav_ids") || "[]";
      let arr: string[] = JSON.parse(raw);
      if (arr.includes(id)) {
        arr = arr.filter((x) => x !== id);
        setFav(false);
      } else {
        arr.push(id);
        setFav(true);
      }
      localStorage.setItem("fav_ids", JSON.stringify(arr));
    } catch {}
  }

  return (
    <button
      aria-pressed={fav}
      onClick={toggle}
      title={fav ? "Remove from favorites" : "Save to favorites"}
      className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${fav ? "fill-rose-500 stroke-rose-500" : "fill-transparent stroke-slate-700"}`}
        strokeWidth={1.8}
      >
        <path d="M12 21s-6.716-4.088-9.164-7.32C1.19 11.75 1 9.928 2.06 8.56 3.5 6.72 6.3 6.41 8 8.06L12 12l4-3.94c1.7-1.65 4.5-1.34 5.94.5 1.06 1.37.87 3.19-.776 5.12C18.716 16.912 12 21 12 21Z" />
      </svg>
    </button>
  );
}
