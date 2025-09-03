import "./globals.css";
import Navbar from "../components/Navbar"; // use the relative path

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-800 bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}