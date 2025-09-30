// app/robots.txt/route.ts
export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://imaralink.onrender.com/sitemap.xml\n`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
