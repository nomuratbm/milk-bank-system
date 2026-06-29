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
  avatar_url: string | null;
}

export interface Donor {
  id: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  contact_num: string | null;
  prescreening_notes: string | null;
  consent_doc_url: string | null;
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
      donors: {
        Row: Donor;
        Insert: Partial<Donor> & { id: string };
        Update: Partial<Donor>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}