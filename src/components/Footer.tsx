"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-surface">
      <div className="container grid gap-8 py-8 md:grid-cols-3">
        <div className="space-y-2">
          <div className="font-semibold">Imaralink</div>
          <p className="text-sm text-slate-400">
            Short stays, monthly rentals, and homes for sale — all in one place.
          </p>
        </div>

        <div>
          <div className="mb-2 font-semibold">Company</div>
          <ul className="space-y-1 text-sm text-slate-300">
            <li><Link href="#" className="hover:text-white">About</Link></li>
            <li><Link href="#" className="hover:text-white">Contact</Link></li>
            <li><Link href="#" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-2 font-semibold">Explore</div>
          <ul className="space-y-1 text-sm text-slate-300">
            <li><Link href="/browse" className="hover:text-white">Browse Listings</Link></li>
            <li><Link href="/list" className="hover:text-white">List your property</Link></li>
            <li><Link href="/saved" className="hover:text-white">Saved</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Imaralink. All rights reserved.
      </div>
    </footer>
  );
}
