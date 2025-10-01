import type { MetadataRoute } from "next";

export const revalidate = 86400; // re-generate sitemap daily

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    {
      url: "https://imaralink.onrender.com/",
      changeFrequency: "weekly",
      priority: 1,
      lastModified: now,
    },
    {
      url: "https://imaralink.onrender.com/status",
      changeFrequency: "monthly",
      priority: 0.3,
      lastModified: now,
    },
  ];
}
