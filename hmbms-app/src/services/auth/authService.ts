import { supabase } from "../../lib/supabase";

interface SignupData {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  accountType: "beneficiary" | "staff";
  options?: {
    emailRedirectTo?: string;
  };
}

export const authService = {
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUp({ fullName, email, mobileNumber, password, accountType, options }: SignupData) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options?.emailRedirectTo,
        data: {
          full_name: fullName,
          mobile_number: mobileNumber,
          account_type: accountType,
        }
      }
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },

  async updatePassword(password: string) {
    return supabase.auth.updateUser({ password });
  },

  async getCurrentSession() {
    return supabase.auth.getSession();
  },

  async getCurrentUser() {
    return supabase.auth.getUser();
  },
};