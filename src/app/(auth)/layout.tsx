export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
}
