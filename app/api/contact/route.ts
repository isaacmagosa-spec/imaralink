// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  // For now: log to server logs (Render dashboard → Logs)
  console.log("[CONTACT]", { name, email, message, ts: Date.now() });

  // TODO: integrate email (e.g. Resend, SendGrid) or Supabase insert
  return NextResponse.json({ ok: true });
}
