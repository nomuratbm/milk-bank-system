import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles, THEME_TOKENS, TopBrandingSection } from './globalStyles';
import { supabase } from '../../lib/supabase';

const SignupBeneficiary: React.FC = () => {
    const router = useRouter();
    const theme = THEME_TOKENS.beneficiary;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!fullName.trim() || !email.trim() || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (!isAgreed) {
            Alert.alert("Error", "You must agree to the Terms and Conditions.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email: email.trim(),
                password: password,
                options: {
                    data: {
                        account_type: "beneficiary",
                        full_name: fullName.trim(),
                    }
                }
            });

            if (error) {
                Alert.alert("Signup Failed", error.message);
            } else {
                Alert.alert("Success", "Account created! Please check your email inbox to verify your account or complete onboarding.");
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
                    <Text style={globalStyles.signUpTitle}>{"Sign Up"}</Text>
                    <View style={[globalStyles.badgeContainer, { backgroundColor: theme.badgeBg }]}>
                        <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png" }} resizeMode={"stretch"} style={globalStyles.badgeImage} />
                        <Text style={globalStyles.badgeText}>{"Beneficiary Signup"}</Text>
                    </View>
                </View>

                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.inputLabel}>{"Full Name"}</Text>
                    <TextInput placeholder={"Enter your full name"} placeholderTextColor="#B3B3B380" value={fullName} onChangeText={setFullName} style={globalStyles.textInput} />
                </View>
                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.inputLabel}>{"Email"}</Text>
                    <TextInput placeholder={"Enter your email"} placeholderTextColor="#B3B3B380" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={globalStyles.textInput} />
                </View>
                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.inputLabel}>{"Mobile Number"}</Text>
                    <TextInput placeholder={"Enter your mobile number"} placeholderTextColor="#B3B3B380" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" style={globalStyles.textInput} />
                </View>
                <View style={globalStyles.inputGroup}>
                    <Text style={globalStyles.inputLabel}>{"Password"}</Text>
                    <TextInput placeholder={"Enter your password"} placeholderTextColor="#B3B3B380" value={password} onChangeText={setPassword} secureTextEntry={true} style={globalStyles.textInput} />
                </View>

                <TouchableOpacity style={globalStyles.checkboxRow} activeOpacity={0.8} onPress={() => setIsAgreed(!isAgreed)}>
                    <View style={[globalStyles.checkbox, isAgreed && { backgroundColor: theme.accent, borderColor: theme.accent }]}>
                        {isAgreed && <View style={[globalStyles.checkboxCheck, { backgroundColor: theme.primaryBg }]} />}
                    </View>
                    <Text style={globalStyles.termsText}>{"I agree with the Terms and Conditions and Privacy Policy"}</Text>
                </TouchableOpacity>

                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity 
                        style={[globalStyles.actionButton, { backgroundColor: theme.accent }]} 
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={theme.buttonText} />
                        ) : (
                            <Text style={[globalStyles.actionButtonText, { color: theme.buttonText }]}>{"Sign Up"}</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={globalStyles.redirectContainer} onPress={() => router.push('/loginBeneficiary')}>
                    <Text style={globalStyles.redirectText}>{"Already have an account? "} <Text style={globalStyles.boldText}>{"Login"}</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default SignupBeneficiary;