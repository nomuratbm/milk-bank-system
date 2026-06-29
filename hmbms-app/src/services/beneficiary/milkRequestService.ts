import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database.types";

// Option A: If "milk_requests" is a public table in your database but wasn't generated yet:
type MilkRequestInsert = Database["public"]["Tables"] extends { milk_requests: { Insert: infer I } }
  ? I
  : {
      id?: string;
      beneficiary_id: string;
      volume_requested_ml: number;
      status?: string;
      created_at?: string;
      [key: string]: any; // Fallback to avoid strict 'never[]' issues
    };

export async function createMilkRequest(request: MilkRequestInsert) {
  return supabase
    .from("milk_requests" as any) // Casted safely to bypass generation gaps
    .insert([request]);
}