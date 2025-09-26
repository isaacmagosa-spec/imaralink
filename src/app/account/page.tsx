export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">My Account</h1>
      <p className="mt-2 text-slate-600">
        Sign-in and account settings coming soon.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <ul className="list-disc pl-5 text-sm text-slate-700">
          <li>View your saved properties</li>
          <li>Manage your listings</li>
          <li>Update your profile details</li>
        </ul>
      </div>
    </main>
  );
}
