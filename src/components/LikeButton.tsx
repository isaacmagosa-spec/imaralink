"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ id }: { id: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("likes") || "{}";
    try {
      const map = JSON.parse(raw) as Record<string, boolean>;
      setLiked(!!map[id]);
    } catch {
      setLiked(false);
    }
  }, [id]);

  function toggle() {
    const raw = localStorage.getItem("likes") || "{}";
    let map: Record<string, boolean> = {};
    try {
      map = JSON.parse(raw);
    } catch {}
    map[id] = !liked;
    localStorage.setItem("likes", JSON.stringify(map));
    setLiked(!liked);
  }

  return (
    <button
      onClick={toggle}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      className={`rounded-full border px-2.5 py-2 transition ${
        liked
          ? "bg-pink-500/20 border-pink-400/30 text-pink-300"
          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
      }`}
    >
      <Heart size={16} fill={liked ? "currentColor" : "none"} />
    </button>
  );
}
