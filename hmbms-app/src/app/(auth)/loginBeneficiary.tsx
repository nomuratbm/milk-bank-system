import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles, THEME_TOKENS, TopBrandingSection } from './globalStyles';

const LoginBeneficiary: React.FC = () => {
    const router = useRouter();
    const theme = THEME_TOKENS.beneficiary;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <TopBrandingSection />
            <ScrollView style={[globalStyles.bottomSection, { backgroundColor: theme.primaryBg }]} contentContainerStyle={globalStyles.scrollContent}>
                <View style={globalStyles.headerRow}>
                    <Text style={globalStyles.loginTitle}>{"Login"}</Text>
                    <View style={[globalStyles.badgeContainer, { backgroundColor: theme.badgeBg }]}>
                        <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png" }} resizeMode={"stretch"} style={globalStyles.badgeImage} />
                        <Text style={globalStyles.badgeText}>{"Beneficiary Login"}</Text>
                    </View>
                </View>

                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.inputLabel}>{"Email"}</Text>
                    <TextInput placeholder={"Enter your email"} placeholderTextColor="#B3B3B380" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={globalStyles.textInput} />
                </View>
                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.inputLabel}>{"Password"}</Text>
                    <TextInput placeholder={"Enter your password"} placeholderTextColor="#B3B3B380" value={password} onChangeText={setPassword} secureTextEntry={true} style={globalStyles.textInput} />
                </View>

                <TouchableOpacity style={globalStyles.forgotPasswordContainer} onPress={() => router.push('/forgotBeneficiaryPass')}>
                    <Text style={globalStyles.forgotPasswordText}>{"Forgot password?"}</Text>
                </TouchableOpacity>

                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor: theme.accent }]} onPress={() => router.push('/(onboarding)/select-program')}>
                        <Text style={[globalStyles.actionButtonText, { color: theme.buttonText }]}>{"Login"}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={globalStyles.redirectContainer} onPress={() => router.push('/signupBeneficiary')}>
                    <Text style={globalStyles.redirectUnderlineText}>{"New here? Sign Up Here"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default LoginBeneficiary;