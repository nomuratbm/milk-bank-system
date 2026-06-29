// src/app/(staff)/home.tsx
import React, { useState, useRef } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    StatusBar, Dimensions, ScrollView, ImageBackground,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { ProgramId } from '../../types/database.types';
import RegistryScreen from './registry';
import TrackerScreen from './tracker';
import ReportsScreen from './reports';

const { width } = Dimensions.get('window');

type TabType = 'home' | 'registry' | 'tracker' | 'reports';

const PROGRAMS: { id: ProgramId; label: string }[] = [
    { id: 1, label: 'Supsup Todo' },
    { id: 2, label: 'Milky Way' },
    { id: 3, label: "Mom's Act" },
];

const StaffHomeScreen: React.FC = () => {
    const { signOut } = useAuth();
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeTab, setActiveTab] = useState<TabType>('home');
    const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(1);

    const theme = PROGRAM_THEMES[selectedProgramId];

    const handleSignOut = async () => {
        await signOut();
        router.replace('/landing');
    };

    // Curved letter title — matches beneficiary home exactly
    const TITLE_LETTERS: Record<TabType, { char: string; y: number; r: string }[]> = {
        home:     [{ char: 'H', y: 5, r: '4deg' }, { char: 'o', y: 5, r: '2deg' }, { char: 'm', y: 4, r: '-4deg' }, { char: 'e', y: 1.7, r: '-9deg' }],
        registry: [{ char: 'R', y: 5, r: '4deg' }, { char: 'e', y: 5, r: '2deg' }, { char: 'g', y: 4, r: '0deg' }, { char: 'i', y: 4, r: '-2deg' }, { char: 's', y: 4, r: '-4deg' }, { char: 't', y: 4.5, r: '-6deg' }, { char: 'r', y: 5, r: '-7deg' }, { char: 'y', y: 6.5, r: '-9deg' }],
        tracker:  [{ char: 'T', y: 5, r: '4deg' }, { char: 'r', y: 5, r: '2deg' }, { char: 'a', y: 4, r: '0deg' }, { char: 'c', y: 4, r: '-2deg' }, { char: 'k', y: 4, r: '-4deg' }, { char: 'e', y: 4.5, r: '-6deg' }, { char: 'r', y: 5.5, r: '-8deg' }],
        reports:  [{ char: 'R', y: 5, r: '4deg' }, { char: 'e', y: 5, r: '2deg' }, { char: 'p', y: 4, r: '0deg' }, { char: 'o', y: 4, r: '-2deg' }, { char: 'r', y: 4, r: '-4deg' }, { char: 't', y: 4.5, r: '-6deg' }, { char: 's', y: 5.5, r: '-8deg' }],
    };

    const renderHeaderTitle = () => (
        <View style={styles.curvedTitleContainer}>
            {TITLE_LETTERS[activeTab].map((l, i) => (
                <Text key={i} style={[styles.letter, { transform: [{ translateY: l.y }, { rotate: l.r }] }]}>
                    {l.char}
                </Text>
            ))}
        </View>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'registry':
                return <RegistryScreen programId={selectedProgramId} />;
            case 'tracker':
                return <TrackerScreen programId={selectedProgramId} />;
            case 'reports':
                return <ReportsScreen programId={selectedProgramId} />;
            default:
                return (
                    <View style={styles.homeContainer}>
                        {/* Program selector */}
                        <Text style={styles.sectionHeading}>Select Program</Text>
                        <View style={styles.programRow}>
                            {PROGRAMS.map((p) => {
                                const t = PROGRAM_THEMES[p.id];
                                const isSelected = selectedProgramId === p.id;
                                return (
                                    <TouchableOpacity
                                        key={p.id}
                                        style={[
                                            styles.programChip,
                                            { backgroundColor: t.primary },
                                            isSelected && styles.programChipSelected,
                                        ]}
                                        onPress={() => setSelectedProgramId(p.id)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[styles.programChipText, { color: t.headerText }]}>
                                            {p.label}
                                        </Text>
                                        {isSelected && (
                                            <View style={[styles.programChipDot, { backgroundColor: t.headerText }]} />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Quick nav cards */}
                        <Text style={styles.sectionHeading}>Quick Nav</Text>
                        <View style={styles.quickNavGrid}>
                            {([
                                { tab: 'registry' as TabType, label: 'Registry', path: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
                                { tab: 'tracker' as TabType,  label: 'Tracker',  path: 'M3 3h18v18H3zM3 9h18M9 21V9' },
                                { tab: 'reports' as TabType,  label: 'Reports',  path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8' },
                            ]).map(({ tab, label, path }) => (
                                <TouchableOpacity
                                    key={tab}
                                    style={[styles.quickNavCard, { borderColor: theme.primary }]}
                                    onPress={() => setActiveTab(tab)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.quickNavIconCircle, { backgroundColor: theme.primary }]}>
                                        <Svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <Path d={path} />
                                        </Svg>
                                    </View>
                                    <Text style={styles.quickNavLabel}>{label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Sign out */}
                        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    const dynStyles = dynamicStyles(theme.primary);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.primary} />

            <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header — identical structure to beneficiary home */}
                <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
                    <View style={styles.patternBackgroundWrapper}>
                        <ImageBackground
                            source={require('../../../assets/images/group119.png')}
                            style={styles.headerImageBackground}
                            resizeMode="cover"
                        />
                    </View>
                    {renderHeaderTitle()}
                    <View style={styles.waveContainer}>
                        <Svg height="105" width="100%" viewBox="0 0 375 105" preserveAspectRatio="none">
                            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58" fill="none" stroke="#000000" strokeWidth="3.5" />
                            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#FFFFFF" />
                        </Svg>
                    </View>
                </View>

                <View style={styles.subScreenWrapper}>
                    {renderContent()}
                </View>
            </ScrollView>

            {/* Nav bar — identical structure to beneficiary home */}
            <View style={dynStyles.navBar}>
                {([
                    {
                        tab: 'home' as TabType,
                        activePath:   'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z',
                        activePath2:  'M9 21V11h6v10',
                        inactivePath: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z',
                        inactivePath2:'M9 21V11h6v10',
                    },
                    {
                        tab: 'registry' as TabType,
                        activePath:   'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
                        activePath2:  'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
                        inactivePath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
                        inactivePath2:'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
                    },
                    {
                        tab: 'tracker' as TabType,
                        activePath:   'M3 3h18v18H3z',
                        activePath2:  'M3 9h18M9 21V9',
                        inactivePath: 'M3 3h18v18H3z',
                        inactivePath2:'M3 9h18M9 21V9',
                    },
                    {
                        tab: 'reports' as TabType,
                        activePath:   'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
                        activePath2:  'M14 2v6h6M16 13H8M16 17H8M10 9H8',
                        inactivePath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
                        inactivePath2:'M14 2v6h6M16 13H8M16 17H8M10 9H8',
                    },
                ]).map(({ tab, activePath, activePath2, inactivePath, inactivePath2 }) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={styles.navItem}
                            activeOpacity={0.8}
                            onPress={() => setActiveTab(tab)}
                        >
                            {isActive ? (
                                <View style={dynStyles.activeIconCircle}>
                                    <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                                        <Path d={activePath} strokeLinejoin="round" fill="#FFFFFF" />
                                        <Path d={activePath2} strokeLinejoin="round" />
                                    </Svg>
                                </View>
                            ) : (
                                <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                                    <Path d={inactivePath} strokeLinejoin="round" />
                                    <Path d={inactivePath2} strokeLinejoin="round" />
                                </Svg>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const dynamicStyles = (primary: string) => StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        height: 85,
        backgroundColor: primary,
        borderTopWidth: 2,
        borderColor: '#000000',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        width: '100%',
    },
    activeIconCircle: {
        width: 72,
        height: 72,
        backgroundColor: primary,
        borderRadius: 36,
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
});

const styles = StyleSheet.create({
    container:               { flex: 1, backgroundColor: '#FFFFFF' },
    content:                 { flex: 1, backgroundColor: '#FFFFFF' },
    headerContainer:         { height: 150, position: 'relative', overflow: 'hidden', zIndex: 10 },
    patternBackgroundWrapper:{ position: 'absolute', top: 0, left: 0, width: '100%', height: '65%' },
    headerImageBackground:   { width: '100%', height: '100%' },
    curvedTitleContainer:    { flexDirection: 'row', position: 'absolute', right: width * 0.055, bottom: 50, zIndex: 12, alignItems: 'flex-start' },
    letter:                  { fontSize: 50, fontWeight: '700', color: '#000000', letterSpacing: -2 },
    waveContainer:           { position: 'absolute', bottom: -2, left: 0, right: 0, zIndex: 11 },
    subScreenWrapper:        { marginTop: -35, paddingTop: 35, backgroundColor: '#FFFFFF' },
    navItem:                 { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },

    homeContainer:   { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },
    sectionHeading:  { fontSize: 22, fontWeight: '700', color: '#000000', marginTop: 20, marginBottom: 12 },

    programRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
    programChip: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 10,
        borderRadius: 24, gap: 6,
    },
    programChipSelected: {
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15, shadowRadius: 4, elevation: 4,
    },
    programChipText: { fontSize: 14, fontWeight: '700' },
    programChipDot:  { width: 7, height: 7, borderRadius: 4 },

    quickNavGrid: { flexDirection: 'row', gap: 12, marginBottom: 36 },
    quickNavCard: {
        flex: 1, alignItems: 'center', paddingVertical: 20,
        borderRadius: 16, borderWidth: 2, backgroundColor: '#FFFFFF',
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    },
    quickNavIconCircle: {
        width: 52, height: 52, borderRadius: 26,
        justifyContent: 'center', alignItems: 'center', marginBottom: 10,
    },
    quickNavLabel: { fontSize: 12, fontWeight: '700', color: '#000000' },

    signOutButton: {
        alignSelf: 'center', paddingHorizontal: 40, paddingVertical: 12,
        borderRadius: 24, borderWidth: 1.5, borderColor: '#CCCCCC', marginTop: 8,
    },
    signOutText: { fontSize: 14, fontWeight: '700', color: '#B30000' },
});

export default StaffHomeScreen;