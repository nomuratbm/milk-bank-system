// src/app/(beneficiary)/home.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
    StatusBar, Dimensions, ScrollView, ImageBackground, Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { supabase } from '../../lib/supabase';
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
    const [shouldScrollToContact, setShouldScrollToContact] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const [queuePosition, setQueuePosition] = useState<number | null>(null);
    const [estimatedWaitDays, setEstimatedWaitDays] = useState<number | null>(null);

    useEffect(() => {
        if (currentScreen !== 'home') return;
        const fetchQueueData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: request } = await (supabase as any)
                        .from('milk_requests')
                        .select('queue_position, estimated_wait_days')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false })
                        .limit(1)
                        .maybeSingle();
                    if (request) {
                        setQueuePosition(request.queue_position);
                        setEstimatedWaitDays(request.estimated_wait_days);
                    }
                }
            } catch (err) {
                console.error('Error fetching home queue data:', err);
            }
        };
        fetchQueueData();
    }, [currentScreen]);

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
                    <Text key={i} style={[styles.letter, { transform: [{ translateY: l.y }, { rotate: l.r }] }]}>
                        {l.char}
                    </Text>
                ))}
            </View>
        );
    };

    const renderScreenContent = () => {
        switch (currentScreen) {
            case 'inquiry':
                return (
                    <InquiryScreen
                        onNavigateToQueue={() => setCurrentScreen('forms')}
                        scrollToContact={shouldScrollToContact}
                        onContactScrolled={() => setShouldScrollToContact(false)}
                        mainScrollViewRef={scrollViewRef}
                    />
                );
            case 'queue':
                return (
                    <QueueScreen
                        onNavigateToInquiry={() => {
                            setShouldScrollToContact(true);
                            setCurrentScreen('inquiry');
                        }}
                    />
                );
            case 'forms':
                return (
                    <FormsScreen
                        onNavigateToInquiry={() => {
                            setShouldScrollToContact(true);
                            setCurrentScreen('inquiry');
                        }}
                    />
                );
            case 'profile':
                return <ProfileScreen />;
            default:
                return (
                    <View style={styles.homeContainer}>
                        <Text style={styles.sectionHeading}>Quick Update!</Text>
                        <View style={styles.updateCard}>
                            <Text style={styles.cardTextBold}>
                                Queue Position:   {queuePosition !== null ? queuePosition : '- -'}
                            </Text>
                            <Text style={[styles.cardTextRegular, { marginBottom: 4 }]}>
                                Your order has been processed.
                            </Text>
                            <Text style={styles.cardTextRegular}>
                                Estimated Wait Time: {estimatedWaitDays !== null ? `${estimatedWaitDays} days.` : '--'}
                            </Text>
                        </View>
                        <Text style={styles.aboutHeading}>About us!</Text>
                        <Image
                            source={require('../../../assets/images/Group 13.png')}
                            style={styles.aboutLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.aboutText}>
                            At Milk Bank System, we believe that every drop counts. Our System is a purpose-built platform designed to streamline the complex, day-to-day operations of human milk banks. Our mission is to bridge the gap between generous donors and the vulnerable infants who need it most, ensuring that life-saving milk is processed, tracked, and delivered with absolute precision and care.{"\n\n"}
                            Managing a milk bank requires rigorous safety standards and flawless logistics. We created Milk Bank System to centralize those needs into one secure, intuitive system, empowering healthcare professionals to focus on saving lives rather than managing paperwork.
                        </Text>
                    </View>
                );
        }
    };

    // Dynamic styles built from theme
    const dynStyles = dynamicStyles(theme.primary);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.primary} />

            <ScrollView ref={scrollViewRef} style={styles.content} showsVerticalScrollIndicator={false}>
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
                    {renderScreenContent()}
                </View>
            </ScrollView>

            <View style={dynStyles.navBar}>
                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('home')}>
                    {currentScreen === 'home' ? (
                        <View style={dynStyles.activeIconCircle}>
                            <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                                <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" fill="#FFFFFF" />
                                <Path d="M9 21V11h6v10" strokeLinejoin="round" />
                            </Svg>
                        </View>
                    ) : (
                        <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" />
                            <Path d="M9 21V11h6v10" strokeLinejoin="round" />
                        </Svg>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('inquiry')}>
                    {currentScreen === 'inquiry' || currentScreen === 'forms' ? (
                        <View style={dynStyles.activeIconCircle}>
                            <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                                <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round" fill="#FFFFFF" />
                                <Path d="M22 6l-10 7L2 6" strokeLinejoin="round" />
                            </Svg>
                        </View>
                    ) : (
                        <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round" />
                            <Path d="M22 6l-10 7L2 6" strokeLinejoin="round" />
                        </Svg>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('queue')}>
                    {currentScreen === 'queue' ? (
                        <View style={dynStyles.activeIconCircle}>
                            <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                                <Path d="M4 2h11l5 4v14l-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1V2z" strokeLinejoin="round" fill="#FFFFFF" />
                                <Path d="M15 2v4h5" strokeLinejoin="round" />
                                <Path d="M8 10h4M8 14h6" strokeLinecap="round" />
                            </Svg>
                        </View>
                    ) : (
                        <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <Path d="M4 2h11l5 4v14l-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1V2z" strokeLinejoin="round" />
                            <Path d="M15 2v4h5" strokeLinejoin="round" />
                            <Path d="M8 10h4M8 14h6" strokeLinecap="round" />
                        </Svg>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('profile')}>
                    {currentScreen === 'profile' ? (
                        <View style={dynStyles.activeIconCircle}>
                            <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                                <Path d="M20 21v-1.5A3.5 3.5 0 0 0 16.5 16h-9A3.5 3.5 0 0 0 4 19.5V21" strokeLinecap="round" fill="#FFFFFF" />
                                <Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                            </Svg>
                        </View>
                    ) : (
                        <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <Path d="M20 21v-1.5A3.5 3.5 0 0 0 16.5 16h-9A3.5 3.5 0 0 0 4 19.5V21" strokeLinecap="round" />
                            <Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                        </Svg>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    headerContainer: { height: 150, position: 'relative', overflow: 'hidden', zIndex: 10 },
    patternBackgroundWrapper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '65%' },
    headerImageBackground: { width: '100%', height: '100%' },
    curvedTitleContainer: { flexDirection: 'row', position: 'absolute', right: width * 0.055, bottom: 50, zIndex: 12, alignItems: 'flex-start' },
    letter: { fontSize: 50, fontWeight: '700', color: '#000000', fontFamily: 'System', letterSpacing: -2 },
    waveContainer: { position: 'absolute', bottom: -2, left: 0, right: 0, zIndex: 11 },
    content: { flex: 1, backgroundColor: '#FFFFFF' },
    subScreenWrapper: { marginTop: -35, paddingTop: 35, backgroundColor: '#FFFFFF' },
    navItem: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    homeContainer: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40 },
    sectionHeading: { fontSize: 22, fontWeight: '700', color: '#000000', marginTop: 20, marginBottom: 12 },
    updateCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 12, padding: 18, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
    cardTextBold: { fontSize: 16, fontWeight: '700', color: '#000000', marginBottom: 8 },
    cardTextRegular: { fontSize: 14, color: '#333333', lineHeight: 18 },
    aboutHeading: { fontSize: 28, fontWeight: '700', color: '#000000', textAlign: 'center', marginTop: 28, marginBottom: 16 },
    aboutLogo: { width: 140, height: 140, alignSelf: 'center', marginVertical: 16 },
    aboutText: { fontSize: 15, color: '#000000', textAlign: 'center', lineHeight: 22, fontWeight: '500', paddingHorizontal: 8, marginBottom: 24 },
});

const dynamicStyles = (primary: string) => StyleSheet.create({
    navBar: { flexDirection: 'row', height: 85, backgroundColor: primary, borderTopWidth: 2, borderColor: '#000000', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, width: '100%' },
    activeIconCircle: { width: 72, height: 72, backgroundColor: primary, borderRadius: 36, borderWidth: 2, borderColor: '#000000', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -30, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
});

export default HomeScreen;