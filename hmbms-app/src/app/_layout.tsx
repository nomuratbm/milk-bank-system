// src/app/_layout.tsx
import "../../global.css";
import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";

function RootLayoutNav() {
  const { session, role, programId, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Don't do anything while auth is still loading
    if (loading) return;
    // Don't redirect if role hasn't resolved from DB yet
    if (session && role === null) return;

    // Determine if the user is currently inside an authentication route group
    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "(onboarding)";
    const inStaff = segments[0] === "(staff)";
    const inBeneficiary = segments[0] === "(beneficiary)";

    if (!session) {
      // Not logged in — send to auth screens if not already there
      if (!inAuthGroup) {
        router.replace("/landing");
      }
      return;
    }

    // Logged in as staff
    if (role === "staff") {
      if (!inStaff) {
        router.replace("/(staff)/home");
      }
      return;
    }

    // Logged in as beneficiary
    if (role === "beneficiary") {
      if (programId === null && !inOnboarding) {
        router.replace("/(onboarding)/selectProgram");
        return;
      }
      if (programId !== null && !inBeneficiary) {
        router.replace("/(beneficiary)/home");
        return;
      }
    }
  }, [session, role, programId, loading, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <StatusBar style="auto" />
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}