// src/app/(beneficiary)/home.tsx
import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    StatusBar, Dimensions, ScrollView, ImageBackground,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';

import InquiryScreen from './inquiry';
import QueueScreen from './queue';
import FormsScreen from './forms';
import ProfileScreen from './profile';

const { width } = Dimensions.get('window');
type ScreenType = 'home' | 'inquiry' | 'queue' | 'forms' | 'profile';

const HomeScreen: React.FC = () => {
    const theme = useTheme();
    const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

    // Styles that depend on the theme are built here so they react to programId changes
    const dynStyles = dynamicStyles(theme.primary, theme.tabIconActive);

    const renderHeaderTitle = () => {
        const letters: Record<ScreenType, { char: string; y: number; r: string }[]> = {
            home:    [{ char: 'H', y: 5, r: '4deg' }, { char: 'o', y: 5, r: '2deg' }, { char: 'm', y: 4, r: '-4deg' }, { char: 'e', y: 1.7, r: '-9deg' }],
            inquiry: [{ char: 'I', y: 5, r: '4deg' }, { char: 'n', y: 5, r: '3deg' }, { char: 'q', y: 4, r: '1deg' }, { char: 'u', y: 4, r: '-1deg' }, { char: 'i', y: 4.5, r: '-3deg' }, { char: 'r', y: 5, r: '-5deg' }, { char: 'y', y: 6.5, r: '-8deg' }],
            queue:   [{ char: 'Q', y: 5, r: '4deg' }, { char: 'u', y: 5, r: '2deg' }, { char: 'e', y: 4, r: '-1deg' }, { char: 'u', y: 4, r: '-4deg' }, { char: 'e', y: 4.5, r: '-7deg' }],
            forms:   [{ char: 'F', y: 5, r: '4deg' }, { char: 'o', y: 5, r: '2deg' }, { char: 'r', y: 4, r: '-1deg' }, { char: 'm', y: 4, r: '-4deg' }, { char: 's', y: 4.5, r: '-7deg' }],
            profile: [{ char: 'P', y: 5, r: '4deg' }, { char: 'r', y: 5, r: '2deg' }, { char: 'o', y: 4, r: '0deg' }, { char: 'f', y: 4, r: '-3deg' }, { char: 'i', y: 4.5, r: '-5deg' }, { char: 'l', y: 5, r: '-7deg' }, { char: 'e', y: 5.5, r: '-9deg' }],
        };
        return (
            <View style={styles.curvedTitleContainer}>
                {letters[currentScreen].map((l, i) => (
                    <Text
                        key={i}
                        style={[styles.letter, { color: theme.headerText, transform: [{ translateY: l.y }, { rotate: l.r }] }]}
                    >
                        {l.char}
                    </Text>
                ))}
            </View>
        );
    };

    const renderScreenContent = () => {
        switch (currentScreen) {
            case 'inquiry': return <InquiryScreen onNavigateToQueue={() => setCurrentScreen('forms')} />;
            case 'queue':   return <QueueScreen />;
            case 'forms':   return <FormsScreen />;
            case 'profile': return <ProfileScreen />;
            default:
                return (
                    <View style={styles.centerContainer}>
                        <Text style={styles.screenTitle}>Welcome Home Dashboard</Text>
                    </View>
                );
        }
    };

    const navItems: { key: ScreenType; icon: (active: boolean) => React.ReactNode }[] = [
        {
            key: 'home',
            icon: (active) => active
                ? <View style={dynStyles.activeIconCircle}><Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={theme.tabIconActive} strokeWidth="2.5"><Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" fill="#FFFFFF" /><Path d="M9 21V11h6v10" strokeLinejoin="round" /></Svg></View>
                : <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5"><Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" /><Path d="M9 21V11h6v10" strokeLinejoin="round" /></Svg>,
        },
        {
            key: 'inquiry',
            icon: (active) => (active || currentScreen === 'forms')
                ? <View style={dynStyles.activeIconCircle}><Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={theme.tabIconActive} strokeWidth="2.5"><Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round" fill="#FFFFFF" /><Path d="M22 6l-10 7L2 6" strokeLinejoin="round" /></Svg></View>
                : <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5"><Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round" /><Path d="M22 6l-10 7L2 6" strokeLinejoin="round" /></Svg>,
        },
        {
            key: 'queue',
            icon: (active) => active
                ? <View style={dynStyles.activeIconCircle}><Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={theme.tabIconActive} strokeWidth="2.5"><Path d="M4 2h11l5 4v14l-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1V2z" strokeLinejoin="round" fill="#FFFFFF" /><Path d="M15 2v4h5" strokeLinejoin="round" /><Path d="M8 10h4M8 14h6" strokeLinecap="round" /></Svg></View>
                : <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5"><Path d="M4 2h11l5 4v14l-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1V2z" strokeLinejoin="round" /><Path d="M15 2v4h5" strokeLinejoin="round" /><Path d="M8 10h4M8 14h6" strokeLinecap="round" /></Svg>,
        },
        {
            key: 'profile',
            icon: (active) => active
                ? <View style={dynStyles.activeIconCircle}><Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={theme.tabIconActive} strokeWidth="2.5"><Path d="M20 21v-1.5A3.5 3.5 0 0 0 16.5 16h-9A3.5 3.5 0 0 0 4 19.5V21" strokeLinecap="round" fill="#FFFFFF" /><Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></Svg></View>
                : <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5"><Path d="M20 21v-1.5A3.5 3.5 0 0 0 16.5 16h-9A3.5 3.5 0 0 0 4 19.5V21" strokeLinecap="round" /><Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></Svg>,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.primary} />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
                            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58 L375,105 L0,105 Z" fill="transparent" stroke="#000000" strokeWidth="3.5" />
                            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#FFFFFF" />
                        </Svg>
                    </View>
                </View>

                <View style={styles.subScreenWrapper}>
                    {renderScreenContent()}
                </View>
            </ScrollView>

            <View style={dynStyles.navBar}>
                {navItems.map(({ key, icon }) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.navItem}
                        activeOpacity={0.8}
                        onPress={() => setCurrentScreen(key)}
                    >
                        {icon(currentScreen === key)}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

// Static styles — no theme dependency
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    headerContainer: { height: 150, position: 'relative', overflow: 'hidden', zIndex: 10 },
    patternBackgroundWrapper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '65%' },
    headerImageBackground: { width: '100%', height: '100%' },
    curvedTitleContainer: {
        flexDirection: 'row', position: 'absolute',
        right: width * 0.055, bottom: 50, zIndex: 12, alignItems: 'flex-start',
    },
    letter: { fontSize: 50, fontWeight: '700', fontFamily: 'System', letterSpacing: -2 },
    waveContainer: { position: 'absolute', bottom: -2, left: 0, right: 0, zIndex: 11 },
    content: { flex: 1, backgroundColor: '#FFFFFF' },
    subScreenWrapper: { marginTop: -35, paddingTop: 35, backgroundColor: '#FFFFFF' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 80, backgroundColor: '#FFFFFF' },
    screenTitle: { fontSize: 24, fontWeight: 'bold', color: '#1D265C' },
    navItem: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },
});

// Dynamic styles — rebuilt when theme changes
const dynamicStyles = (primary: string, tabIconActive: string) => StyleSheet.create({
    navBar: {
        flexDirection: 'row', height: 85, backgroundColor: primary,
        borderTopWidth: 2, borderColor: '#000000',
        justifyContent: 'space-around', alignItems: 'center',
        paddingBottom: 15, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, width: '100%',
    },
    activeIconCircle: {
        width: 72, height: 72, backgroundColor: primary,
        borderRadius: 36, borderWidth: 2, borderColor: '#000000',
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute', top: -30,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1, shadowRadius: 4, elevation: 4,
    },
});

export default HomeScreen;
