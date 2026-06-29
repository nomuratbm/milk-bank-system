import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import TopBrandingSection from "./TopBrandingSection";

interface AuthLayoutProps {
  title: string;
  badgeText: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  badgeText,
  children,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TopBrandingSection />

      <ScrollView
        className="flex-1 bg-navy"
        contentContainerClassName="px-8 pt-4 pb-12"
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-white text-3xl font-bold">{title}</Text>
          <View className="flex-row items-center border border-white/30 rounded-xl px-2.5 py-1.5 bg-navy-badge">
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png",
              }}
              resizeMode="stretch"
              className="w-4 h-3 rounded-full mr-1.5"
            />
            <Text className="text-ink-400 text-[10px] font-bold">
              {badgeText}
            </Text>
          </View>
        </View>

        {/* Dynamic Page Content */}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};