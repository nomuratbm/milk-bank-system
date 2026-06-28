import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDatabase } from '../../contexts/DatabaseContext';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

type TrackerTab = 'tracker' | 'inventory';

const BATCH_STEPS = ['Collection', 'Pasteurization', 'Lab Test', 'Approved'];

export default function TrackerScreen() {
  const { activeProgram } = useDatabase();
  const [activeTab, setActiveTab] = useState<TrackerTab>('tracker');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={activeProgram.color} />

      <View style={[styles.headerContainer, { backgroundColor: activeProgram.color }]}>
        <View style={styles.patternBackgroundWrapper}>
          <ImageBackground
            source={require('../../assets/group119.png')}
            style={styles.headerImageBackground}
            resizeMode="cover"
          />
        </View>

        <View style={styles.curvedTitleContainer}>
          <Text style={[styles.letter_program, { transform: [{ translateY: 4 }, { rotate: '5deg' }] }]}>T</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 7 }, { rotate: '5deg' }] }]}>r</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 10 }, { rotate: '7deg' }] }]}>a</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 13 }, { rotate: '5deg' }] }]}>c</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 15 }, { rotate: '-1deg' }] }]}>k</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 15 }, { rotate: '-3deg' }] }]}>e</Text>
          <Text style={[styles.letter_program, { transform: [{ translateY: 14 }, { rotate: '-7deg' }] }]}>r</Text>
        </View>

        <View style={styles.waveContainer}>
          <Svg height="105" width="100%" viewBox="0 0 375 105" preserveAspectRatio="none">
            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58 L375,105 L0,105 Z" fill="transparent" stroke="#000000" strokeWidth="3.5" />
            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#0D072F" />
          </Svg>
        </View>
      </View>


      {/* Tab bar */}
      <View style={styles.tabBar}>
        {(['tracker', 'inventory'] as TrackerTab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && { color: activeProgram.color }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {activeTab === tab && (
              <View style={[styles.tabIndicator, { backgroundColor: activeProgram.color }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* TAB 1: TRACKER */}
        {activeTab === 'tracker' && (
          <View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryBox}>
                <Text style={[styles.summaryValue, { color: activeProgram.color }]}>— mL</Text>
                <Text style={styles.summaryLabel}>Ready to dispense{'\n'}Across all programs</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={[styles.summaryValue, { color: activeProgram.color }]}>— mL</Text>
                <Text style={styles.summaryLabel}>Pending approval{'\n'}— batches in lab</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Batches</Text>
              <TouchableOpacity>
                <Text style={[styles.sectionAction, { color: activeProgram.color }]}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No batches yet.</Text>
            </View>
          </View>
        )}

        {/* TAB 2: INVENTORY */}
        {activeTab === 'inventory' && (
          <View style={styles.inventoryGrid}>
            {[
              { label: 'Ready to Dispense', value: '— mL' },
              { label: 'Pending Approval', value: '— mL' },
              { label: 'Batches in Lab', value: '—' },
              { label: 'Batches Ready', value: '—' },
            ].map(tile => (
              <View key={tile.label} style={styles.inventoryTile}>
                <Text style={[styles.inventoryValue, { color: activeProgram.color }]}>
                  {tile.value}
                </Text>
                <Text style={styles.inventoryLabel}>{tile.label}</Text>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D072F' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },

  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.10)',
    marginHorizontal: 16,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, position: 'relative' },
  tabText: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.45)' },
  tabIndicator: { position: 'absolute', bottom: 0, left: 8, right: 8, height: 2, borderRadius: 2 },

  summaryRow: { flexDirection: 'row', padding: 16, gap: 12 },
  summaryBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 14,
  },
  summaryValue: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  summaryLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 16 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.45)',
  },
  sectionAction: { fontSize: 12, fontWeight: '600' },

  inventoryGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 12 },
  inventoryTile: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 16,
    alignItems: 'center',
  },
  inventoryValue: { fontSize: 22, fontWeight: '700', marginBottom: 6, textAlign: 'center' },
  inventoryLabel: { fontSize: 12, color: 'rgba(255,255,255,0.50)', textAlign: 'center' },

  labSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: 'rgba(255,255,255,0.45)',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },

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
