"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0b1223]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-lg font-extrabold">
            Imara<span className="text-indigo-400">Link</span>
          </div>
          <p className="mt-2 text-white/70 text-sm">
            Find short stays, rentals, and homes to buy across Kenya.
          </p>
        </div>

        <div>
          <div className="font-semibold mb-2">Explore</div>
          <ul className="space-y-1 text-white/80">
            <li><Link href="/browse?type=stay" className="hover:text-white">Short Stays</Link></li>
            <li><Link href="/browse?type=rent" className="hover:text-white">Rent</Link></li>
            <li><Link href="/browse?type=sale" className="hover:text-white">Buy</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1 text-white/80">
            <li><a className="hover:text-white" href="#">About</a></li>
            <li><a className="hover:text-white" href="#">Contact</a></li>
            <li><a className="hover:text-white" href="#">Terms</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2">Get the latest</div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2"
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-indigo-500"
            />
            <button className="rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 font-semibold">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-white/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} ImaraLink</span>
          <span>Made with ♥</span>
        </div>
      </div>
    </footer>
  );
}
