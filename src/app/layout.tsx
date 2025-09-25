import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ImaraLink — Stays, Rentals, and Homes to Buy",
  description: "Find short stays like Airbnb, monthly rentals, and homes to purchase across Kenya.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
