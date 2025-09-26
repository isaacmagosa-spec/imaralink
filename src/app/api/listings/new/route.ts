// src/app/api/listings/new/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

function bad(msg: string, code = 400) {
  return new Response(JSON.stringify({ error: msg }), {
    status: code,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return bad("Use multipart/form-data");
  }

  const form = await req.formData();

  const title = String(form.get("title") || "").trim();
  const type = String(form.get("type") || "").trim(); // "rent" | "sale"
  const price = Number(form.get("price") || 0);
  const currency = String(form.get("currency") || "KES").trim().toUpperCase();
  const bedrooms = form.get("bedrooms") ? Number(form.get("bedrooms")) : null;
  const bathrooms = form.get("bathrooms") ? Number(form.get("bathrooms")) : null;
  const city = String(form.get("city") || "").trim() || null;
  const area = String(form.get("area") || "").trim() || null;
  const description = String(form.get("description") || "").trim() || null;

  if (!title || (type !== "rent" && type !== "sale") || !Number.isFinite(price) || price <= 0) {
    return bad("Invalid fields: title, type(rent|sale), price(>0) are required");
  }
  if (!currency || currency.length < 3) {
    return bad("Invalid currency");
  }

  const files = form.getAll("images").filter(Boolean) as File[];
  if (files.length > 8) return bad("Max 8 images");

  const supabase = getSupabaseAdmin();
  const bucket = "listing-images";
  const imageUrls: string[] = [];

  for (const f of files) {
    if (!(f instanceof File)) continue;
    if (f.size > 8 * 1024 * 1024) return bad("Each image must be <= 8MB");

    const safeName = (f.name || "image").replace(/[^\w.\-]+/g, "_");
    const key = `tmp/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;

    const ab = await f.arrayBuffer();
    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(key, ab, { contentType: f.type || "image/jpeg", upsert: false });

    if (upErr) return bad(`Upload failed: ${upErr.message}`, 500);

    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(key);
    imageUrls.push(pub.publicUrl);
  }

  const { data, error } = await supabase
    .from("listings")
    .insert([
      {
        title,
        type,
        price,
        currency,
        bedrooms,
        bathrooms,
        city,
        area,
        description,
        images: imageUrls,
        status: "active",
      },
    ])
    .select("*")
    .single();

  if (error) return bad(`DB insert failed: ${error.message}`, 500);

  return new Response(JSON.stringify({ listing: data }), {
    status: 201,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
