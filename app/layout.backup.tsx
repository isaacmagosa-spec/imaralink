// app/layout.tsx
export const metadata = {
  title: "ImaraLink",
  description: "Property & Asset Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site">
          {children}
        </div>
        <style jsx global>{`
          :root {
            --bg: #0c0f14;
            --panel: #121621;
            --text: #e8ecf2;
            --muted: #9aa7b2;
            --brand: #5b9cff;
            --brand-2: #7bdcb5;
            --ring: rgba(91,156,255,0.35);
            --radius: 18px;
          }
          * { box-sizing: border-box; }
          html, body, .site { height: 100%; }
          body {
            margin: 0;
            background: radial-gradient(1200px 800px at 80% -10%, #182139 0%, transparent 60%),
                        radial-gradient(800px 600px at 10% 10%, #14202c 0%, transparent 55%),
                        var(--bg);
            color: var(--text);
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
            line-height: 1.6;
          }
          a { color: var(--text); text-decoration: none; }
          .container { width: min(1100px, 92vw); margin: 0 auto; }
          .nav {
            position: sticky; top: 0; z-index: 20;
            backdrop-filter: blur(10px);
            background: color-mix(in oklab, var(--bg) 70%, transparent);
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .nav-wrap { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; }
          .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: .3px; }
          .dot { width: 10px; height: 10px; border-radius: 999px; background: linear-gradient(135deg, var(--brand), var(--brand-2)); box-shadow: 0 0 18px var(--ring); }
          .btn {
            display: inline-flex; align-items: center; gap: 8px;
            background: linear-gradient(135deg, var(--brand), #6da8ff);
            color: #0a0f18; font-weight: 600; padding: 10px 16px; border-radius: 12px; border: none; cursor: pointer;
            transition: transform .08s ease, box-shadow .2s ease;
            box-shadow: 0 8px 20px rgba(91,156,255,.2);
          }
          .btn:hover { transform: translateY(-1px); box-shadow: 0 12px 26px rgba(91,156,255,.28); }
          .ghost {
            background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,0.12);
          }
          .hero {
            padding: 72px 0 40px;
          }
          .hero-card {
            background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
            border: 1px solid rgba(255,255,255,.08);
            border-radius: var(--radius);
            padding: clamp(22px, 5vw, 36px);
            box-shadow: 0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06);
          }
          .title {
            font-size: clamp(30px, 5.4vw, 44px);
            line-height: 1.1;
            letter-spacing: -.3px;
            margin: 0 0 12px 0;
          }
          .lead { color: var(--muted); font-size: clamp(14px, 2.8vw, 18px); margin-bottom: 20px; }
          .row { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0,1fr)); }
          @media (max-width: 820px) { .row { grid-template-columns: 1fr; } }

          .pill {
            display: inline-flex; align-items:center; gap: 8px;
            padding: 8px 12px; border-radius: 999px; font-size: 12px; color: var(--muted);
            background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
          }
          .grid {
            margin-top: 26px;
            display: grid; gap: 14px; grid-template-columns: repeat(3, minmax(0,1fr));
          }
          @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }
          .card {
            background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015));
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 16px; padding: 18px;
            transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease;
          }
          .card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.18); box-shadow: 0 20px 40px rgba(0,0,0,.25); }
          .muted { color: var(--muted); }
          .footer { border-top: 1px solid rgba(255,255,255,.08); margin-top: 50px; }
          .footer-wrap { display:flex; align-items:center; justify-content:space-between; padding: 18px 0; color: var(--muted); font-size: 14px; }
          input, textarea {
            width: 100%; background: #0f141f; color: var(--text);
            border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 10px 12px; outline: none;
          }
          input:focus, textarea:focus { border-color: var(--brand); box-shadow: 0 0 0 4px var(--ring); }
          label { font-size: 13px; color: var(--muted); margin-bottom: 6px; display:block; }
          form { display: grid; gap: 12px; }
        `}</style>
      </body>
    </html>
  );
}
