import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles, THEME_TOKENS, TopBrandingSection } from './globalStyles';

const ForgotPasswordPreInputBeneficiary: React.FC = () => {
    const router = useRouter();
    const theme = THEME_TOKENS.beneficiary;
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <TopBrandingSection />
            <ScrollView style={[globalStyles.bottomSection, { backgroundColor: theme.primaryBg }]} contentContainerStyle={globalStyles.scrollContent}>
                <View style={globalStyles.textContainer}>
                    <Text style={globalStyles.forgotPasswordTitle}>{"Forgot Password"}</Text>
                    <Text style={globalStyles.letUsHelpText}>{"Let us help you by entering your email below!"}</Text>
                </View>

                <View style={globalStyles.inputGroupLarge}>
                    <Text style={globalStyles.inputLabel}>{"Email Address"}</Text>
                    <TextInput placeholder={"Enter your email address"} placeholderTextColor="#B3B3B380" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={globalStyles.textInput} />
                </View>

                <View style={globalStyles.buttonContainerShort}>
                    <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor: theme.accent }]} activeOpacity={0.8} onPress={() => router.push('/completeBeneficiary')}>
                        <Text style={[globalStyles.actionButtonText, { color: theme.buttonText }]}>{"Send Email"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.buttonContainerShort}>
                    <TouchableOpacity style={globalStyles.backButton} activeOpacity={0.7} onPress={() => router.push('/loginBeneficiary')}>
                        <Text style={globalStyles.backButtonText}>{"Back to login"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default ForgotPasswordPreInputBeneficiary;