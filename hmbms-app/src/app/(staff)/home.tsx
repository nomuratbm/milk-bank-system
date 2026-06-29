/**
 * (staff)/home.tsx
 * ----------------
 * The Standardized Staff Home / Dashboard screen.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';
import { useAuth } from '../../contexts/AuthContext';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { ProgramId } from '../../types/database.types';

export default function StaffHomeScreen() {
  const { signOut } = useAuth();
  
  // Local state to track which program the staff member is currently managing/viewing
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(1);

  // Get the active theme colors matching the selected program
  const currentTheme = PROGRAM_THEMES[selectedProgramId];

  const handleProgramSelect = (id: ProgramId) => {
    setSelectedProgramId(id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Dynamic Header Section using Selected Program Color */}
      <View 
        className="px-6 pt-6 pb-8 rounded-b-[32px] justify-between relative overflow-hidden"
        style={{ backgroundColor: currentTheme.headerBg }}
      >
        <View className="flex-row justify-between items-center z-10">
          <View>
            <Text className="text-xs font-semibold opacity-60" style={{ color: currentTheme.headerText }}>
              Staff Dashboard
            </Text>
            <Text className="text-2xl font-bold mt-1" style={{ color: currentTheme.headerText }}>
              {currentTheme.name} Management
            </Text>
          </View>

          {/* Milk Bank Logo Svg Placeholder */}
          <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill={currentTheme.headerText}
              opacity="0.8"
            />
          </Svg>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView 
        className="flex-1 bg-[#F9FAFB]"
        contentContainerClassName="p-6"
      >
        <Text className="text-gray-800 text-lg font-bold mb-4">
          Select Active Program Dataset
        </Text>

        {/* Program Switching Grid */}
        <View className="space-y-3 mb-8">
          {(Object.keys(PROGRAM_THEMES) as unknown as ProgramId[]).map((id) => {
            const prog = PROGRAM_THEMES[id];
            const isSelected = selectedProgramId === id;

            return (
              <TouchableOpacity
                key={id}
                onPress={() => handleProgramSelect(id)}
                activeOpacity={0.8}
                className={`p-5 rounded-2xl flex-row justify-between items-center border ${
                  isSelected 
                    ? 'border-transparent shadow-md' 
                    : 'bg-white border-gray-200'
                }`}
                style={{
                  backgroundColor: isSelected ? prog.primaryLight : '#FFFFFF',
                }}
              >
                <View>
                  <Text className="text-gray-900 font-bold text-base">
                    {prog.name}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-0.5">
                    Program ID: {id}
                  </Text>
                </View>

                {/* Status indicator dot */}
                <View 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: isSelected ? prog.accent : '#D1D5DB' }} 
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Quick Links Section */}
        <Text className="text-gray-800 text-lg font-bold mb-4">
          Management Controls ({currentTheme.name})
        </Text>

        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-[48%] bg-white p-5 rounded-xl border border-gray-100 mb-4 items-center shadow-sm"
          >
            <Text className="text-gray-800 font-semibold text-center">Beneficiary Registry</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-[48%] bg-white p-5 rounded-xl border border-gray-100 mb-4 items-center shadow-sm"
          >
            <Text className="text-gray-800 font-semibold text-center">Milk Request Tracker</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.7}
          className="mt-8 bg-red-50 border border-red-200 py-4 rounded-xl items-center justify-center w-full"
        >
          <Text className="text-red-600 font-bold text-base">Sign Out Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}