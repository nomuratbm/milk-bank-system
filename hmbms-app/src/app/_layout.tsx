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
  const { session, role, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Wait until the authentication state is finished checking
    if (loading) return;

    // Determine if the user is currently inside an authentication route group
    const inAuthGroup = segments[0] === "(auth)";

    if (session) {
      // 1. User is logged in. If they are still stuck on the login/auth screens, move them out!
      if (inAuthGroup || segments.length === 0) {
        if (role === "beneficiary") {
          // Route immediately to the beneficiary application home
          router.replace("/(beneficiary)/home"); 
        } else if (role === "staff" || role === "admin") {
          // Route immediately to the staff layout dashboard
          router.replace("/(staff)/home"); 
        }
      }
    } else {
      // 2. User is logged out. Kick them back to the landing or login screen automatically.
      if (!inAuthGroup) {
        router.replace("/landing");
      }
    }
  }, [session, role, loading, segments]);

  // Render a clean loading state while checking database cookies to avoid UI layout flashes
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

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