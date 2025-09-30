import ./globals.css;
import type { Metadata } from next;
import type { ReactNode } from react;

export const metadata: Metadata = {
  title: ImaraLink,
  description: ImaraLink — listings,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang=en>
      <body className=min-h-screen bg-blue-950 text-white antialiased>
        <div className=mx-auto max-w-6xl px-4 py-8>{children}</div>
      </body>
    </html>
  );
}
