import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Imaralink",
  description: "Short stays, monthly rentals, and homes for sale.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen antialiased">
        <Header />
        <main className="min-h-[60vh] py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
