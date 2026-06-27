// welcome.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
// Import shared layouts and styles from global.tsx
import { globalStyles, TopBrandingSection } from './global';

const WelcomeScreen: React.FC = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Pristine centralized header artwork */}
            <TopBrandingSection />

            {/* Bottom Section - Pulls merged properties from global sheet */}
            <View style={globalStyles.welcomeBottomSection}>
                <View style={globalStyles.contentContainer}>
                    <Text style={globalStyles.welcomeText}>{"Welcome to Makati Milk Bank"}</Text>

                    <Text style={globalStyles.descriptionText}>
                        {"Connecting donors, staff, and beneficiaries\nacross Makati's milk bank programs"}
                    </Text>
                </View>

                <TouchableOpacity
                    style={globalStyles.welcomeButton}
                    activeOpacity={0.8}
                    onPress={() => router.push('/landing')}
                >
                    <Text style={globalStyles.welcomeButtonText}>{"Get Started"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;