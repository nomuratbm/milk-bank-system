/**
 * (staff)/reports.tsx
 * --------------------
 * The Reports screen — a scrollable list of transaction records
 * for the active program.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { Database, ProgramId } from '../../types/database.types';

// Map directly to the valid 'transactions' table from your schema definitions
type TransactionRowData = Database['public']['Tables']['transactions']['Row'];

export default function ReportsScreen() {
  // Local state tracking the active program context for staff viewing
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(1);
  const currentTheme = PROGRAM_THEMES[selectedProgramId];

  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<TransactionRowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [selectedProgramId]);

  async function fetchReports() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('program_id' as any, selectedProgramId);

      if (error) throw error;
      if (data) setTransactions(data);
    } catch (err) {
      console.error('Error fetching transaction reports:', err);
    } finally {
      setLoading(false);
    }
  }

  // Real-time filtered list computation
  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return transactions;
    return transactions.filter(
      (t: any) =>
        t.id?.toLowerCase().includes(query) ||
        t.transaction_id?.toLowerCase().includes(query) ||
        t.beneficiary_name?.toLowerCase().includes(query) ||
        t.status?.toLowerCase().includes(query)
    );
  }, [searchQuery, transactions]);

  const renderReport = ({ item }: ListRenderItemInfo<TransactionRowData>) => {
    // Handle fallback fields gracefully depending on exact column keys in your transactions schema
    const transactionId = (item as any).transaction_id || (item as any).id || 'N/A';
    const dateAdded = item.transaction_date ? new Date(item.transaction_date).toLocaleDateString() : 'N/A';
    const volume = (item as any).volume_ml || (item as any).amount || 0;
    const notes = (item as any).notes || (item as any).status || 'None';

    return (
      <View
        className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm"
        style={{ borderLeftWidth: 4, borderLeftColor: currentTheme.accent }}
      >
        <Text className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: currentTheme.accent }}>
          Transaction Log Card
        </Text>

        <ReportRow label="Transaction ID:" value={transactionId} />
        <ReportRow label="Date Logged:" value={dateAdded} />
        <ReportRow label="Volume Details:" value={`${volume} mL`} />
        <ReportRow label="Status/Notes:" value={notes} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Program Header Selector Block */}
      <View 
        className="px-6 pt-6 pb-6 rounded-b-[32px]" 
        style={{ backgroundColor: currentTheme.headerBg }}
      >
        <Text className="text-xs font-semibold uppercase tracking-wider opacity-60" style={{ color: currentTheme.headerText }}>
          System Audit Log
        </Text>
        <Text className="text-2xl font-bold mt-1" style={{ color: currentTheme.headerText }}>
          {currentTheme.name} Reports
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
        <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <Text className="text-gray-400 text-lg mr-2">⌕</Text>
          <TextInput
            className="flex-1 text-gray-800 text-sm p-0"
            placeholder="Search logs by transaction ID or status..."
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

      {/* Match Result Counters */}
      <Text className="text-xs font-semibold text-gray-400 px-5 mb-2 mt-1">
        {filteredTransactions.length} transaction record{filteredTransactions.length !== 1 ? 's' : ''} {searchQuery ? 'matched' : 'indexed'}
      </Text>

      {/* Main Stream FlatList Layout */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item, index) => (item as any).id || (item as any).transaction_id || index.toString()}
        renderItem={renderReport}
        contentContainerClassName="p-4 pb-12"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            <Text className="text-gray-400 text-sm">
              {loading ? 'Polling transaction records...' : 'No transaction logs found.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

/**
 * Reusable layout row to guarantee consistency
 */
function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-1">
      <Text className="text-xs font-medium text-gray-400" numberOfLines={1}>
        {label}
      </Text>
      <Text className="text-xs font-semibold text-gray-800 text-right flex-1 ml-4" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}