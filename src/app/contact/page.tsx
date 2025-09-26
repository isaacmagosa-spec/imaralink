export const metadata = { title: "Contact • Imaralink" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Contact</h1>
      <p className="mt-3 text-slate-600">
        Questions or feedback? Email us at <a className="text-slate-900 underline" href="mailto:support@imaralink.example">support@imaralink.example</a>.
      </p>
    </main>
  );
}
