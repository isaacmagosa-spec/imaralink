import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

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

function toInt(v: string | null, def: number) {
  const n = v ? parseInt(v, 10) : NaN;
  return Number.isFinite(n) ? n : def;
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    const type = url.searchParams.get("type"); // "rent" | "sale"
    const city = url.searchParams.get("city");
    const area = url.searchParams.get("area");
    const minPrice = toInt(url.searchParams.get("minPrice"), NaN);
    const maxPrice = toInt(url.searchParams.get("maxPrice"), NaN);
    const bedrooms = toInt(url.searchParams.get("bedrooms"), NaN);

    const limit = clamp(toInt(url.searchParams.get("limit"), 12), 1, 50);
    const page = Math.max(1, toInt(url.searchParams.get("page"), 1));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const supabase = getSupabaseClient();

    // start query
    let query = supabase
      .from("listings")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (q && q.trim()) {
      // match in title or description (case-insensitive)
      query = query.or(
        `title.ilike.%${q}%,description.ilike.%${q}%`
      );
    }
    if (type === "rent" || type === "sale") query = query.eq("type", type);
    if (city && city.trim()) query = query.ilike("city", `%${city}%`);
    if (area && area.trim()) query = query.ilike("area", `%${area}%`);
    if (Number.isFinite(minPrice)) query = query.gte("price", minPrice);
    if (Number.isFinite(maxPrice)) query = query.lte("price", maxPrice);
    if (Number.isFinite(bedrooms)) query = query.gte("bedrooms", bedrooms);

    // pagination window
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

export async function POST(req: NextRequest) {
  // Optional guard with secret
  const guardSecret = process.env.ADMIN_POST_SECRET;
  if (guardSecret) {
    const header = req.headers.get("x-admin-secret");
    if (header !== guardSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const payload = (await req.json()) as Listing;
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("listings")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ listing: data as Listing }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
