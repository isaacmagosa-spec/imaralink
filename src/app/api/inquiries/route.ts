import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient"; // or getSupabaseAdmin if you chose service role

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const listing_id = String(body?.listing_id || "").trim();
    const name = String(body?.name || "").trim();
    const email = body?.email ? String(body.email).trim() : null;
    const phone = body?.phone ? String(body.phone).trim() : null;
    const message = body?.message ? String(body.message).trim() : null;

    if (!listing_id || !name) {
      return NextResponse.json(
        { error: "listing_id and name are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("inquiries")
      .insert({ listing_id, name, email, phone, message })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
