// src/app/(auth)/loginBeneficiary.tsx
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Image,
  Alert, ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import TopBrandingSection from "../../components/TopBrandingSection";

const LoginBeneficiary: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) Alert.alert("Login Failed", error.message);
    // On success, AuthContext updates → index.tsx redirects to onboarding or /(beneficiary)/home
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TopBrandingSection />

      <ScrollView
        className="flex-1 bg-navy"
        contentContainerClassName="px-8 pt-4 pb-12"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-white text-3xl font-bold">Login</Text>
          <View className="flex-row items-center border border-white/30 rounded-xl px-2.5 py-1.5 bg-navy-badge">
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png" }}
              resizeMode="stretch"
              className="w-4 h-3 rounded-full mr-1.5"
            />
            <Text className="text-ink-400 text-[10px] font-bold">Beneficiary Login</Text>
          </View>
        </View>

        {/* Email */}
        <View className="mb-5 w-full">
          <Text className="text-white text-base font-bold mb-2">Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#B3B3B380"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white text-ink text-base rounded-lg border border-[#D9D9D9] px-4 py-3 w-full"
          />
        </View>

        {/* Password */}
        <View className="mb-5 w-full">
          <Text className="text-white text-base font-bold mb-2">Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#B3B3B380"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-white text-ink text-base rounded-lg border border-[#D9D9D9] px-4 py-3 w-full"
          />
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          className="items-end mb-9 w-full"
          onPress={() => router.push("/forgotBeneficiaryPass")}
        >
          <Text className="text-white text-xs">Forgot password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <View className="items-center mb-6 w-full">
          <TouchableOpacity
            className={`bg-white rounded-lg py-3.5 justify-center items-center w-full ${loading ? "opacity-50" : ""}`}
            disabled={loading}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            {loading
              ? <ActivityIndicator color="#1E1E1E" />
              : <Text className="text-ink text-base font-bold">Login</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Sign up redirect */}
        <TouchableOpacity
          className="items-center mb-5 w-full"
          onPress={() => router.push("/signupBeneficiary")}
        >
          <Text className="text-white text-xs underline">New here? Sign Up Here</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginBeneficiary;
