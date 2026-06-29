import { supabase } from "../../lib/supabase";

interface SignupData {
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  accountType: "beneficiary" | "staff";
}

export const authService = {
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signUp(data: SignupData) {
    return supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          mobile_number: data.mobileNumber,
          account_type: data.accountType,
        },
      },
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },

  async updatePassword(password: string) {
    return supabase.auth.updateUser({
      password,
    });
  },

  async getCurrentSession() {
    return supabase.auth.getSession();
  },

  async getCurrentUser() {
    return await supabase.auth.getUser();
  },
};