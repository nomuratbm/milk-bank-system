// LandingScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
// Import shared layouts and styles from global.tsx
import { globalStyles, TopBrandingSection } from './global';

const LandingScreen: React.FC = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Pristine centralized header artwork */}
            <TopBrandingSection />

            {/* Bottom Content Selection Section */}
            <ScrollView
                style={globalStyles.landingBottomSection}
                contentContainerStyle={globalStyles.landingScrollContent}
            >
                <Text style={globalStyles.headlineText}>
                    {"Select your role to continue"}
                </Text>

                {/* Staff Selection Card */}
                <TouchableOpacity
                    style={globalStyles.card}
                    activeOpacity={0.7}
                    onPress={() => router.push('/loginStaff')}
                >
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/4ype0svv_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={globalStyles.cardImage}
                    />
                    <View style={globalStyles.cardTextContainer}>
                        <Text style={globalStyles.cardTitle}>{"Staff"}</Text>
                        <Text style={globalStyles.cardSubtitle}>{"Organization employees"}</Text>
                    </View>
                </TouchableOpacity>

                {/* Beneficiary Selection Card */}
                <TouchableOpacity
                    style={globalStyles.card}
                    activeOpacity={0.7}
                    onPress={() => router.push('/loginBeneficiary')}
                >
                    <Image
                        source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/08vvo9rh_expires_30_days.png" }}
                        resizeMode={"stretch"}
                        style={globalStyles.cardImage}
                    />
                    <View style={globalStyles.cardTextContainer}>
                        <Text style={globalStyles.cardTitle}>{"Beneficiary"}</Text>
                        <Text style={globalStyles.cardSubtitle}>{"Individuals receiving services"}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LandingScreen;