import InquiryForm from "@/components/InquiryForm";
import Link from "next/link";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <Link
          href={`/listing/${id}`}
          className="text-sm text-blue-700 hover:underline"
        >
          ← Back to listing
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">Contact the owner/agent</h1>
      <p className="text-gray-600 mb-6">
        Send your inquiry about this property. We’ll notify the owner/agent.
      </p>

      <div className="rounded-xl border bg-white p-5">
        <InquiryForm listingId={id} />
      </div>
    </main>
  );
}
