import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const SupsupTodoDashboardEmailInquiry = () => {
    return (
        <View style={styles.scrollContent}>
            {/* Intro Headers */}
            <Text style={styles.mainHeading}>Request Milk for your Baby</Text>
            <Text style={styles.subHeading}>Get safe donor milk from the Makati Human Milk Bank.</Text>

            <Text style={styles.howItWorksHeading}>HOW IT WORKS</Text>

            {/* STEP 1 BOX */}
            <View style={styles.stepCard}>
                <View style={styles.iconCircleContainer}>
                    <View style={styles.circleGraphicBackground} />
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                        <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
                        <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinejoin="round" />
                    </Svg>
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
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                        <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" strokeLinejoin="round" strokeLinecap="round" />
                    </Svg>
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
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                        <Path d="M9 11h6v10H9V11zM10 7.5a2 2 0 0 1 4 0V11h-4V7.5zM12 2v3" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
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
                <View style={styles.ctaArrowCircle}>
                    <Svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1D265C" strokeWidth="2.5">
                        <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinejoin="round" strokeLinecap="round" />
                    </Svg>
                </View>
            </View>

            {/* FORM HEADER */}
            <Text style={styles.contactFormTitle}>Contact us!</Text>

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
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    mainHeading: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: '#000000',
        marginBottom: 6,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '300',
        fontFamily: 'Inter-Light',
        color: '#333333',
        marginBottom: 24,
    },
    howItWorksHeading: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
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
        backgroundColor: '#FFF192',
        opacity: 0.6,
    },
    cardTextContent: {
        flex: 1,
    },
    stepLabel: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
        fontStyle: 'italic',
        color: '#666666',
        marginBottom: 2,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: '#000000',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 11,
        fontWeight: '300',
        fontFamily: 'Inter-Light',
        color: '#444444',
        lineHeight: 15,
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
        fontFamily: 'Inter-Medium',
        fontStyle: 'italic',
        color: '#000000',
        marginBottom: 2,
    },
    ctaTitle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: '#000000',
        marginBottom: 4,
    },
    ctaDescription: {
        fontSize: 11,
        fontWeight: '300',
        fontFamily: 'Inter-Light',
        color: '#000000',
    },
    ctaArrowCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
    },
    contactFormTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
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
        fontFamily: 'Inter-Light',
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