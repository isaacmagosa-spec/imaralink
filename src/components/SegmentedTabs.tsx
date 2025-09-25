'use client';

import React from 'react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

type Tab = { key: string; label: string; };

const TABS: Tab[] = [
  { key: 'stay', label: 'Stay' }, // short stays (UI-only for now)
  { key: 'rent', label: 'Rent' },
  { key: 'buy',  label: 'Buy'  },
];

export default function SegmentedTabs() {
  const router = useRouter();
  const sp = useSearchParams();
  const active = sp.get('category') ?? 'rent';

  function onSelect(next: string) {
    const params = new URLSearchParams(sp.toString());
    params.set('category', next);
    // Map UI category -> current DB filter (type)
    if (next === 'buy') params.set('type', 'sale');
    else params.set('type', 'rent'); // 'stay' & 'rent' both show rent for now

    // reset pagination-ish params if you add them later
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <div className="inline-flex rounded-xl border bg-white p-1 shadow-sm">
      {TABS.map(t => (
        <button
          key={t.key}
          type="button"
          onClick={() => onSelect(t.key)}
          className={clsx(
            "px-4 py-2 text-sm rounded-lg transition",
            active === t.key
              ? "bg-[var(--brand-600)] text-white"
              : "text-[var(--ink-700)] hover:bg-[var(--brand-50)]"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
