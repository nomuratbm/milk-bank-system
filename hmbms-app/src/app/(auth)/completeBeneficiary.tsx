// src/app/(auth)/completeBeneficiary.tsx
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { useRouter } from "expo-router";
import TopBrandingSection from "../../components/TopBrandingSection";

const CompleteBeneficiary: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TopBrandingSection />

      <ScrollView
        className="flex-1 bg-navy"
        contentContainerClassName="px-8 pt-4 pb-12 items-center"
      >
        <Text className="text-white text-3xl font-bold self-start mb-5">
          Forgot Password
        </Text>

        {/* Success icon */}
        <View className="my-5 justify-center items-center">
          <Svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <Circle cx="70" cy="70" r="66" stroke="#FFFFFF" strokeWidth="4" />
            <Path
              d="M45 72 L62 89 L95 52"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <Text className="text-white text-[22px] leading-8 font-bold text-center mt-5 mb-12 w-full">
          {"A link has been successfully\nsent to your email!"}
        </Text>

        <View className="items-center mb-6 w-full">
          <TouchableOpacity
            className="bg-transparent border border-white/40 rounded-lg py-3.5 justify-center items-center w-full"
            onPress={() => router.replace("/loginBeneficiary")}
            activeOpacity={0.7}
          >
            <Text className="text-white/80 text-base font-bold">Back to login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteBeneficiary;
