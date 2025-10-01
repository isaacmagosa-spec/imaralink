import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://imaralink-app.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/login", "/register"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
