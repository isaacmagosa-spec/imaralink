import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // if this errors, tell me and we'll recreate it

export const metadata: Metadata = {
  title: "ImaraLink — Rentals & Sales",
  description: "Discover rentals & properties for sale across Kenya—from economy to ultra luxury.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-gray-800 bg-gray-50" suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
