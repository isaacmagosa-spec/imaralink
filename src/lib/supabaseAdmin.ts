import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; // using same URL
  const service = process.env.SUPABASE_SERVICE_ROLE;
  if (!url || !service) {
    throw new Error("Supabase admin env vars missing (URL or SERVICE ROLE).");
  }
  return createClient(url, service, { auth: { persistSession: false } });
}
