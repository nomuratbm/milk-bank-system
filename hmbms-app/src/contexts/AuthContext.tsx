import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
// 1. Import the Tables helper from your newly generated database types
import type { Tables } from "../types/database.types";
import { authService } from "../services/auth/authService";
import * as Linking from "expo-linking";

// 2. Derive the missing types cleanly from the generated database schema
export type Profile = Tables<"profiles">;
export type Beneficiary = Tables<"beneficiaries">;
export type UserRole = Profile["account_type"];  // dynamically infers string from profiles
export type ProgramId = Beneficiary["program_id"]; // dynamically infers number from beneficiaries

interface AuthContextValue {
  session: Session | null;
  user: Session["user"] | null;
  role: UserRole | null;
  programId: ProgramId | null; // null = beneficiary hasn't picked a program yet
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Session["user"] | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [programId, setProgramId] = useState<ProgramId | null>(null);
  const [loading, setLoading] = useState(true);

  function clearUserState() {
    setUser(null);
    setRole(null);
    setProgramId(null);
  }

  function setCurrentSession(session: Session | null) {
    setSession(session);
    setUser(session?.user ?? null);
  }

  async function loadUserData(userId: string) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("id", userId)
      .maybeSingle() as { data: Pick<Profile, "account_type"> | null; error: Error | null };

    if (profileError || !profile) {
      console.error("Failed to load profile:", profileError?.message);
      clearUserState();
      return;
    }

    setRole(profile.account_type);

    if (profile.account_type === "beneficiary") {
      const { data: beneficiary } = await supabase
        .from("beneficiaries")
        .select("program_id")
        .eq("id", userId)
        .maybeSingle() as { data: Pick<Beneficiary, "program_id"> | null; error: Error | null };

      setProgramId((beneficiary?.program_id as ProgramId) ?? null);
    } else {
      setProgramId(null);
    }
  }

  const createSessionFromUrl = async (url: string) => {
    const parsed = Linking.parse(url);
    const { access_token, refresh_token } = parsed.queryParams || {};

    if (access_token && refresh_token) {
      setLoading(true);
      const { error } = await supabase.auth.setSession({
        access_token: access_token as string,
        refresh_token: refresh_token as string,
      });

      if (error) {
        console.error("Error setting session from deep link:", error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) createSessionFromUrl(url);
    });

    const subscription = Linking.addEventListener("url", (event) => {
      if (event.url) createSessionFromUrl(event.url);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setCurrentSession(session);
      if (session?.user) {
        await loadUserData(session.user.id);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setCurrentSession(newSession);
        if (newSession?.user) {
          await loadUserData(newSession.user.id);
        } else {
          clearUserState();
        }
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
      subscription.remove();
    }
  }, []);

  async function signOut() {
    clearUserState();
    setCurrentSession(null);
    await authService.signOut();
  }

  async function refreshProfile() {
    if (!user) return;
    await loadUserData(user.id);
  }

  return (
    <AuthContext.Provider value={{ session, user, role, programId, loading, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}