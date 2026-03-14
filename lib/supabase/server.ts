import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client with service role key.
 * Use in Server Actions / API routes; never expose this key to the client.
 * Returns null if env vars are missing (app can run without Supabase).
 */
export function getSupabaseServer(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}
