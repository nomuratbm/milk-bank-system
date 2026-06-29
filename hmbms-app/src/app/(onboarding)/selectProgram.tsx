// src/app/(onboarding)/selectProgram.tsx
import React, { useRef, useState } from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView, StatusBar,
    StyleSheet, Image, ImageBackground, ScrollView,
    useWindowDimensions, Animated, Easing, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const motherBabyIcon   = require('../../../assets/images/Group 13.png');
const homeBgImage      = require('../../../assets/images/Home Page.png');
const unionSplashImage  = require('../../../assets/images/Union.png');
const union1SplashImage = require('../../../assets/images/Union1.png');
const union2SplashImage = require('../../../assets/images/Union2.png');

const PROGRAM_COLORS = {
    supsupTodo: '#FFF280',
    milkyWay:   '#D0F8EC',
    momsAct:    '#FAD6EA',
    background: '#0B0826',
    textDark:   '#1A1A1A',
};

const PROGRAM_IDS = {
    supsupTodo: 1,
    milkyWay:   2,
    momsAct:    3,
} as const;

const SelectProgram: React.FC = () => {
    const router = useRouter();
    const { session, refreshProfile } = useAuth();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const [isAnimating, setIsAnimating] = useState(false);
    const [splashOrigin, setSplashOrigin] = useState({ x: 0, y: 0 });
    const [splashImageSource, setSplashImageSource] = useState<any>(unionSplashImage);
    const splashScale    = useRef(new Animated.Value(0)).current;
    const splashRotation = useRef(new Animated.Value(0)).current;
    const splashOpacity  = useRef(new Animated.Value(1)).current;

    const supsupButtonRef   = useRef<TouchableOpacity>(null);
    const milkyWayButtonRef = useRef<TouchableOpacity>(null);
    const momsActButtonRef  = useRef<TouchableOpacity>(null);

    const iconSize            = isLandscape ? Math.min(height * 0.35, 140) : Math.min(width * 0.6, 240);
    const welcomeMarginBottom = isLandscape ? 15 : 40;
    const buttonWidth         = isLandscape ? '50%' : '80%';

const saveProgramAndNavigate = async (programId: 1 | 2 | 3) => {
    if (!session?.user) return;

    const { error } = await supabase
        .from('beneficiaries')
        .upsert({
            id: session.user.id,
            program_id: programId,
            first_name: session.user.user_metadata?.full_name?.split(' ')[0] ?? '',
            last_name: session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') ?? '',
            email: session.user.email ?? null,
        } as any, { onConflict: 'id' });

    if (error) {
        splashScale.setValue(0);
        splashRotation.setValue(0);
        setIsAnimating(false);
        Alert.alert('Error', 'Could not save your program selection. Please try again.');
        return;
    }

    await refreshProfile?.();

    router.replace('/(beneficiary)/home');

    setTimeout(() => {
        Animated.timing(splashOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            }).start(() => {
            splashScale.setValue(0);
            splashRotation.setValue(0);
            setIsAnimating(false);
        });
    }, 500);
    };

    const triggerSplashAnimation = (
        buttonRef: React.RefObject<TouchableOpacity>,
        imageSource: any,
        programId: 1 | 2 | 3,
    ) => {
        const startAnimation = (centerX: number, centerY: number) => {
            setSplashOrigin({ x: centerX, y: centerY });
            setSplashImageSource(imageSource);
            setIsAnimating(true);
            splashOpacity.setValue(1);
            splashScale.setValue(0);
            splashRotation.setValue(0);

            Animated.parallel([
                Animated.timing(splashScale, {
                    toValue: 45,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(splashRotation, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                saveProgramAndNavigate(programId);
            });
        };

        if (buttonRef.current) {
            (buttonRef.current as any).measure((
                x: number, 
                y: number, 
                btnWidth: number, 
                btnHeight: number, 
                pageX: number, 
                pageY: number
            ) => {
                if (typeof pageX === 'number' && typeof pageY === 'number') {
                startAnimation(pageX + btnWidth / 2, pageY + btnHeight / 2);
                } else {
                    startAnimation(width / 2, height / 2);
                }
            });
            } else {
                startAnimation(width / 2, height / 2);
            }
        };

    const rotate = splashRotation.interpolate({
        inputRange:  [0, 1],
        outputRange: ['0deg', '1440deg'],
    });

    return (
        <ImageBackground
            source={homeBgImage}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {isAnimating && (
                <View
                    style={[
                        styles.splashContainer,
                        { left: splashOrigin.x - 50, top: splashOrigin.y - 50 },
                    ]}
                    pointerEvents="none"
                >
                    <Animated.Image
                        source={splashImageSource}
                        style={[
                            styles.splashShape,
                            {
                                transform: [{ scale: splashScale }, { rotate }],
                                opacity: splashOpacity,
                            },
                        ]}
                        resizeMode="contain"
                    />
                </View>
            )}

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContainer,
                        { paddingHorizontal: isLandscape ? 40 : 20 },
                    ]}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.iconContainer, { marginBottom: isLandscape ? 10 : 20 }]}>
                        <Image
                            source={motherBabyIcon}
                            style={{ width: iconSize, height: iconSize }}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={[styles.welcomeText, { marginBottom: welcomeMarginBottom }]}>
                        Welcome!
                    </Text>

                    <TouchableOpacity
                        ref={supsupButtonRef}
                        style={[styles.button, { backgroundColor: PROGRAM_COLORS.supsupTodo, width: buttonWidth }]}
                        onPress={() => triggerSplashAnimation(supsupButtonRef, unionSplashImage, PROGRAM_IDS.supsupTodo)}
                        disabled={isAnimating}
                    >
                        <Text style={styles.buttonText}>Supsup Todo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        ref={milkyWayButtonRef}
                        style={[styles.button, { backgroundColor: PROGRAM_COLORS.milkyWay, width: buttonWidth }]}
                        onPress={() => triggerSplashAnimation(milkyWayButtonRef, union1SplashImage, PROGRAM_IDS.milkyWay)}
                        disabled={isAnimating}
                    >
                        <Text style={styles.buttonText}>Milky Way</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        ref={momsActButtonRef}
                        style={[styles.button, { backgroundColor: PROGRAM_COLORS.momsAct, width: buttonWidth }]}
                        onPress={() => triggerSplashAnimation(momsActButtonRef, union2SplashImage, PROGRAM_IDS.momsAct)}
                        disabled={isAnimating}
                    >
                        <Text style={styles.buttonText}>Mom's Act</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: PROGRAM_COLORS.background,
    },
    safeArea: { flex: 1 },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    iconContainer: { alignItems: 'center', justifyContent: 'center' },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    button: {
        paddingVertical: 18,
        borderRadius: 30,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
    },
    buttonText: {
        color: PROGRAM_COLORS.textDark,
        fontSize: 16,
        fontWeight: '700',
    },
    splashContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashShape: { width: 100, height: 100 },
});

export default SelectProgram;