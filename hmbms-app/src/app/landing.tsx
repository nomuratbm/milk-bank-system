// src/app/landing.tsx
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import TopBrandingSection from "../components/TopBrandingSection";

const LandingScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TopBrandingSection />

      <ScrollView
        className="flex-1 bg-navy"
        contentContainerClassName="px-8 pt-4 pb-12"
      >
        <Text className="text-white text-2xl font-bold mb-8">
          Select your role to continue
        </Text>

        {/* Staff card */}
        <TouchableOpacity
          className="flex-row items-center bg-[#1E1B4B66] border border-white/15 rounded-xl py-6 px-6 mb-5 w-full"
          activeOpacity={0.7}
          onPress={() => router.push("/loginStaff")}
        >
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/4ype0svv_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[54px] h-[51px] mr-4"
          />
          <View className="flex-1">
            <Text className="text-white text-lg font-bold mb-1">Staff</Text>
            <Text className="text-ink-400 text-sm font-bold">Organization employees</Text>
          </View>
        </TouchableOpacity>

        {/* Beneficiary card */}
        <TouchableOpacity
          className="flex-row items-center bg-[#1E1B4B66] border border-white/15 rounded-xl py-6 px-6 mb-5 w-full"
          activeOpacity={0.7}
          onPress={() => router.push("/loginBeneficiary")}
        >
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/08vvo9rh_expires_30_days.png" }}
            resizeMode="stretch"
            className="w-[54px] h-[51px] mr-4"
          />
          <View className="flex-1">
            <Text className="text-white text-lg font-bold mb-1">Beneficiary</Text>
            <Text className="text-ink-400 text-sm font-bold">Individuals receiving services</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;