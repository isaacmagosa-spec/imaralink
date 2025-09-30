export const metadata = { title: System Status };

export default function StatusPage() {
  return (
    <main className=p-10>
      <h1 className=text-4xl font-extrabold tracking-tight>System Status</h1>
      <p className=mt-3 text-slate-300>All systems operational. If you see issues, contact support.</p>
      <a href=/ className=mt-6 inline-block rounded-lg px-4 py-2 bg-indigo-600 hover:bg-indigo-500>Home</a>
    </main>
  );
}
