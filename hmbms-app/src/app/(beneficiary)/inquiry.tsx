import * as React from "react";
import { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Svg, { Path, Rect, G } from "react-native-svg";

interface InquiryScreenProps {
    onNavigateToQueue?: () => void;
    scrollToContact?: boolean;
    onContactScrolled?: () => void;
    mainScrollViewRef?: React.RefObject<ScrollView | null>;
}

const SupsupTodoDashboardEmailInquiry: React.FC<InquiryScreenProps> = ({
    onNavigateToQueue,
    scrollToContact,
    onContactScrolled,
    mainScrollViewRef
}) => {
    const [contactY, setContactY] = useState<number | null>(null);

    useEffect(() => {
        if (scrollToContact && contactY !== null && mainScrollViewRef?.current) {
            // Scroll to 115 + contactY (115 is top offset of the screen component in the parent ScrollView)
            // subtracting 20 gives a little breathing room/margin at the top.
            mainScrollViewRef.current.scrollTo({ y: 115 + contactY - 20, animated: true });
            if (onContactScrolled) {
                onContactScrolled();
            }
        }
    }, [scrollToContact, contactY, mainScrollViewRef]);

    const handleContactUsLayout = (event: any) => {
        setContactY(event.nativeEvent.layout.y);
    };

    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.scrollContent}>
                {/* Intro Headers */}
                <Text style={styles.mainHeading}>Request Milk for your Baby</Text>
                <Text style={styles.subHeading}>Get safe donor milk from the Makati Human Milk Bank.</Text>

                <Text style={styles.howItWorksHeading}>HOW IT WORKS</Text>

                {/* STEP 1 BOX */}
                <View style={styles.stepCard}>
                    <View style={styles.iconCircleContainer}>
                        <View style={styles.circleGraphicBackground} />
                        <View style={styles.iconWrapper}>
                            <Svg width="43" height="43" fill="none" viewBox="0 0 43 43">
                                <G stroke="#000000" strokeWidth="2.5">
                                    <Rect width="25.083" height="30.458" x="8.958" y="7.167" rx="2" />
                                    <Path
                                        d="M16.125 16.125h10.75M16.125 23.292h10.75M16.125 30.458h7.167"
                                        strokeLinecap="round"
                                    />
                                </G>
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.cardTextContent}>
                        <Text style={styles.stepLabel}>STEP 1</Text>
                        <Text style={styles.stepTitle}>Submit an inquiry</Text>
                        <Text style={styles.stepDescription}>Fill out the form below to register.</Text>
                    </View>
                </View>

                {/* STEP 2 BOX */}
                <View style={styles.stepCard}>
                    <View style={styles.iconCircleContainer}>
                        <View style={styles.circleGraphicBackground} />
                        <View style={styles.iconWrapper}>
                            <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.cardTextContent}>
                        <Text style={styles.stepLabel}>STEP 2</Text>
                        <Text style={styles.stepTitle}>Get notified</Text>
                        <Text style={styles.stepDescription}>You’ll be placed in a queue and receive an email once milk becomes available.</Text>
                    </View>
                </View>

                {/* STEP 3 BOX */}
                <View style={styles.stepCard}>
                    <View style={styles.iconCircleContainer}>
                        <View style={styles.circleGraphicBackground} />
                        <View style={styles.iconWrapper}>
                            <Svg width="36" height="36" fill="none" viewBox="0 0 40 40">
                                <G
                                    stroke="#000000"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                >
                                    <Path d="M28.333 17.5S30 21.667 30 27.083c0 1.952-.216 3.742-.493 5.233-.348 1.874-.522 2.81-1.449 3.58-.926.77-2.03.77-4.238.77h-7.64c-2.208 0-3.312 0-4.238-.77s-1.1-1.706-1.449-3.58A29 29 0 0 1 10 27.083c0-5.416 1.667-9.583 1.667-9.583" />
                                    <Path d="M11.665 17.518h16.667c.246-1.36-.131-3.981-3.4-5.018-.775-.246-1.684-.706-2.093-1.48-.362-.686-.531-1.614.011-2.644 1.004-1.905.035-4.242-2.048-4.897A2.8 2.8 0 0 0 20 3.333c-.29-.002-.581.058-.86.145-2.083.656-3.051 2.993-2.047 4.898.542 1.03.373 1.958.01 2.643-.396.75-1.26 1.417-2.064 1.672-2.255.716-3.809 2.422-3.373 4.827M25 23.333h4.167M25 30h4.167" />
                                </G>
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.cardTextContent}>
                        <Text style={styles.stepLabel}>STEP 3</Text>
                        <Text style={styles.stepTitle}>Receive donor milk</Text>
                        <Text style={styles.stepDescription}>Claim your milk.</Text>
                    </View>
                </View>

                {/* YELLOW READY TO PROCEED CTA BANNER */}
                <View style={styles.ctaBannerContainer}>
                    <View style={styles.ctaTextContainer}>
                        <Text style={styles.ctaLabel}>READY TO PROCEED?</Text>
                        <Text style={styles.ctaTitle}>Order Milk</Text>
                        <Text style={styles.ctaDescription}>Tap to place your request.</Text>
                    </View>

                    {/* Wrapped the arrow circle inside a touch handler targeting your forms function route trigger */}
                    <TouchableOpacity
                        style={styles.ctaArrowCircle}
                        activeOpacity={0.7}
                        onPress={onNavigateToQueue}
                    >
                        <Svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                            <Path
                                fill="#0F172A"
                                d="M2.7.031C1.868-.114 1.03.254.507.994S-.145 2.732.17 3.608L4.327 15.18c.476 1.325 1.622 2.192 2.895 2.192h12.272c1.293 0 2.34 1.176 2.34 2.627s-1.047 2.626-2.34 2.626H7.223c-1.273 0-2.419.868-2.895 2.193L.17 36.392c-.315.876-.186 1.874.337 2.614.524.74 1.361 1.108 2.193.963 13.627-2.376 26.086-8.708 36.415-17.912.56-.499.885-1.256.885-2.057s-.326-1.558-.885-2.057C28.786 8.74 16.327 2.407 2.7.031"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>

                {/* FORM HEADER */}
                <Text style={styles.contactFormTitle} onLayout={handleContactUsLayout}>Contact us!</Text>

                {/* INPUT GROUPS */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput style={styles.textInput} placeholder="Enter your first name" placeholderTextColor="#B3B3B3" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput style={styles.textInput} placeholder="Enter your last name" placeholderTextColor="#B3B3B3" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput style={styles.textInput} placeholder="Enter your email address" placeholderTextColor="#B3B3B3" keyboardType="email-address" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Inquiry</Text>
                    <TextInput
                        style={[styles.textInput, styles.textAreaInput]}
                        placeholder="Enter Inquiry"
                        placeholderTextColor="#B3B3B3"
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                </View>

                {/* SUBMIT BUTTON */}
                <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 0,
        marginTop: -8,
        paddingBottom: 40,
    },
    mainHeading: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 6,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333333',
        marginBottom: 24,
    },
    howItWorksHeading: {
        fontSize: 18,
        fontWeight: '500',
        fontStyle: 'italic',
        color: '#000000',
        marginBottom: 16,
    },
    stepCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    iconCircleContainer: {
        position: 'relative',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    circleGraphicBackground: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 241, 146, 0.5)',
    },
    iconWrapper: {
        position: 'absolute',
        zIndex: 5,
    },
    cardTextContent: {
        flex: 1,
    },
    stepLabel: {
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'italic',
        color: '#666666',
        marginBottom: 2,
    },
    stepTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 13,
        fontWeight: '300',
        color: '#444444',
        lineHeight: 17,
    },
    ctaBannerContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFD230',
        borderWidth: 1,
        borderColor: '#1E1E1E',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 32,
    },
    ctaTextContainer: {
        flex: 1,
    },
    ctaLabel: {
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'italic',
        color: '#000000',
        marginBottom: 2,
    },
    ctaTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 4,
    },
    ctaDescription: {
        fontSize: 13,
        fontWeight: '300',
        color: '#000000',
    },
    ctaArrowCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        paddingLeft: 7,
        paddingTop: 1,
    },
    contactFormTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 16,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '300',
        color: '#000000',
        marginBottom: 6,
    },
    textInput: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#FFFFFF',
    },
    textAreaInput: {
        height: 120,
        paddingTop: 12,
        paddingBottom: 12,
    },
    submitButton: {
        width: '100%',
        height: 48,
        backgroundColor: '#FFD230',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E1E1E',
    },
});

export default SupsupTodoDashboardEmailInquiry;