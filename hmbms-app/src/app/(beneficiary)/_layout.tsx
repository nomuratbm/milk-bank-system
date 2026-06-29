// src/app/(beneficiary)/_layout.tsx
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function BeneficiaryLayout() {
  const { session, role, programId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Safety fallback: Redirect out if session drops or they haven't chosen a program
    if (!session) {
      router.replace("/landing");
    } else if (role === "beneficiary" && programId === null) {
      router.replace("/(onboarding)/selectProgram");
    }
  }, [session, role, programId, loading]);

  if (loading || !session || (role === "beneficiary" && programId === null)) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#27978b" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}