/**
 * (staff)/home.tsx
 * ----------------
 * The Staff Home / Dashboard screen.
 *
 * WHAT IT SHOWS:
 * - A header with "Home" title and the milk bank logo SVG
 * - Three colored buttons, one per program (Supsup Todo, Milky Way,
 *   Mother's Act). Tapping a button does two things:
 *     1. EXTERNAL — the header title color and bottom nav accent
 *        change to that program's color (via DatabaseContext)
 *     2. INTERNAL — Registry, Tracker, and Reports will now show
 *        data from that program's dataset (also via DatabaseContext)
 *
 * KEY REACT NATIVE CONCEPTS USED:
 * - SafeAreaView: keeps content away from notch / status bar
 * - ScrollView: lets the page scroll if the screen is short
 * - TouchableOpacity: a pressable element with opacity feedback
 * - StyleSheet.create: compile-time optimized styles for RN
 * - useDatabase(): reads/writes the active program from context
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg';
import { useDatabase, PROGRAMS } from '../../contexts/DatabaseContext';
import type { ProgramId } from '../../types/database.types';
import { TopBrandingSection } from './staffStyles';

const { width } = Dimensions.get('window');

export default function HomeScreen() {

  // Pull the active program and the setter from context
  const { activeProgram, setActiveProgram } = useDatabase();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/*
        StatusBar controls the phone's status bar style.
        "light-content" shows white text/icons on the dark header.
      */}
      <StatusBar barStyle="light-content" backgroundColor="#0D072F" />
      <View style={styles.headerContainer}>
        <View style={styles.patternBackgroundWrapper}>
          <ImageBackground
            source={require('../../assets/group119.png')}
            style={styles.headerImageBackground}
            resizeMode="cover"
          />
        </View>

        <View style={styles.curvedTitleContainer}>
          <Text style={[styles.letter, { transform: [{ translateY: 6 }, { rotate: '4deg' }] }]}>H</Text>
          <Text style={[styles.letter, { transform: [{ translateY: 10 }, { rotate: '2deg' }] }]}>o</Text>
          <Text style={[styles.letter, { transform: [{ translateY: 12 }, { rotate: '2deg' }] }]}>m</Text>
          <Text style={[styles.letter, { transform: [{ translateY: 12 }, { rotate: '-9deg' }] }]}>e</Text>
        </View>

        <View style={styles.waveContainer}>
          <Svg height="105" width="100%" viewBox="0 0 375 105" preserveAspectRatio="none">
            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58 L375,105 L0,105 Z" fill="transparent" stroke="#000000" strokeWidth="3.5" />
            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#ffffff" />
          </Svg>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* ── Header ─────────────────────────────────────────
            The title color animates to match the active program.
            We use inline style so it reacts to state changes.
        */}
        <View style={styles.header}>

          {/* Logo SVG from the existing global.tsx branding */}
          <View style={styles.logoWrap}>
            <Svg width="112" height="160" viewBox="-1 0 112 160" fill="none">
              <G clipPath="url(#clip0)">
                <Path
                  fill="#0D072F"
                  d="M102.658 103.987c5.131-3.283 1.031 14.995.688 16.184-.336 1.164-11.515 11.536-11.767 11.782.26-.245-9.052-15.046-12.313-13.595-3.252 1.448-4.591-9.562-4.6-9.635.05-.003 9.368-.497 9.299-2.528.025.002 13.566 1.075 18.693-2.208M36.074 126.735c3.747 4.49 6.092 9.874 6.434 15.02s-1.355 9.829-5.079 12.752-8.8 3.556-13.92 2.159c-5.118-1.397-10.06-4.742-13.807-9.233l-1.032-1.237 26.371-20.698z"
                />
                <Path
                  fill="#0D072F"
                  d="M74.246 109.135c-.983 4.207-4.526 9.006-8.987 12.38-4.46 3.374-8.946 11.412-7.33 14.883s6.276 7.488 11.089 7.266c4.812-.223 24.217-9.942 23.65-13.654-.566-3.712 2.097-8.072-9.21-10.438-11.309-2.365-8.229-14.643-9.212-10.437M34.862 137.461a56 56 0 0 1-6.628-10.503c-1.8-3.716-3.111-7.506-3.86-11.153-.75-3.648-.92-7.082-.505-10.106s1.411-5.578 2.928-7.518l5.988 7.479c-1.054 1.348-1.746 3.123-2.035 5.224s-.17 4.487.35 7.022c.521 2.534 1.432 5.167 2.683 7.749a39 39 0 0 0 4.605 7.298z"
                />
                <Path
                  fill="#D9D9D9"
                  d="m105.521 104.455-.255.029c.37 7.457-.152 11.651-1.06 14.415-.907 2.76-2.193 4.098-3.447 5.905l.208.126.209.126c1.217-1.755 2.577-3.187 3.515-6.041.936-2.849 1.455-7.112 1.084-14.589zm-4.554 20.475-.208-.126c-.413.595-1.179 1.404-2.17 2.317a54 54 0 0 1-3.449 2.889c-2.536 1.962-5.323 3.818-7.223 4.674l.093.221.094.22c1.962-.883 4.792-2.772 7.337-4.742a54 54 0 0 0 3.487-2.92c.996-.918 1.799-1.76 2.248-2.407z"
                />
                <G>
                  <Path
                    fill="#0D072F"
                    d="M94.984 127.511c.166.138.434.17.786.094s.781-.26 1.26-.538a11.6 11.6 0 0 0 1.519-1.079 16 16 0 0 0 1.52-1.436c.48-.514.91-1.042 1.264-1.55s.624-.984.793-1.4c.168-.415.232-.759.186-1.012a.52.52 0 0 0-.452-.452l-1.377 1.562a.306.306 0 0 1 .264.264c.026.147-.011.348-.109.59s-.256.52-.462.816a8 8 0 0 1-.737.903c-.28.3-.581.585-.886.838a7 7 0 0 1-.886.629c-.279.162-.53.269-.734.313-.206.045-.362.026-.459-.054z"
                  />
                </G>
                <Path
                  fill="#0D072F"
                  d="M31.116 64.023c9.376-5.433 19.783-8.07 29.944-7.588s19.634 4.062 27.257 10.302c7.622 6.24 13.064 14.868 15.656 24.825 1.229 4.72 1.789 9.641 1.691 14.622l-31.38 2.949q-.003.131-.008.262.013-.495.007-.987c7.15.34 13.654-4.176 14.875-10.566.409-2.143.174-4.24-.579-6.14a5.8 5.8 0 0 0 2.437-.357c1.495.654 3.534.814 5.173-.765l-.692-.718c-1.003.966-2.235 1.098-3.323.829.189-.155.354-.324.48-.507.186-.272.313-.608.258-.967-.056-.37-.288-.665-.61-.871-.314-.202-.735-.336-1.246-.413-.62-.094-1.134-.09-1.522.032-.415.13-.742.423-.795.874-.046.386.13.76.341 1.053.188.261.446.516.746.75a4.8 4.8 0 0 1-1.734-.008c-1.873-3.597-5.683-6.306-10.469-6.945-6.172-.824-12.086 2.046-14.834 6.74a19.2 19.2 0 0 0-6.613-1.491c-4.125-.196-8.35.873-12.156 3.079-3.806 2.205-7.029 5.45-9.273 9.336-2.243 3.885-3.41 8.244-3.357 12.54s1.323 8.341 3.655 11.641L9.01 146.586c-5.745-8.13-8.874-18.097-9.005-28.678-.13-10.58 2.743-21.317 8.27-30.888s13.465-17.564 22.842-22.997m40.918 54.785q-.027.058-.056.116zM89.83 88.919c.176-.055.511-.082 1.073.002.434.066.704.17.857.268.145.093.161.162.164.181.005.03.001.113-.094.251a1.8 1.8 0 0 1-.496.453q-.136.09-.296.17a5 5 0 0 1-.462-.29 3 3 0 0 1-.681-.648c-.138-.193-.16-.307-.161-.344a.4.4 0 0 1 .096-.043M52.702 48.412c13.199 0 23.9-10.838 23.9-24.206S65.9 0 52.701 0c-13.2 0-23.9 10.837-23.9 24.206s10.7 24.206 23.9 24.206" />
              </G>
              <Defs>
                <ClipPath id="clip0"><Path fill="#fff" d="M0 0h112v160H0z" /></ClipPath>
              </Defs>
            </Svg>
          </View>
        </View>

        {/* ── Program Selector Buttons ────────────────────────
            Loop over the PROGRAMS array and render one button each.
            The selected button gets a filled background; others are
            outlined/ghost style.
        */}
        <View style={styles.buttonList}>
          {PROGRAMS.map((program) => {
            const isActive = activeProgram.id === program.id;
            return (
              <TouchableOpacity
                key={program.id}
                style={[
                  styles.programBtn,
                  { backgroundColor: program.color },
                  // Selected: full opacity; not selected: muted
                  !isActive && styles.programBtnInactive,
                ]}
                onPress={() => setActiveProgram(program.id as ProgramId)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.programBtnText,
                    { color: program.textColor },
                    !isActive && styles.programBtnTextInactive,
                  ]}
                >
                  {program.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Hint text ────────────────────────────────────── */}
        <Text style={styles.hint}>
          Select a program to view its registry, tracker, and reports.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // ── Header ──
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  logoWrap: {
    marginBottom: 12,
  },
  title: {
    // Color is set dynamically via inline style above
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  // ── Program buttons ──
  buttonList: {
    paddingHorizontal: 32,
    gap: 16,
  },
  programBtn: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 6,
  },
  programBtnInactive: {
    // Dim non-selected buttons slightly
    opacity: 0.65,
  },
  programBtnText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  programBtnTextInactive: {
    opacity: 0.9,
  },

  // ── Hint ──
  hint: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 13,
    marginTop: 32,
    paddingHorizontal: 40,
    lineHeight: 20,
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


});
