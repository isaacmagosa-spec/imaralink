"use client";

import React from "react";

export default function SaveButton({ id, compact = false }: { id: string; compact?: boolean }) {
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("savedIds");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      setSaved(ids.includes(id));
    } catch {}
  }, [id]);

  function toggle() {
    try {
      const raw = localStorage.getItem("savedIds");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      localStorage.setItem("savedIds", JSON.stringify(next));
      setSaved(next.includes(id));
    } catch {
      alert("Unable to save on this device.");
    }
  }

  if (compact) {
    return (
      <button
        onClick={toggle}
        aria-pressed={saved}
        className={`rounded-md px-2 py-1 text-xs font-medium ${
          saved ? "bg-blue-50 text-blue-800" : "bg-slate-100 text-slate-700"
        } hover:brightness-110`}
        title={saved ? "Unsave" : "Save"}
      >
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      className={`rounded-lg px-3 py-2 text-sm font-medium ${
        saved ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
      } hover:brightness-110`}
      title={saved ? "Unsave" : "Save"}
    >
      {saved ? "Saved" : "Save for later"}
    </button>
  );
}
