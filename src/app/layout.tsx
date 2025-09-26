import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://imaralink-app.vercel.app"),
  title: {
    default: "Imaralink · Rentals, Short Stays & Homes",
    template: "%s · Imaralink",
  },
  description:
    "Find short stays like Airbnb, monthly rentals, and homes for sale across Kenya. Simple search, fast contact.",
  openGraph: {
    title: "Imaralink · Rentals, Short Stays & Homes",
    description:
      "Find short stays like Airbnb, monthly rentals, and homes for sale across Kenya.",
    url: "/",
    siteName: "Imaralink",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imaralink · Rentals, Short Stays & Homes",
    description:
      "Find short stays like Airbnb, monthly rentals, and homes for sale across Kenya.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gradient-to-b from-[#0b1f3a] via-[#0b1f3a] to-[#0e2550] text-slate-900 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
