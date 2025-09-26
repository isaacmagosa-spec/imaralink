import type { MetadataRoute } from "next";
import { getSupabaseClient } from "@/lib/supabaseClient";

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://imaralink-app.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date() },
    { url: `${BASE}/browse`, lastModified: new Date() },
    { url: `${BASE}/list`, lastModified: new Date() },
  ];

  try {
    const supabase = getSupabaseClient();
    const { data } = await supabase.from("listings").select("id, created_at").limit(2000);
    (data ?? []).forEach((row: any) => {
      urls.push({
        url: `${BASE}/listing/${row.id}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
      });
    });
  } catch {}
  return urls;
}
