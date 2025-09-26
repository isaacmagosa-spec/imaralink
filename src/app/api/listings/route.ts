export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    const token = authHeader?.toLowerCase().startsWith("bearer ") ? authHeader.slice(7).trim() : null;

    const body = await req.json().catch(() => ({}));

    const title = String(body.title ?? "").trim();
    const type = body.type === "rent" || body.type === "sale" ? body.type : undefined;
    const price = Number.isFinite(Number(body.price)) ? Number(body.price) : NaN;
    const currency = String(body.currency ?? "").trim().toUpperCase();
    if (!title || !type || !Number.isFinite(price) || price <= 0 || !currency) {
      return json({ error: "Invalid payload: { title, type, price>0, currency }" }, 400);
    }

    const bedrooms = body.bedrooms === null || body.bedrooms === undefined ? null : Math.max(0, Number(body.bedrooms));
    const bathrooms = body.bathrooms === null || body.bathrooms === undefined ? null : Math.max(0, Number(body.bathrooms));
    const city = body.city ? String(body.city).trim() : null;
    const area = body.area ? String(body.area).trim() : null;
    const description = body.description ? String(body.description).trim() : null;

    let images: string[] | null = null;
    if (Array.isArray(body.images)) {
      images = body.images.map((u: any) => String(u).trim()).filter(Boolean).slice(0, 10);
      if (images.length === 0) images = null;
    }

    let owner_id: string | null = null;
    if (token) {
      const anon = getSupabaseClient();
      const { data: u } = await anon.auth.getUser(token);
      owner_id = u?.user?.id ?? null;
    }

    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("listings")
      .insert([{ title, type, price, currency, bedrooms, bathrooms, city, area, description, images, status: "active", owner_id }])
      .select("*")
      .single();

    if (error) return json({ error: error.message }, 400);
    return json({ listing: data }, 201);
  } catch (e: any) {
    return json({ error: e?.message ?? "Unexpected error" }, 500);
  }
}
