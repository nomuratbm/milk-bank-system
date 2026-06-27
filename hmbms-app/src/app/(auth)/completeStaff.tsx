import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { globalStyles, THEME_TOKENS, TopBrandingSection } from './globalStyles';

const ForgotPasswordSuccessfullySentStaff: React.FC = () => {
    const router = useRouter();
    const theme = THEME_TOKENS.staff;

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <TopBrandingSection />
            <ScrollView style={[globalStyles.bottomSection, { backgroundColor: theme.primaryBg }]} contentContainerStyle={globalStyles.scrollContentCentered}>
                <Text style={globalStyles.forgotPasswordTitle}>{"Forgot Password"}</Text>

                <View style={globalStyles.iconContainer}>
                    <Svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                        <Circle cx="70" cy="70" r="66" stroke={theme.accent} strokeWidth="4" />
                        <Path d="M45 72 L62 89 L95 52" stroke={theme.accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </View>

                <Text style={globalStyles.successStatusText}>
                    {"A link has been successfully\nsent to your email!"}
                </Text>

                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.backButton} activeOpacity={0.7} onPress={() => router.push('/loginStaff')}>
                        <Text style={globalStyles.backButtonText}>{"Back to login"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default ForgotPasswordSuccessfullySentStaff;