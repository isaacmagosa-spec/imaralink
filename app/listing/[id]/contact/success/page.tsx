import Link from "next/link";

export const revalidate = 0;

export default async function ContactSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Thanks — we received your inquiry.</h1>
        <p className="mt-2 text-gray-700">
          The owner/agent will get back to you soon.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/browse"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    </main>
  );
}
