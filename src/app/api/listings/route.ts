import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type Listing = {
  id?: string;
  created_at?: string;
  title: string;
  type: "rent" | "sale";
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  city?: string | null;
  area?: string | null;
  location?: unknown | null;
  description?: string | null;
  amenities?: string[] | null;
  images?: string[] | null;
  status?: "active" | "inactive";
  contact_name?: string | null;
  contact_phone?: string | null;
};

export async function GET() {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ listings: (data ?? []) as Listing[] });
}

export async function POST(req: NextRequest) {
  // Guard (optional): only allow if header matches env secret
  const guardSecret = process.env.ADMIN_POST_SECRET;
  if (guardSecret) {
    const header = req.headers.get("x-admin-secret");
    if (header !== guardSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const payload = (await req.json()) as Listing;

  // Server-side insert via service role
  const { data, error } = await supabaseAdmin
    .from("listings")
    .insert(payload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ listing: data as Listing }, { status: 201 });
}
