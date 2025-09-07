import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ listings: data ?? [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const required = ["title", "type", "price"] as const;
  for (const k of required) {
    // @ts-ignore
    if (!body[k]) return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });
  }

  const payload = {
    title: String(body.title),
    type: body.type === "sale" ? "sale" : "rent",
    price: Number(body.price),
    currency: body.currency || "KES",
    bedrooms: Number(body.bedrooms || 0),
    bathrooms: Number(body.bathrooms || 0),
    city: body.city || null,
    area: body.area || null,
    location: body.location || null,
    description: body.description || null,
    amenities: Array.isArray(body.amenities) ? body.amenities : [],
    images: Array.isArray(body.images) ? body.images : [],
    contact_name: body.contact_name || null,
    contact_phone: body.contact_phone || null,
  };

  const { data, error } = await supabaseAdmin
    .from("listings")
    .insert(payload)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, listing: data }, { status: 201 });
}
