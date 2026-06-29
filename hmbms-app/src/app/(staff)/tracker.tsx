/**
 * (staff)/tracker.tsx
 * --------------------
 * The Tracker screen — monitors milk batches across laboratory processing 
 * states and view current ready-to-issue product inventory.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { Database, ProgramId } from '../../types/database.types';

type TrackerTab = 'tracker' | 'inventory';

// Explicit database row definitions
type MilkBatchRow = Database['public']['Tables']['milk_batches']['Row'];
type InventoryRow = Database['public']['Tables']['inventory']['Row'];

const BATCH_STEPS = ['Collection', 'Pasteurization', 'Lab Test', 'Approved'];

export default function TrackerScreen() {
  // Local state tracking the active program context for staff views
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(1);
  const currentTheme = PROGRAM_THEMES[selectedProgramId];

  const [activeTab, setActiveTab] = useState<TrackerTab>('tracker');
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState<MilkBatchRow[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryRow[]>([]);

  // Automatically fetch fresh data upon program context adjustments or tab changes
  useEffect(() => {
    if (activeTab === 'tracker') {
      fetchBatches();
    } else {
      fetchInventory();
    }
  }, [selectedProgramId, activeTab]);

  async function fetchBatches() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('milk_batches')
        .select('*'); // If your schema contains an explicit program context hook down the line, add filter here

      if (error) throw error;
      if (data) setBatches(data);
    } catch (err) {
      console.error('Error fetching milk batches:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchInventory() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inventory')
        .select('*');

      if (error) throw error;
      if (data) setInventoryItems(data);
    } catch (err) {
      console.error('Error fetching localized inventory data:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Program Selector Header Panel */}
      <View 
        className="px-6 pt-6 pb-6 rounded-b-[32px]" 
        style={{ backgroundColor: currentTheme.headerBg }}
      >
        <Text className="text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: currentTheme.headerText }}>
          Lifecycle Monitoring
        </Text>
        <Text className="text-2xl font-bold mt-1" style={{ color: currentTheme.headerText }}>
          {currentTheme.name} Tracker
        </Text>

        {/* Localized Inline Program Switcher Badges */}
        <View className="flex-row mt-4 space-x-2">
          {([1, 2, 3] as ProgramId[]).map((pid) => (
            <TouchableOpacity
              key={pid}
              onPress={() => setSelectedProgramId(pid)}
              className={`px-4 py-1.5 rounded-full ${selectedProgramId === pid ? 'bg-white' : 'bg-white/20'}`}
            >
              <Text 
                className="text-xs font-bold"
                style={{ color: selectedProgramId === pid ? '#111827' : '#FFFFFF' }}
              >
                Prog {pid}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Dynamic Segmented Control Navigation Tab Bar */}
      <View className="flex-row mx-4 my-4 p-1 bg-gray-100 rounded-xl">
        {(['tracker', 'inventory'] as TrackerTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg items-center ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
          >
            <Text
              className={`text-xs font-bold capitalize ${activeTab === tab ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {tab === 'tracker' ? 'Processing Pools' : 'Stock Room'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Context Stream */}
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View className="py-12 items-center justify-center">
            <ActivityIndicator size="small" color={currentTheme.accent} />
            <Text className="text-gray-400 text-xs mt-2">Polling server stores...</Text>
          </View>
        ) : activeTab === 'tracker' ? (
          /* TRACKER BATCH STREAM LISTING */
          batches.length === 0 ? (
            <Text className="text-center text-gray-400 text-sm py-12">No batches currently tracked inside processing pipelines.</Text>
          ) : (
            batches.map((batch) => {
              // Gracefully handle progress bar step markers based on the batch status string property
              const currentStatusIndex = BATCH_STEPS.findIndex(
                (step) => step.toLowerCase() === (batch.status || '').toLowerCase()
              );
              const normalizedIndex = currentStatusIndex !== -1 ? currentStatusIndex : 1;

              return (
                <View key={batch.batch_id} className="bg-white border border-gray-100 rounded-2xl p-4 mb-4 shadow-sm">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-900 font-bold text-sm">Batch #{batch.batch_id.slice(0, 8).toUpperCase()}</Text>
                    <View 
                      className="px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${currentTheme.accent}15` }}
                    >
                      <Text className="text-xs font-bold uppercase tracking-wide" style={{ color: currentTheme.accent }}>
                        {batch.status || 'Pending'}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-400 text-xs mb-4">
                    Logged: {batch.submitted_date ? new Date(batch.submitted_date).toLocaleDateString() : 'N/A'}
                  </Text>

                  {/* Horizontal Segmented Pipeline Step Visualizer */}
                  <View className="flex-row justify-between items-center pt-2 relative">
                    <View className="absolute left-2 right-2 top-4 h-0.5 bg-gray-100 -z-10" />
                    {BATCH_STEPS.map((step, idx) => {
                      const isCompleted = idx <= normalizedIndex;
                      return (
                        <View key={step} className="items-center flex-1">
                          <View 
                            className={`w-4 h-4 rounded-full border-2 items-center justify-center mb-1 bg-white ${
                              isCompleted ? 'border-emerald-500' : 'border-gray-200'
                            }`}
                          >
                            {isCompleted && <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                          </View>
                          <Text className={`text-[9px] font-semibold tracking-tight ${isCompleted ? 'text-gray-800' : 'text-gray-300'}`}>
                            {step}
                          </Text>
                        </View>
                      );
                    })}
                  </View>

                  {/* Extra Volume Metrics */}
                  <View className="mt-4 pt-3 border-t border-gray-50 flex-row justify-between text-xs">
                    <Text className="text-gray-400 text-xs">Pre-Past Volume: <Text className="text-gray-700 font-medium">{batch.pre_pasteurization_ml || 0} mL</Text></Text>
                    <Text className="text-gray-400 text-xs">Post-Past Volume: <Text className="text-gray-700 font-medium">{batch.post_pasteurization_ml || 0} mL</Text></Text>
                  </View>
                </View>
              );
            })
          )
        ) : (
          /* INVENTORY STOCK STREAM LISTING */
          inventoryItems.length === 0 ? (
            <Text className="text-center text-gray-400 text-sm py-12">No current item entries located inside store infrastructure.</Text>
          ) : (
            inventoryItems.map((item) => (
              <View key={item.inventory_id} className="bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm flex-row justify-between items-center">
                <View>
                  <Text className="text-gray-800 font-bold text-sm">Storage Slot ID</Text>
                  <Text className="text-gray-400 text-xs mt-0.5">{item.inventory_id.slice(0, 12)}</Text>
                  <Text className="text-gray-300 text-[10px] mt-2">
                    Updated: {item.last_updated ? new Date(item.last_updated).toLocaleDateString() : 'N/A'}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-xl font-black text-gray-900">{item.volume_available_ml || 0}</Text>
                  <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">Available mL</Text>
                </View>
              </View>
            ))
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}