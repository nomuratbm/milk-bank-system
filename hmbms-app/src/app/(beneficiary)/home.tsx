import React, { useState } from 'react';
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
import Svg, { Path } from 'react-native-svg';

// Import ALL separate file modules safely
import InquiryScreen from './inquiry';
import QueueScreen from './queue';     // Bound to Navbar Paper/Receipt tab icon
import FormsScreen from './forms';     // Bound to Inquiry Arrow shortcut link block
import ProfileScreen from './profile';

const { width } = Dimensions.get('window');
type ScreenType = 'home' | 'inquiry' | 'queue' | 'forms' | 'profile';

const HomeScreen: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

    // Dynamic Header Title Layout Component (LOCKED ARCH CODES)
    const renderHeaderTitle = () => {
        switch (currentScreen) {
            case 'home':
                return (
                    <View style={styles.curvedTitleContainer}>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '4deg' }] }]}>H</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '2deg' }] }]}>o</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-4deg' }] }]}>m</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 1.7 }, { rotate: '-9deg' }] }]}>e</Text>
                    </View>
                );
            case 'inquiry':
                return (
                    <View style={styles.curvedTitleContainer}>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '4deg' }] }]}>I</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '3deg' }] }]}>n</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '1deg' }] }]}>q</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-1deg' }] }]}>u</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4.5 }, { rotate: '-3deg' }] }]}>i</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '-5deg' }] }]}>r</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 6.5 }, { rotate: '-8deg' }] }]}>y</Text>
                    </View>
                );
            case 'queue':
                return (
                    <View style={styles.curvedTitleContainer}>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '4deg' }] }]}>Q</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '2deg' }] }]}>u</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-1deg' }] }]}>e</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-4deg' }] }]}>u</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4.5 }, { rotate: '-7deg' }] }]}>e</Text>
                    </View>
                );
            case 'forms':
                return (
                    <View style={styles.curvedTitleContainer}>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '4deg' }] }]}>F</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '2deg' }] }]}>o</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-1deg' }] }]}>r</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-4deg' }] }]}>m</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4.5 }, { rotate: '-7deg' }] }]}>s</Text>
                    </View>
                );
            case 'profile':
                return (
                    <View style={styles.curvedTitleContainer}>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '4deg' }] }]}>P</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '2deg' }] }]}>r</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '0deg' }] }]}>o</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4 }, { rotate: '-3deg' }] }]}>f</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 4.5 }, { rotate: '-5deg' }] }]}>i</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5 }, { rotate: '-7deg' }] }]}>l</Text>
                        <Text style={[styles.letter, { transform: [{ translateY: 5.5 }, { rotate: '-9deg' }] }]}>e</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    const renderScreenContent = () => {
        switch (currentScreen) {
            case 'inquiry':
                return <InquiryScreen onNavigateToQueue={() => setCurrentScreen('forms')} />;
            case 'queue':
                return <QueueScreen />;
            case 'forms':
                return <FormsScreen />;
            case 'profile':
                return <ProfileScreen />;
            case 'home':
            default:
                return (
                    <View style={styles.centerContainer}>
                        <Text style={styles.screenTitle}>Welcome Home Dashboard</Text>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF192" />

            {/* Single Scrolling Container Flow */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Header Container Area */}
                <View style={styles.headerContainer}>
                    <View style={styles.patternBackgroundWrapper}>
                        <ImageBackground
                            source={require('../../assets/group119.png')}
                            style={styles.headerImageBackground}
                            resizeMode="cover"
                        />
                    </View>

                    {renderHeaderTitle()}

                    {/* Wavy Mask Guard Layer */}
                    <View style={styles.waveContainer}>
                        <Svg height="105" width="100%" viewBox="0 0 375 105" preserveAspectRatio="none">
                            <Path d="M0,58 C 93.75 14, 281.25 84, 375 58 L375,105 L0,105 Z" fill="transparent" stroke="#000000" strokeWidth="3.5" />
                            <Path d="M0,59 C 93.75 15, 281.25 85, 375 59 L375,105 L0,105 Z" fill="#FFFFFF" />
                        </Svg>
                    </View>
                </View>

                {/* Sub-screen content wrapper */}
                <View style={styles.subScreenWrapper}>
                    {renderScreenContent()}
                </View>
            </ScrollView>

            {/* Bottom Menu Navigation Panel */}
            <View style={styles.navBar}>

                {/* Home Nav Button */}
                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('home')}>
                    {currentScreen === 'home' ? (
                        <View style={styles.activeIconCircle}>
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

                {/* Inquiry / Message Nav Button */}
                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('inquiry')}>
                    {/* Added currentScreen === 'forms' condition here so the menu circle highlights the message envelope during shortcut screens */}
                    {currentScreen === 'inquiry' || currentScreen === 'forms' ? (
                        <View style={styles.activeIconCircle}>
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

                {/* Queue / Paper Icon Nav Button */}
                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('queue')}>
                    {currentScreen === 'queue' ? (
                        <View style={styles.activeIconCircle}>
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

                {/* Profile / User Nav Button */}
                <TouchableOpacity style={styles.navItem} activeOpacity={0.8} onPress={() => setCurrentScreen('profile')}>
                    {currentScreen === 'profile' ? (
                        <View style={styles.activeIconCircle}>
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
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        height: 150,
        backgroundColor: '#FFF192',
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
        color: '#000000',
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
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    subScreenWrapper: {
        marginTop: -35,
        paddingTop: 35,
        backgroundColor: '#FFFFFF',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
        backgroundColor: '#FFFFFF',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D265C',
    },
    navBar: {
        flexDirection: 'row',
        height: 85,
        backgroundColor: '#FFF192',
        borderTopWidth: 2,
        borderColor: '#000000',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 15,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        width: '100%',
    },
    navItem: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeIconCircle: {
        width: 72,
        height: 72,
        backgroundColor: '#FFF192',
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

export default HomeScreen;