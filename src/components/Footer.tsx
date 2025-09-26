import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1f3a] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="mb-2 text-lg font-semibold">Imaralink</div>
          <p className="text-white/70 text-sm">
            Short stays, monthly rentals, and homes for sale — all in one place.
          </p>
        </div>
        <div>
          <div className="mb-2 font-medium">Company</div>
          <ul className="space-y-1 text-sm">
            <li><Link className="hover:underline" href="/about">About</Link></li>
            <li><Link className="hover:underline" href="/contact">Contact</Link></li>
            <li><Link className="hover:underline" href="/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-2 font-medium">Explore</div>
          <ul className="space-y-1 text-sm">
            <li><Link className="hover:underline" href="/browse">Browse Listings</Link></li>
            <li><Link className="hover:underline" href="/list">List your property</Link></li>
            <li><Link className="hover:underline" href="/saved">Saved</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-center text-xs text-white/70">
          © {new Date().getFullYear()} Imaralink. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
