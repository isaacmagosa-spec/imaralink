export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

type InquiryPayload = {
  listing_id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  message: string;
};

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function bad(status: number, message: string) {
  return NextResponse.json({ error: message }, { status, headers: JSON_HEADERS });
}

function isUUIDish(v: unknown) {
  return typeof v === "string" && /^[0-9a-fA-F-]{36}$/.test(v);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...JSON_HEADERS,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,x-admin-secret",
    },
  });
}

export async function POST(req: NextRequest) {
  let body: Partial<InquiryPayload>;
  try {
    body = (await req.json()) as Partial<InquiryPayload>;
  } catch {
    return bad(400, "Invalid JSON body");
  }

  const listing_id = body.listing_id;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : null;
  const phone = typeof body.phone === "string" ? body.phone.trim() : null;
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!isUUIDish(listing_id)) return bad(400, "listing_id must be a valid UUID");
  if (!name) return bad(400, "name is required");
  if (!message) return bad(400, "message is required");
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return bad(400, "email is not valid");

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("inquiries")
    .insert({ listing_id, name, email, phone, message })
    .select()
    .single();

  if (error) return bad(400, error.message);

  return NextResponse.json({ inquiry: data }, { status: 201, headers: JSON_HEADERS });
}

export async function GET(req: NextRequest) {
  const guard = process.env.ADMIN_GET_SECRET;
  if (guard) {
    const header = req.headers.get("x-admin-secret");
    if (header !== guard) return bad(401, "Unauthorized");
  }

  const { searchParams } = new URL(req.url);
  const listing_id = searchParams.get("listing_id");

  const supabase = getSupabaseClient();
  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (listing_id && isUUIDish(listing_id)) {
    query = query.eq("listing_id", listing_id);
  }

  const { data, error } = await query;
  if (error) return bad(500, error.message);

  return NextResponse.json({ inquiries: data ?? [] }, { headers: JSON_HEADERS });
}
