import ListingForm from "@/components/ListingForm";

export const revalidate = 0;

export default function Page() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">List your property</h1>
        <p className="text-white/80">Create a listing for short stay, monthly rent, or sale.</p>
      </div>
      <div className="card max-w-3xl">
        <ListingForm />
      </div>
    </>
  );
}
