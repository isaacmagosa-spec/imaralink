export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ listing: data });
}
