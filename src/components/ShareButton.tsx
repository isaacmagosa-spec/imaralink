"use client";

export default function ShareButton({ url, title }: { url: string; title: string }) {
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ url, title, text: title });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      }
    } catch {
      // user cancelled or no permission
    }
  }

  return (
    <button
      onClick={share}
      className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:brightness-110"
      title="Share"
    >
      Share
    </button>
  );
}
