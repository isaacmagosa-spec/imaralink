import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Export a placeholder if envs are missing to satisfy types during build.
export const supabase =
  url && anon
    ? createClient(url, anon, { auth: { persistSession: false } })
    : (null as any);
