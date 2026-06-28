/**
 * (staff)/registry.tsx
 * ---------------------
 * The Registry screen — shows all Donors and Beneficiaries for the
 * currently selected program.
 *
 * FEATURES:
 * - Colored header banner using the active program's accent color
 * - Stat chips showing total donors + beneficiaries
 * - Search bar that filters names in real-time
 * - Tab switcher: "Donors" tab | "Beneficiaries" tab
 * - Scrollable list of person rows with avatar, name, phone, date
 *
 * KEY CONCEPTS:
 * - useMemo: recomputes the filtered list only when search or
 *   activeProgram changes — prevents re-filtering on every render.
 * - useState for tab and searchQuery
 * - FlatList: RN's performant list (virtualizes off-screen rows)
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
  Modal,
  Dimensions,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDatabase } from '../../contexts/DatabaseContext';
import { supabase } from '../../lib/supabase';
import type { ProgramId } from '../../types/database.types';
import { TopBrandingSection } from './staffStyles';
import Svg, { Path } from 'react-native-svg';

// The two possible tabs
type RegistryTab = 'donors' | 'beneficiaries';
const { width } = Dimensions.get('window');

export default function RegistryScreen() {
  const { activeProgram } = useDatabase();

  // Which tab is visible
  const [activeTab, setActiveTab] = useState<RegistryTab>('donors');
  // The text the user has typed in the search box
  const [searchQuery, setSearchQuery] = useState('');
  const [newLastName, setNewLastName] = useState('');

  // Pull data for the active program
  const [donors, setDonors] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  //ADDING A DONOR
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    fetchAll();
  }, [activeProgram.id]);

  async function fetchAll() {
    setLoading(true);

    const [donorRes, benefRes] = await Promise.all([ // calls both donor and beneficiary queries
      supabase
        .from('donors')
        .select('*')
        .eq('program_id', activeProgram.id),
      supabase
        .from('beneficiaries')
        .select('*')
        .eq('program_id', activeProgram.id)
    ]);

    if (donorRes.data) setDonors(donorRes.data);
    if (benefRes.data) setBeneficiaries(benefRes.data);

    setLoading(false);

  }

  // ADDING A DONOR
  async function addDonor(name: string, phone: string) {
    const { error } = await supabase
      .from('donors')
      .insert({
        first_name: first_name,
        last_name: '',
        phone: phone,
        program_id: activeProgram.id, // so it links to the program selected
      });
    if (error) {
      alert('Failed to add donor: ' + error.message);
    } else {
      fetchAll(); // refreshes the list
    }
  }

  // REMOVING A DONOR
  async function removeDonor(donorId: string) {
    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', donorId);

    if (error) {
      alert('Failed to remove donor: ' + error.message);
    } else {
      fetchAll();
    }
  }

  // --- FILTERING ---
  // useMemo re-runs only when its dependencies (activeTab, searchQuery,
  // activeProgram.id) change. This avoids re-filtering on unrelated renders.
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const source: (Donor | Beneficiary)[] =
      activeTab === 'donors' ? donors : beneficiaries; // use donors/beneficiaries instead of programData

    if (!query) return source;
    // Filter by name or id containing the search string
    return source.filter(
      item =>
        item.first_name?.toLowerCase().includes(query) ||
        item.last_name?.toLowerCase().includes(query) ||
        item.id?.toString().toLowerCase().includes(query)
    );
  }, [activeTab, searchQuery, activeProgram.id]);

  // Total counts for the stat chips
  const totalDonors = donors.length;
  const totalBeneficiaries = beneficiaries.length;
  const totalRecords = totalDonors + totalBeneficiaries;
  const activeCount = activeTab === 'donors' ? totalDonors : totalBeneficiaries;

  // Generate 2-letter initials for the avatar circle
  const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  // Render one person row in the FlatList
  const renderItem = ({ item }: { item: Donor | Beneficiary }) => (
    <TouchableOpacity style={styles.personRow} activeOpacity={0.7}>
      {/* Avatar circle with initials */}
      <View style={[styles.avatar, { backgroundColor: activeProgram.color + '33' }]}>
        <Text style={[styles.avatarText, { color: activeProgram.color }]}>
          {getInitials(`${item.first_name} ${item.last_name}`)}
        </Text>
      </View>
      {/* Name + phone */}
      <View style={styles.personInfo}>
        <Text style={styles.personName}>{item.name}</Text>
        <Text style={styles.personPhone}>{item.phone}</Text>
      </View>
      {/* Date + arrow */}
      <View style={styles.personRight}>
        <Text style={styles.personDate}>{item.dateAdded}</Text>
        <Text style={[styles.arrow, { color: activeProgram.color }]}>›</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeDonor(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={{ color: '#FF4444', fontSize: 18 }}>🗑</Text>
      </TouchableOpacity>
    </TouchableOpacity>


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
          <Text style={[styles.letter_program, { transform: [{ translateY: 1 }, { rotate: '4deg' }] }]}>R</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 2 }, { rotate: '8deg' }] }]}>e</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 6 }, { rotate: '7deg' }] }]}>g</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '5deg' }] }]}>i</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '3deg' }] }]}>s</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 15 }, { rotate: '-2deg' }] }]}>t</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 14 }, { rotate: '-6deg' }] }]}>r</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '-7deg' }] }]}>y</Text>
        </View>

        <View style={styles.waveContainer}>
          <Svg height="105" width="100%" viewBox="0 0 375 105" preserveAspectRatio="none">
            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58 L375,105 L0,105 Z" fill="transparent" stroke="#000000" strokeWidth="3.5" />
            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#0D072F" />
          </Svg>
        </View>
      </View>

      {/* ── Search bar ────────────────────────────────────────
          TextInput in RN behaves like a web <input>. We use
          onChangeText to update state on every keystroke.
      */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or ID"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {/* Clear button appears when there's text */}
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Stat chips ────────────────────────────────────────
          "Total records: N" and "Active [tab]: N for this program"
      */}
      <View style={styles.statsRow}>
        <View style={styles.statChip}>
          <Text style={[styles.statNumber, { color: activeProgram.color }]}>
            {totalRecords}
          </Text>
          <Text style={styles.statLabel}>Donors +{'\n'}Beneficiaries</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={[styles.statNumber, { color: activeProgram.color }]}>
            {activeCount}
          </Text>
          <Text style={styles.statLabel}>
            {activeTab === 'donors' ? 'Active Donors' : 'Beneficiaries'}
            {'\n'}For this program
          </Text>
        </View>
      </View>

      {/* ── Tab switcher ──────────────────────────────────────
          Two buttons that toggle between Donors and Beneficiaries.
          The active tab gets a colored bottom border.
      */}
      <View style={styles.tabBar}>
        {(['donors', 'beneficiaries'] as RegistryTab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => { setActiveTab(tab); setSearchQuery(''); }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && { color: activeProgram.color },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {/* Bottom border indicator for active tab */}
            {activeTab === tab && (
              <View style={[styles.tabIndicator, { backgroundColor: activeProgram.color }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: activeProgram.color }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addBtnText}>
          + Add {activeTab === 'donors' ? 'Donor' : 'Beneficiary'}
        </Text>
      </TouchableOpacity>

      {/* ── List ──────────────────────────────────────────────
          FlatList renders only what's visible on screen (virtual),
          making it fast even with hundreds of rows.
          keyExtractor returns a unique key for each item (required).
      */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No results found.' : 'No entries yet.'}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />


      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Add {activeTab === 'donors' ? 'Donor' : 'Beneficiary'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="First name"
              placeholderTextColor="rgba(255,255,255,0.30)"
              value={newName}
              onChangeText={setNewName}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last name"
              placeholderTextColor="rgba(255,255,255,0.30)"
              value={newLastName}
              onChangeText={setNewLastName}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone number"
              placeholderTextColor="rgba(255,255,255,0.30)"
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => { setModalVisible(false); setNewName(''); setNewPhone(''); }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: activeProgram.color }]}
                onPress={async () => {
                  if (!newName.trim()) { alert('Name is required.'); return; }
                  await addDonor(newName, newPhone);
                  setModalVisible(false);
                  setNewName('');
                  setNewPhone('');
                }}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
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
    // Wave-bottom effect via borderRadius on bottom corners
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    color: 'rgba(255,255,255,0.08)',
    marginTop: -1,
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
  searchIcon: { color: 'rgba(255,255,255,0.5)', fontSize: 18 },
  searchInput: { flex: 1, color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  clearBtn: { color: 'rgba(255,255,255,0.5)', fontSize: 14, padding: 4 },

  // ── Stats ──
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 4,
  },
  statChip: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statNumber: { fontSize: 28, fontWeight: '700' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 16 },

  // ── Tabs ──
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 16,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    borderRadius: 2,
  },

  // ── List ──
  listContent: { paddingBottom: 16 },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '700' },
  personInfo: { flex: 1 },
  personName: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  personPhone: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  personRight: { alignItems: 'flex-end', gap: 2 },
  personDate: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
  arrow: { fontSize: 20, lineHeight: 24 },

  // ── Empty ──
  emptyState: { padding: 40, alignItems: 'center' },
  emptyText: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },

  modalCard: {
    backgroundColor: '#1A1245',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16
  },

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

  addBtn: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addBtnText: { color: '#0D072F', fontWeight: '700', fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },

  modalInput: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },

  modalActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  cancelBtnText: { color: 'rgba(255,255,255,0.7)', fontWeight: '600', fontSize: 15 },
  saveBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: '#0D072F', fontWeight: '700', fontSize: 15 },
});
