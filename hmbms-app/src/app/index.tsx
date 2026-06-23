import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { session, role, programId, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#27978b" />
        <Text className="mt-3 text-ink-400">Loading...</Text>
      </View>
    );
  }

  // No session — send to landing page to pick a role
  if (!session) {
    return <Redirect href="/landing" />;
  }

  // Signed in as staff — go straight to staff home
  if (role === "staff") {
    return <Redirect href="/(staff)/home" />;
  }

  // Signed in as beneficiary but hasn't picked a program yet
  if (role === "beneficiary" && programId === null) {
    return <Redirect href="/(onboarding)/select-program" />;
  }

  // Signed in as beneficiary with a program — go to beneficiary home
  if (role === "beneficiary" && programId !== null) {
    return <Redirect href="/(beneficiary)/home" />;
  }

  // Signed in but no profile row found — account setup incomplete
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-center text-ink-600">
        Your account isn't fully set up yet. Please contact a milk bank
        administrator.
      </Text>
    </View>
  );
}