export const revalidate = 0;

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-black text-slate-900">Help</h1>
      <div className="mt-4 space-y-4 text-slate-700">
        <p><strong>Can’t find a place?</strong> Use filters on Browse: type, price, and area.</p>
        <p><strong>How do I contact an owner?</strong> Open a listing and tap “Contact agent”.</p>
        <p><strong>Account issues?</strong> Try “Login” and request a magic link again.</p>
      </div>
    </main>
  );
}
