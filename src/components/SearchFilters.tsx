'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SegmentedTabs from './SegmentedTabs';

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const q     = sp.get('q') ?? '';
  const type  = sp.get('type') ?? '';      // rent | sale
  const min   = sp.get('min') ?? '';
  const max   = sp.get('max') ?? '';
  const beds  = sp.get('beds') ?? '';
  const baths = sp.get('baths') ?? '';

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next = new URLSearchParams(sp.toString());

    const map: Array<[string,string]> = [
      ['q', (form.get('q') as string) || ''],
      ['type', (form.get('type') as string) || ''],
      ['min', (form.get('min') as string) || ''],
      ['max', (form.get('max') as string) || ''],
      ['beds', (form.get('beds') as string) || ''],
      ['baths', (form.get('baths') as string) || ''],
    ];

    for (const [k,v] of map) {
      if (v) next.set(k, v); else next.delete(k);
    }

    router.push(`${pathname}?${next.toString()}`);
  }

  function clearAll() {
    router.push(pathname);
  }

  return (
    <section className="mb-6 rounded-2xl border bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-[var(--ink-900)]">Find your next home</h2>
        <SegmentedTabs />
      </div>

      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-6">
        <input
          name="q"
          type="search"
          placeholder="Search location or title (e.g. Kileleshwa)"
          defaultValue={q}
          className="rounded-lg border px-3 py-2 md:col-span-2"
        />

        <select
          name="type"
          defaultValue={type}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All</option>
          <option value="rent">Rent</option>
          <option value="sale">Buy</option>
        </select>

        <input
          name="min"
          type="number"
          inputMode="numeric"
          placeholder="Min price"
          defaultValue={min}
          className="rounded-lg border px-3 py-2"
        />
        <input
          name="max"
          type="number"
          inputMode="numeric"
          placeholder="Max price"
          defaultValue={max}
          className="rounded-lg border px-3 py-2"
        />

        <input
          name="beds"
          type="number"
          min={0}
          placeholder="Beds"
          defaultValue={beds}
          className="rounded-lg border px-3 py-2"
        />
        <input
          name="baths"
          type="number"
          min={0}
          placeholder="Baths"
          defaultValue={baths}
          className="rounded-lg border px-3 py-2"
        />

        <div className="md:col-span-6 flex gap-2 justify-end">
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg border px-4 py-2 text-[var(--ink-700)] hover:bg-[var(--brand-50)]"
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[var(--brand-600)] px-5 py-2 font-medium text-white hover:bg-[var(--brand-700)]"
          >
            Apply
          </button>
        </div>
      </form>
    </section>
  );
}
