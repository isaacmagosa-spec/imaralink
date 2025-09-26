import ListingForm from "@/components/ListingForm";

export const metadata = {
  title: "List your property • Imaralink",
};

export default function ListNewPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        List your property
      </h1>
      <p className="mt-2 text-slate-600">
        Add details, photos, and pricing. You can edit later.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-6 backdrop-blur">
        <ListingForm />
      </div>
    </main>
  );
}
