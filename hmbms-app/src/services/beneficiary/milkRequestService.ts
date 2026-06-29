import { supabase } from "../../lib/supabase";

export async function createMilkRequest(request: Record<string, unknown>) {
  return supabase
    .from("milk_requests")
    .insert([request]);
}