/**
 * (staff)/registry.tsx
 * ---------------------
 * The Registry screen — shows all Donors and Beneficiaries for the
 * currently selected program.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { Database, ProgramId } from '../../types/database.types';

type RegistryTab = 'donors' | 'beneficiaries';

// Precise row types mapping exactly to database schema definitions
type DonorRow = Database['public']['Tables']['donors']['Row'];
type BeneficiaryRow = Database['public']['Tables']['beneficiaries']['Row'];

export default function RegistryScreen() {
  // Local state tracking the active program context for staff viewing
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(1);
  const currentTheme = PROGRAM_THEMES[selectedProgramId];

  const [activeTab, setActiveTab] = useState<RegistryTab>('donors');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Lists matching database definitions
  const [donors, setDonors] = useState<DonorRow[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryRow[]>([]);

  // Modal and creation form processing state
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchRecords();
  }, [selectedProgramId]);

  async function fetchRecords() {
    setLoading(true);
    try {
      const [donorRes, benefRes] = await Promise.all([
        supabase
          .from('donors')
          .select('*')
          .eq('program_id', selectedProgramId),
        supabase
          .from('beneficiaries')
          .select('*')
          .eq('program_id', selectedProgramId)
      ]);

      if (donorRes.data) setDonors(donorRes.data);
      if (benefRes.data) setBeneficiaries(benefRes.data);
    } catch (err) {
      console.error('Error loading registry datasets:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddRecord() {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Validation Error', 'First and Last names are required values.');
      return;
    }

    try {
      if (activeTab === 'donors') {
        const { error } = await supabase.from('donors').insert({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          contact_num: phone.trim() || null,
          program_id: selectedProgramId,
        });
        if (error) throw error;
      } else {
        // Generates a mock or temporary valid auth fallback user string id if mandatory
        const temporaryId = genRandomUUID();
        const { error } = await supabase.from('beneficiaries').insert({
          id: temporaryId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          contact_num: phone.trim() || null,
          program_id: selectedProgramId,
        });
        if (error) throw error;
      }

      setModalVisible(false);
      setFirstName('');
      setLastName('');
      setPhone('');
      fetchRecords();
    } catch (error: any) {
      Alert.alert('Action Failed', error.message || 'Could not insert new record.');
    }
  }

  function genRandomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async function handleRemoveDonor(donorId: string) {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to permanently remove this registry entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('donors')
              .delete()
              .eq('donor_id', donorId);

            if (error) {
              Alert.alert('Error', error.message);
            } else {
              fetchRecords();
            }
          }
        }
      ]
    );
  }

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const source = activeTab === 'donors' ? donors : beneficiaries;

    if (!query) return source;

    return source.filter(
      (item: any) =>
        item.first_name?.toLowerCase().includes(query) ||
        item.last_name?.toLowerCase().includes(query)
    );
  }, [activeTab, searchQuery, donors, beneficiaries]);

  const getInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-100 bg-white">
      <View className="flex-row items-center flex-1 space-x-3">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center bg-gray-100"
          style={{ backgroundColor: `${currentTheme.accent}20` }}
        >
          <Text className="font-bold text-sm" style={{ color: currentTheme.accent }}>
            {getInitials(item.first_name, item.last_name)}
          </Text>
        </View>
        
        <View className="flex-1 ml-2">
          <Text className="text-gray-900 font-semibold text-base">
            {item.first_name} {item.last_name}
          </Text>
          <Text className="text-gray-500 text-xs">
            {item.contact_num || 'No contact saved'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center space-x-4">
        {activeTab === 'donors' && (
          <TouchableOpacity
            onPress={() => handleRemoveDonor(item.donor_id)}
            className="p-2"
            activeOpacity={0.7}
          >
            <Text className="text-red-500 font-bold text-lg">🗑</Text>
          </TouchableOpacity>
        )}
        <Text className="text-gray-300 text-xl font-light ml-2">›</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Program Header Selector Block */}
      <View 
        className="px-6 pt-6 pb-6 rounded-b-[32px]" 
        style={{ backgroundColor: currentTheme.headerBg }}
      >
        <Text className="text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: currentTheme.headerText }}>
          Database Registry
        </Text>
        <Text className="text-2xl font-bold mt-1" style={{ color: currentTheme.headerText }}>
          {currentTheme.name} Overview
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

      {/* Real-time Search Box Section */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
          <Text className="text-gray-400 text-lg mr-2">⌕</Text>
          <TextInput
            className="flex-1 text-gray-800 text-sm p-0"
            placeholder="Search matching entries by name..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text className="text-gray-400 font-bold px-1">✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Quick Action Category Tabs */}
      <View className="flex-row border-b border-gray-200 mx-4 mt-2">
        {(['donors', 'beneficiaries'] as RegistryTab[]).map((tab) => {
          const isTargeted = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => { setActiveTab(tab); setSearchQuery(''); }}
              className="flex-1 items-center py-3 relative"
              activeOpacity={0.7}
            >
              <Text className={`text-sm font-bold ${isTargeted ? 'text-gray-900' : 'text-gray-400'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'donors' ? donors.length : beneficiaries.length})
              </Text>
              {isTargeted && (
                <View className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full" style={{ backgroundColor: currentTheme.accent }} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Core Dynamic List Area */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => {
            const itemId = 'donor_id' in item ? item.donor_id : item.id;
            return itemId || index.toString();
        }}
        renderItem={renderItem}
        contentContainerClassName="pb-24"
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Text className="text-gray-400 text-sm">
              {loading ? 'Refreshing connections...' : 'No target records matched.'}
            </Text>
          </View>
        }
      />

      {/* Create Floating Entry Button Layout */}
      <View className="absolute bottom-4 left-4 right-4 shadow-lg">
        <TouchableOpacity
          style={{ backgroundColor: currentTheme.accent }}
          onPress={() => setModalVisible(true)}
          className="py-4 rounded-xl items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-gray-900 font-bold text-base">
            + Append New {activeTab === 'donors' ? 'Donor' : 'Beneficiary'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Insertion Form Modal Context Overlay */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[28px] p-6 space-y-4">
            <Text className="text-gray-900 font-bold text-lg mb-2">
              Create Program {activeTab === 'donors' ? 'Donor' : 'Beneficiary'}
            </Text>

            <View className="space-y-3">
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800"
                placeholder="Given First Name"
                placeholderTextColor="#9CA3AF"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800"
                placeholder="Family Last Name"
                placeholderTextColor="#9CA3AF"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800"
                placeholder="Mobile Contact Line (Optional)"
                placeholderTextColor="#9CA3AF"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View className="flex-row space-x-3 pt-4">
              <TouchableOpacity
                onPress={() => { setModalVisible(false); setFirstName(''); setLastName(''); setPhone(''); }}
                className="flex-1 bg-gray-100 py-3.5 rounded-xl items-center"
              >
                <Text className="text-gray-600 font-semibold">Discard</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{ backgroundColor: currentTheme.accent }}
                onPress={handleAddRecord}
                className="flex-1 py-3.5 rounded-xl items-center"
              >
                <Text className="text-gray-900 font-bold">Commit Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}