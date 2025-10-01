// src/app/api/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(req.url);

    const q = (searchParams.get("q") || "").trim();
    const t = searchParams.get("type") || "";
    const idsParam = searchParams.get("ids") || "";

    let query = supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (q) query = query.ilike("title", `%${q}%`);
    if (t === "rent" || t === "sale") query = query.eq("type", t);

    const ids = idsParam
      ? idsParam.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    if (ids.length) query = query.in("id", ids);

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { listings: data ?? [] },
      { headers: { "content-type": "application/json; charset=utf-8" } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}

// Keep creation at /api/listings/new
