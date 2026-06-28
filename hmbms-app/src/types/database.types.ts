export type UserRole = "staff" | "beneficiary";
export type ProgramId = 1 | 2 | 3;

export interface Profile {
  id: string;
  account_type: UserRole;
  created_at: string;
}

export interface Beneficiary {
  id: string;
  program_id: ProgramId | null;
  first_name: string;
  last_name: string;
  email: string | null;
  contact_num: string | null;
  registered_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; account_type: UserRole };
        Update: Partial<Profile>;
        Relationships: [];
      };
      beneficiaries: {
        Row: Beneficiary;
        Insert: Partial<Beneficiary> & { id: string };
        Update: Partial<Beneficiary>;
        Relationships: [];
      };
      milk_requests: {
        Row: {
          request_id: string;
          user_id: string;
          pg1_first_name: string;
          pg1_last_name: string;
          pg1_relationship: string;
          pg1_contact_num: string;
          pg1_email: string;
          pg2_first_name: string | null;
          pg2_last_name: string | null;
          pg2_relationship: string | null;
          pg2_contact_num: string | null;
          pg2_email: string | null;
          address_street: string;
          address_street2: string | null;
          address_city: string;
          address_zip: string;
          infant_name: string;
          infant_age: string;
          infant_weight: string;
          additional_info: string | null;
          queue_position: number | null;
          estimated_wait_days: number | null;
          milk_volume: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          request_id?: string;
          user_id: string;
          pg1_first_name: string;
          pg1_last_name: string;
          pg1_relationship: string;
          pg1_contact_num: string;
          pg1_email: string;
          pg2_first_name?: string | null;
          pg2_last_name?: string | null;
          pg2_relationship?: string | null;
          pg2_contact_num?: string | null;
          pg2_email?: string | null;
          address_street: string;
          address_street2?: string | null;
          address_city: string;
          address_zip: string;
          infant_name: string;
          infant_age: string;
          infant_weight: string;
          additional_info?: string | null;
          queue_position?: number | null;
          estimated_wait_days?: number | null;
          milk_volume?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          request_id?: string;
          user_id?: string;
          pg1_first_name?: string;
          pg1_last_name?: string;
          pg1_relationship?: string;
          pg1_contact_num?: string;
          pg1_email?: string;
          pg2_first_name?: string | null;
          pg2_last_name?: string | null;
          pg2_relationship?: string | null;
          pg2_contact_num?: string | null;
          pg2_email?: string | null;
          address_street?: string;
          address_street2?: string | null;
          address_city?: string;
          address_zip?: string;
          infant_name?: string;
          infant_age?: string;
          infant_weight?: string;
          additional_info?: string | null;
          queue_position?: number | null;
          estimated_wait_days?: number | null;
          milk_volume?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "milk_requests_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}