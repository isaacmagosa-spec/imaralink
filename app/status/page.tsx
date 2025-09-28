export const metadata = { title: "Status | ImaraLink" };

export default function StatusPage() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="max-w-xl w-full rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">System Status</h1>
        <p className="text-sm text-gray-600">
          All systems operational. If you see issues, contact support.
        </p>
      </div>
    </main>
  );
}
