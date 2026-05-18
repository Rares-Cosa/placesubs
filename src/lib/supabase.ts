import { createClient } from "@supabase/supabase-js";

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Fail fast if env vars are missing
// This gives us a clear error message instead of cryptic "undefined" errors later
if (!supabaseUrl) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabasePublishableKey) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

// Create and export a single Supabase client instance
// This will be imported and reused across the app
export const supabase = createClient(supabaseUrl, supabasePublishableKey);