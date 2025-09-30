// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ImaraLink',
  description: 'ImaraLink website',
  // Keep your Google Search Console token here if you want the meta-tag method as backup:
  other: { 'google-site-verification': 'a62d7c3377f80816' }, // <-- replace with your exact token if needed
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
