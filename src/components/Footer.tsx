export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} ImaraLink</p>
        <p className="text-gray-500">Made with Next.js + Supabase</p>
      </div>
    </footer>
  );
}
