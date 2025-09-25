"use client";

import { useEffect, useState } from "react";

const KEY = "imaralink:favorites";

function readFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set<string>(JSON.parse(raw));
  } catch {
    return new Set();
  }
}
function writeFavorites(ids: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(ids)));
  } catch {}
}

export default function FavoriteButton({ id, size = 40 }: { id: string; size?: number }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const s = readFavorites();
    setFav(s.has(id));
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const s = readFavorites();
    if (s.has(id)) s.delete(id);
    else s.add(id);
    writeFavorites(s);
    setFav(s.has(id));
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={fav}
      aria-label={fav ? "Remove from saved" : "Save home"}
      className="grid place-items-center rounded-full bg-white/95 border shadow-sm hover:shadow transition"
      style={{ width: size, height: size }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill={fav ? "#144a8d" : "none"} stroke="#144a8d" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}
