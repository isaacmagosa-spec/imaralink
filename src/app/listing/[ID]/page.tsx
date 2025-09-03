type Props = { params: { id: string } };

export default function ListingDetail({ params }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Listing #{params.id}</h1>
      <p className="text-gray-600 mt-2">Gallery, details, price, and contact actions will be shown here.</p>
    </main>
  );
}