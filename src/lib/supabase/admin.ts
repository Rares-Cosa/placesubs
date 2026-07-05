import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client — uses the SECRET key, which bypasses RLS and can
 * read auth.users. This is a privileged, trusted client.
 *
 * NEVER import this into a client component. The `server-only` import above
 * makes the build FAIL if this file is ever pulled into client-side code —
 * that's the guardrail protecting the secret key from ever reaching a browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error("Missing Supabase admin environment variables");
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}