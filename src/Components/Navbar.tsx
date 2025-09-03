import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight text-lg">
          ImaraLink<span className="text-blue-600">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/browse" className="hover:text-blue-600 underline-offset-4">Browse</Link>
          <Link href="/auth" className="hover:text-blue-600 underline-offset-4">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}