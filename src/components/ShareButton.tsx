'use client';

import React from 'react';

export default function ShareButton({ url, title }: { url: string; title: string; }) {
  async function onShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch {
      // user cancelled or share not available
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="rounded-lg border px-3 py-1.5 text-sm text-[var(--ink-700)] hover:bg-[var(--brand-50)]"
      aria-label="Share listing"
      title="Share"
    >
      Share
    </button>
  );
}
