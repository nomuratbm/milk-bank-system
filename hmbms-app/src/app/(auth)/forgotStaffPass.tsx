// src/app/(auth)/forgotStaffPass.tsx
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import TopBrandingSection from "../../components/TopBrandingSection";
import { authService } from "../../services/auth/authService";

const ForgotStaffPass: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) return;
    setLoading(true);
    await authService.resetPassword(email);
    setLoading(false);
    router.push("/completeStaff");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TopBrandingSection />

      <ScrollView
        className="flex-1 bg-navy"
        contentContainerClassName="px-8 pt-4 pb-12"
      >
        {/* Title + description */}
        <View className="mb-8 w-full">
          <Text className="text-white text-3xl font-bold self-start mb-10">
            Forgot Password
          </Text>
          <Text className="text-white/80 text-base leading-6">
            Let us help you by entering your email below!
          </Text>
        </View>

        {/* Email */}
        <View className="mb-8 w-full">
          <Text className="text-white text-base font-bold mb-2">Email Address</Text>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#B3B3B380"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white text-ink text-base rounded-lg border border-[#D9D9D9] px-4 py-3 w-full"
          />
        </View>

        {/* Send button */}
        <View className="items-center mb-4 w-full">
          <TouchableOpacity
            className={`bg-white rounded-lg py-3.5 justify-center items-center w-full ${loading ? "opacity-50" : ""}`}
            disabled={loading}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            <Text className="text-ink text-base font-bold">Send Email</Text>
          </TouchableOpacity>
        </View>

        {/* Back button */}
        <View className="items-center mb-4 w-full">
          <TouchableOpacity
            className="bg-transparent border border-white/40 rounded-lg py-3.5 justify-center items-center w-full"
            onPress={() => router.push("/loginStaff")}
            activeOpacity={0.7}
          >
            <Text className="text-white/80 text-base font-bold">Back to login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotStaffPass;
