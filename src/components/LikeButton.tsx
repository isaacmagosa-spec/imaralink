// src/components/LikeButton.tsx
"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ id }: { id: string }) {
  const key = `like:${id}`;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(key) === "1");
  }, [key]);

  function toggle() {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(key, next ? "1" : "0");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      title={liked ? "Unlike" : "Like"}
      style={{
        borderRadius: 999, padding: "8px 12px", cursor: "pointer",
        border: "1px solid rgba(255,255,255,.12)",
        background: liked ? "linear-gradient(135deg,#ff7aa2,#ffbdde)" : "transparent",
        color: liked ? "#0a0f18" : "var(--text)",
        fontWeight: 600,
      }}
    >
      {liked ? "♥ Liked" : "♡ Like"}
    </button>
  );
}
