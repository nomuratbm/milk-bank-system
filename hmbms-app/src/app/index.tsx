// src/app/index.tsx
import { ActivityIndicator, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
  const { session, role, programId, loading } = useAuth();
  const [checkingFirstOpen, setCheckingFirstOpen] = useState(true);
  const [isFirstOpen, setIsFirstOpen] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("hasLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstOpen(true);
      }
      setCheckingFirstOpen(false);
    });
  }, []);

  if (loading || checkingFirstOpen) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#27978b" />
        <Text className="mt-3 text-ink-400">Loading...</Text>
      </View>
    );
  }

  // Very first time ever — show welcome
  if (isFirstOpen && !session) {
    return <Redirect href="/welcome" />;
  }

  // No session — go to landing
  if (!session) {
    return <Redirect href="/landing" />;
  }

  // Staff — staff home
  if (role === "staff") {
    return <Redirect href="/(staff)/home" />;
  }

  // Beneficiary without program — onboarding
  if (role === "beneficiary" && programId === null) {
    // UPDATED: Kept this cleanly matching your folder mapping structure
    return <Redirect href="/(onboarding)/selectProgram" />;
  }

  // Beneficiary with program — beneficiary home
  if (role === "beneficiary" && programId !== null) {
    return <Redirect href="/(beneficiary)/home" />;
  }

  // No profile row — incomplete account
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-center text-ink-600">
        Your account isn't fully set up yet. Please contact a milk bank administrator.
      </Text>
    </View>
  );
}