export const metadata = { title: "System Status" };

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold">System Status</h1>
      <p className="mt-4 text-slate-300">
        All systems operational. If you see issues, contact support.
      </p>
    </main>
  );
}
