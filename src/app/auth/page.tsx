import Link from "next/link";

export default function AuthLanding() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold">Choose how you want to use ImaraLink</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Link href="/auth/owners-agents" className="rounded-2xl border p-5">Owners & Agents</Link>
        <Link href="/auth/rent-buy" className="rounded-2xl border p-5">Rent & Buy</Link>
      </div>
    </main>
  );
}