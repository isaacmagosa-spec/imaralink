import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q") ?? "";
    const city = searchParams.get("city") ?? "";
    const type = searchParams.get("type") ?? "";
    const minPrice = Number(searchParams.get("minPrice") ?? "") || undefined;
    const maxPrice = Number(searchParams.get("maxPrice") ?? "") || undefined;
    const bedrooms = Number(searchParams.get("bedrooms") ?? "") || undefined;
    const bathrooms = Number(searchParams.get("bathrooms") ?? "") || undefined;

    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "12")));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("listings")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (q) {
      query = query.ilike("title", `%${q}%`);
    }
    if (city) {
      query = query.ilike("city", `%${city}%`);
    }
    if (type) {
      query = query.eq("type", type);
    }
    if (typeof minPrice === "number") {
      query = query.gte("price", minPrice);
    }
    if (typeof maxPrice === "number") {
      query = query.lte("price", maxPrice);
    }
    if (typeof bedrooms === "number") {
      query = query.gte("bedrooms", bedrooms);
    }
    if (typeof bathrooms === "number") {
      query = query.gte("bathrooms", bathrooms);
    }

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      listings: (data ?? []) as Listing[],
      page,
      limit,
      total: count ?? 0,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
