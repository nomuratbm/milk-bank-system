import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { UserRole, ProgramId, Profile, Beneficiary } from "../types/database.types";

interface AuthContextValue {
  session: Session | null;
  role: UserRole | null;
  programId: ProgramId | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [programId, setProgramId] = useState<ProgramId | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserData(userId: string) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("account_type")
      .eq("id", userId)
      .single() as { data: Pick<Profile, "account_type"> | null; error: Error | null };

    if (profileError || !profile) {
      console.warn("Failed to load profile:", profileError?.message);
      setRole(null);
      setProgramId(null);
      return;
    }

    setRole(profile.account_type);

    if (profile.account_type === "beneficiary") {
      const { data: beneficiary } = await supabase
        .from("beneficiaries")
        .select("program_id")
        .eq("id", userId)
        .single() as { data: Pick<Beneficiary, "program_id"> | null; error: Error | null };

      setProgramId((beneficiary?.program_id as ProgramId) ?? null);
    } else {
      setProgramId(null);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        await loadUserData(session.user.id);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          await loadUserData(newSession.user.id);
        } else {
          setRole(null);
          setProgramId(null);
        }
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext value={{ session, role, programId, loading, signOut }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}