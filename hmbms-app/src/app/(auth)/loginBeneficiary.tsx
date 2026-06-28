import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles, THEME_TOKENS, TopBrandingSection } from './globalStyles';
import { supabase } from '../../lib/supabase';

const LoginBeneficiary: React.FC = () => {
    const router = useRouter();
    const theme = THEME_TOKENS.beneficiary;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });
            if (error) {
                Alert.alert("Login Failed", error.message);
            }
        } catch (err: any) {
            Alert.alert("Error", err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

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
                    <TouchableOpacity 
                        style={[globalStyles.actionButton, { backgroundColor: theme.accent }]} 
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={theme.buttonText} />
                        ) : (
                            <Text style={[globalStyles.actionButtonText, { color: theme.buttonText }]}>{"Login"}</Text>
                        )}
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