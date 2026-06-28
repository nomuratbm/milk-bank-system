import React, { useRef, useState } from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView, StatusBar,
    StyleSheet, Image, ImageBackground, ScrollView,
    useWindowDimensions, Animated, Easing
} from 'react-native';
import { useRouter } from 'expo-router';

// Make sure to adjust these paths if needed
import motherBabyIcon from '@/assets/images/Group 13.png';
import homeBgImage from '@/assets/images/Home Page.png';
import unionSplashImage from '@/assets/images/Union.png';
import union1SplashImage from '@/assets/images/Union1.png';
import union2SplashImage from '@/assets/images/Union2.png';

const PROGRAM_COLORS = {
    supsupTodo: '#FFF280',
    milkyWay: '#D0F8EC',
    momsAct: '#FAD6EA',
    background: '#0B0826',
    textDark: '#1A1A1A'
};

const SelectProgram: React.FC = () => {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    // --- Animation State ---
    const [isAnimating, setIsAnimating] = useState(false);
    const [splashOrigin, setSplashOrigin] = useState({ x: 0, y: 0 });
    const [splashImageSource, setSplashImageSource] = useState<any>(unionSplashImage);
    const splashScale = useRef(new Animated.Value(0)).current;
    const splashRotation = useRef(new Animated.Value(0)).current;
    const splashOpacity = useRef(new Animated.Value(1)).current;

    // Button refs for measuring coordinates
    const supsupButtonRef = useRef<TouchableOpacity>(null);
    const milkyWayButtonRef = useRef<TouchableOpacity>(null);
    const momsActButtonRef = useRef<TouchableOpacity>(null);

    // Dynamically calculate sizes to fit any screen size
    const iconSize = isLandscape ? Math.min(height * 0.35, 140) : Math.min(width * 0.6, 240);
    const welcomeMarginBottom = isLandscape ? 15 : 40;
    const buttonWidth = isLandscape ? '50%' : '80%';

    // --- Generic Trigger Splash Animation ---
    const triggerSplashAnimation = (
        buttonRef: React.RefObject<TouchableOpacity>,
        imageSource: any,
        targetRoute: string
    ) => {
        const startAnimation = (centerX: number, centerY: number) => {
            setSplashOrigin({ x: centerX, y: centerY });
            setSplashImageSource(imageSource);
            setIsAnimating(true);
            splashOpacity.setValue(1);
            splashScale.setValue(0);
            splashRotation.setValue(0);

            Animated.parallel([
                // Scale the splash to cover the entire screen
                Animated.timing(splashScale, {
                    toValue: 45, // Scale it up 45x to cover the screen starting from the button
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                // Rotate the splash to give it a "swirling" effect
                Animated.timing(splashRotation, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                })
            ]).start(() => {
                // Navigate to target route
                router.push(targetRoute as any);

                // Optional: Reset the animation state after a slight delay
                // so it's ready if the user navigates back to this screen
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
            });
        };

        if (buttonRef.current) {
            buttonRef.current.measure((x, y, btnWidth, btnHeight, pageX, pageY) => {
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

    const handleSupsupPress = () => {
        triggerSplashAnimation(supsupButtonRef, unionSplashImage, '/(beneficiary)/home');
    };

    const handleMilkyWayPress = () => {
        triggerSplashAnimation(milkyWayButtonRef, union1SplashImage, '/(beneficiary)/home');
    };

    const handleMomsActPress = () => {
        triggerSplashAnimation(momsActButtonRef, union2SplashImage, '/(beneficiary)/home');
    };

    // Interpolate rotation value from 0-1 to degrees
    const rotate = splashRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1440deg']
    });

    return (
        <ImageBackground
            source={homeBgImage}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* --- Absolute Splash Overlay --- */}
            {isAnimating && (
                <View
                    style={[
                        styles.splashContainer,
                        {
                            left: splashOrigin.x - 50, // 50 is half of 100
                            top: splashOrigin.y - 50,  // 50 is half of 100
                        }
                    ]}
                    pointerEvents="none"
                >
                    <Animated.Image
                        source={splashImageSource}
                        style={[
                            styles.splashShape,
                            {
                                transform: [
                                    { scale: splashScale },
                                    { rotate: rotate }
                                ],
                                opacity: splashOpacity
                            }
                        ]}
                        resizeMode="contain"
                    />
                </View>
            )}

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContainer,
                        { paddingHorizontal: isLandscape ? 40 : 20 }
                    ]}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Center Mother & Baby Icon */}
                    <View style={[styles.iconContainer, { marginBottom: isLandscape ? 10 : 20 }]}>
                        <Image
                            source={motherBabyIcon}
                            style={{ width: iconSize, height: iconSize }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Welcome Heading */}
                    <Text style={[styles.welcomeText, { marginBottom: welcomeMarginBottom }]}>
                        Welcome!
                    </Text>

                    {/* 1. Supsup Todo Button */}
                    <TouchableOpacity
                        ref={supsupButtonRef}
                        style={[styles.button, { backgroundColor: PROGRAM_COLORS.supsupTodo, width: buttonWidth }]}
                        onPress={handleSupsupPress}
                        disabled={isAnimating} // Prevent multiple clicks
                    >
                        <Text style={styles.buttonText}>Supsup Todo</Text>
                    </TouchableOpacity>

                    {/* 2. Milky Way Button */}
                    <TouchableOpacity
                        ref={milkyWayButtonRef}
                        style={[styles.button, { backgroundColor: PROGRAM_COLORS.milkyWay, width: buttonWidth }]}
                        onPress={handleMilkyWayPress}
                        disabled={isAnimating}
                    >
                        <Text style={styles.buttonText}>Milky Way</Text>
                    </TouchableOpacity>

                    {/* 3. Mom's Act Button */}
                    <TouchableOpacity
                        ref={momsActButtonRef}
                        style={[styles.button, { backgroundColor: PROGRAM_COLORS.momsAct, width: buttonWidth }]}
                        onPress={handleMomsActPress}
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
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    // --- New Splash Styles ---
    splashContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashShape: {
        width: 100,
        height: 100,
    }
});

export default SelectProgram;