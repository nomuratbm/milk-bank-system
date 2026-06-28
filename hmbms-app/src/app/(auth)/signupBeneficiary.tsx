// src/app/(auth)/signupBeneficiary.tsx
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Image,
  Alert, ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import TopBrandingSection from "../../components/TopBrandingSection";

const SignupBeneficiary: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          mobile_number: mobileNumber,
          account_type: "beneficiary",
        },
      },
    });
    setLoading(false);
    if (error) {
      Alert.alert("Sign Up Failed", error.message);
    } else {
      Alert.alert(
        "Account Created",
        "Please check your email to verify your account, then log in.",
        [{ text: "OK", onPress: () => router.replace("/loginBeneficiary") }]
      );
    }
  };

  const isDisabled = !isAgreed || loading;

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
          <Text className="text-white text-3xl font-bold">Sign Up</Text>
          <View className="flex-row items-center border border-white/30 rounded-xl px-2.5 py-1.5 bg-navy-badge">
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png" }}
              resizeMode="stretch"
              className="w-4 h-3 rounded-full mr-1.5"
            />
            <Text className="text-ink-400 text-[10px] font-bold">Beneficiary Signup</Text>
          </View>
        </View>

        {/* Full Name */}
        <View className="mb-5 w-full">
          <Text className="text-white text-base font-bold mb-2">Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#B3B3B380"
            value={fullName}
            onChangeText={setFullName}
            className="bg-white text-ink text-base rounded-lg border border-[#D9D9D9] px-4 py-3 w-full"
          />
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

        {/* Mobile */}
        <View className="mb-5 w-full">
          <Text className="text-white text-base font-bold mb-2">Mobile Number</Text>
          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor="#B3B3B380"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
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

        {/* Terms checkbox */}
        <TouchableOpacity
          className="flex-row items-center mt-2.5 mb-8 w-full"
          activeOpacity={0.8}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <View
            className={`w-5 h-5 rounded border-[1.5px] justify-center items-center mr-3 ${
              isAgreed ? "bg-white border-white" : "bg-transparent border-white"
            }`}
          >
            {isAgreed && <View className="w-2.5 h-2.5 rounded-sm bg-navy" />}
          </View>
          <Text className="text-white text-xs flex-1">
            I agree with the Terms and Conditions and Privacy Policy
          </Text>
        </TouchableOpacity>

        {/* Sign up button */}
        <View className="items-center mb-6 w-full">
          <TouchableOpacity
            className={`bg-white rounded-lg py-3.5 justify-center items-center w-full ${isDisabled ? "opacity-50" : ""}`}
            disabled={isDisabled}
            onPress={handleSignup}
            activeOpacity={0.8}
          >
            {loading
              ? <ActivityIndicator color="#1E1E1E" />
              : <Text className="text-ink text-base font-bold">Sign Up</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Login redirect */}
        <TouchableOpacity
          className="items-center mb-5 w-full"
          onPress={() => router.push("/loginBeneficiary")}
        >
          <Text className="text-white text-sm">
            Already have an account?{" "}
            <Text className="font-bold underline">Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupBeneficiary;
