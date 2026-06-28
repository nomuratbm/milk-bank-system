/**
 * (staff)/reports.tsx
 * --------------------
 * The Reports screen — a scrollable list of transaction records
 * for the active program.
 *
 * FEATURES:
 * - Colored header with "Reports" title matching active program
 * - Search bar that filters by transaction ID or beneficiary name
 * - Scrollable list of report cards, each showing:
 *     • Transaction ID
 *     • Date of Registry
 *     • Date Received
 *     • Name of Beneficiary
 *     • Milk Volume (mL)
 * - Left-border accent on each card using the program's color
 *
 * KEY CONCEPTS:
 * - useMemo for filtered search (same pattern as Registry)
 * - FlatList for virtualized scrolling
 * - Left border accent via borderLeftWidth + borderLeftColor
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ListRenderItemInfo,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDatabase } from '../../contexts/DatabaseContext';
import { supabase } from '../../lib/supabase';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const { activeProgram } = useDatabase();
  const [searchQuery, setSearchQuery] = useState('');

  // Pull data for the active program
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, [activeProgram.id]);

  async function fetchAll() {
    setLoading(true);

    const [reportRes] = await Promise.all([
      supabase
        .from('reports')
        .select('*')
        .eq('program_id', activeProgram.id),
    ]);

    if (reportRes.data) setReports(reportRes.data);
    setLoading(false);

  }

  // Filter reports by transaction ID or beneficiary name
  const filteredReports = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return reports;
    return programData.reports.filter(
      r =>
        r.transactionId.toLowerCase().includes(query) ||
        r.beneficiaryName.toLowerCase().includes(query)
    );
  }, [searchQuery, activeProgram.id]);

  // Render a single report card
  const renderReport = ({ item, index }: ListRenderItemInfo<Report>) => (
    <View
      style={[
        styles.reportCard,
        { borderLeftColor: activeProgram.color },
      ]}
    >
      {/* Card title with accent color */}
      <Text style={[styles.cardTitle, { color: activeProgram.color }]}>
        Transaction Report
      </Text>

      {/*
        Each field is a label-value row.
        We truncate the transaction ID for display clarity.
      */}
      <ReportRow label="Transaction ID:" value={item.transactionId} />
      <ReportRow label="Date of Registry:" value={item.dateOfRegistry} />
      <ReportRow label="Date Received:" value={item.dateReceived} />
      <ReportRow label="Name of Beneficiary:" value={item.beneficiaryName} />
      <ReportRow label="Milk Volume:" value={`${item.volumeMl} mL`} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={activeProgram.color} />

      {/* ── Colored header banner ───────────────────────────── */}
      <View style={[styles.headerContainer, { backgroundColor: activeProgram.color }]}>
        <View style={styles.patternBackgroundWrapper}>
          <ImageBackground
            source={require('../../assets/group119.png')}
            style={styles.headerImageBackground}
            resizeMode="cover"
          />
        </View>

        <View style={styles.curvedTitleContainer}>
          <Text style={[styles.letter_program, { transform: [{ translateY: 2 }, { rotate: '4deg' }] }]}>R</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 2 }, { rotate: '8deg' }] }]}>e</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 7 }, { rotate: '5deg' }] }]}>p</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '5deg' }] }]}>o</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '-1deg' }] }]}>r</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '-4deg' }] }]}>t</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '-5deg' }] }]}>s</Text>
        </View>

        <View style={styles.waveContainer}>
          <Svg height="105" width="100%" viewBox="0 0 375 105" preserveAspectRatio="none">
            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58 L375,105 L0,105 Z" fill="transparent" stroke="#000000" strokeWidth="3.5" />
            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#0D072F" />
          </Svg>
        </View>
      </View>

      {/* ── Search bar ──────────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or ID"
            placeholderTextColor="rgba(255,255,255,0.30)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Report count ──────────────────────────────────────
          Shows how many results are visible after filtering.
      */}
      <Text style={styles.resultCount}>
        {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''}
        {searchQuery ? ' found' : ' total'}
      </Text>

      {/* ── Report list ───────────────────────────────────────
          FlatList handles scroll. Each item is a report card.
          keyExtractor uses index because transactionIds can repeat
          in the placeholder data.
      */}
      <FlatList
        data={filteredReports}
        keyExtractor={(_, index) => `report-${index}`}
        renderItem={renderReport}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No reports match your search.' : 'No reports yet.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ── Reusable row sub-component ────────────────────────────────
/**
 * A simple label + value pair displayed on one line.
 * Defined outside the main component so React doesn't
 * re-create it on every render.
 */
function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.reportRow}>
      <Text style={styles.reportKey} numberOfLines={1}>{label}</Text>
      <Text style={styles.reportValue} numberOfLines={1}>{value}</Text>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D072F' },

  // ── Banner ──
  banner: {
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0D072F',
    letterSpacing: -0.5,
  },

  // ── Search ──
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: { color: 'rgba(255,255,255,0.45)', fontSize: 18 },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 14 },
  clearBtn: { color: 'rgba(255,255,255,0.45)', fontSize: 14, padding: 4 },

  // ── Result count ──
  resultCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.40)',
    paddingHorizontal: 16,
    marginBottom: 4,
    fontWeight: '500',
  },

  // ── List ──
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },

  // ── Report card ──
  // The left border uses the program's accent color, matching the mockup.
  reportCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderLeftWidth: 3,
    // borderLeftColor set inline above
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    // color set inline
  },

  // ── Report rows ──
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  reportKey: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.50)',
    fontWeight: '500',
    flexShrink: 0,
  },
  reportValue: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },

  // ── Empty ──
  emptyState: { padding: 40, alignItems: 'center' },
  emptyText: { color: 'rgba(255,255,255,0.35)', fontSize: 14, textAlign: 'center' },

  headerContainer: {
    height: 150,
    backgroundColor: '#0D072F',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10,
  },
  patternBackgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '65%',
  },
  headerImageBackground: {
    width: '100%',
    height: '100%',
  },
  curvedTitleContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: width * 0.055,
    bottom: 50,
    zIndex: 12,
    alignItems: 'flex-start',
  },
  letter: {
    fontSize: 50,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
    letterSpacing: -2,
  },
  waveContainer: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    zIndex: 11,
  },

  letter_program: {
    fontSize: 50,
    fontWeight: '700',
    color: '#0D072F',
    fontFamily: 'System',
    letterSpacing: -1,
    bottom: 4
  },

});
