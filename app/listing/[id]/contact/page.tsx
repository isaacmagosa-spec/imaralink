import InquiryForm from "@/components/InquiryForm";

export const dynamic = "force-dynamic";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Contact about this listing</h1>
      <InquiryForm listingId={id} />
    </main>
  );
}
