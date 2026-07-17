import { createClient } from "@/lib/supabase/server";

/**
 * Returns whether the currently authenticated user has Pro.
 * Returns false if not logged in or no profile.
 */
export async function getIsPro(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro")
    .eq("id", user.id)
    .single();

  return profile?.is_pro ?? false;
}