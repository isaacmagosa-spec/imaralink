import { supabase } from "../../../lib/supabaseClient";

// Next.js 15: params is async in app router
export default async function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="text-gray-600 mt-2">
          {error?.message ?? "This listing may have been removed."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <div className="text-gray-700 mt-1 capitalize">
        {data.type} • {data.city || data.area || "—"}
      </div>
      <div className="mt-2 text-xl font-extrabold">
        KES{" "}
        {new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(
          Number(data.price)
        )}
      </div>

      <p className="mt-6 text-gray-700 whitespace-pre-line">
        {data.description ?? "No description provided."}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Bedrooms:</span>{" "}
          {data.bedrooms ?? 0}
        </div>
        <div>
          <span className="text-gray-500">Bathrooms:</span>{" "}
          {data.bathrooms ?? 0}
        </div>
        <div>
          <span className="text-gray-500">Area:</span> {data.area ?? "—"}
        </div>
        <div>
          <span className="text-gray-500">Location:</span>{" "}
          {data.location ?? "—"}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold">Contact</h2>
        <div className="mt-1 text-gray-700">
          {data.contact_name ?? "ImaraLink Agent"} •{" "}
          {data.contact_phone ?? "—"}
        </div>
      </div>
    </main>
  );
}
