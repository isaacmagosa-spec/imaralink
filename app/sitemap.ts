import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://imaralink.onrender.com/", changeFrequency: "weekly", priority: 1 },
    { url: "https://imaralink.onrender.com/status", changeFrequency: "monthly", priority: 0.3 }
  ];
}
