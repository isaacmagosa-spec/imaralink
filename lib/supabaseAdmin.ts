import { createClient } from "@supabase/supabase-js";

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Export a placeholder if envs are missing to satisfy types during build.
export const supabaseAdmin =
  url && serviceRole
    ? createClient(url, serviceRole, { auth: { persistSession: false } })
    : (null as any);
