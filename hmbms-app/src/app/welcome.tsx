// src/app/welcome.tsx
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import TopBrandingSection from "../components/TopBrandingSection";

const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TopBrandingSection />

      <View className="flex-1 bg-navy px-10 justify-end pb-16">
        <View className="mb-12 items-center">
          <Text className="text-white text-2xl font-bold text-center mb-5 tracking-wide">
            Welcome to Makati Milk Bank
          </Text>
          <Text className="text-ink-400 text-base text-center leading-6 font-semibold w-[90%]">
            {"Connecting donors, staff, and beneficiaries\nacross Makati's milk bank programs"}
          </Text>
        </View>

        <TouchableOpacity
          className="w-full h-[52px] border border-white/70 rounded-lg justify-center items-center mt-5"
          activeOpacity={0.8}
          onPress={() => router.push("/landing")}
        >
          <Text className="text-white text-base font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;