import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

// Compat export for files importing { createSupabaseBrowser }
export const createSupabaseBrowser = supabaseBrowser;

export default supabaseBrowser;
