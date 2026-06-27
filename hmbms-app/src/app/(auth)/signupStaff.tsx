import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles, THEME_TOKENS, TopBrandingSection } from './globalStyles';

const SignupStaff: React.FC = () => {
    const router = useRouter();
    const theme = THEME_TOKENS.staff;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <SafeAreaView style={globalStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <TopBrandingSection />
            <ScrollView style={[globalStyles.bottomSection, { backgroundColor: theme.primaryBg }]} contentContainerStyle={globalStyles.scrollContent}>
                <View style={globalStyles.headerRow}>
                    <Text style={globalStyles.signUpTitle}>{"Sign Up"}</Text>
                    <View style={[globalStyles.badgeContainer, { backgroundColor: theme.badgeBg }]}>
                        <Image source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png" }} resizeMode={"stretch"} style={globalStyles.badgeImage} />
                        <Text style={globalStyles.badgeText}>{"Staff Signup"}</Text>
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
                    <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor: theme.accent }, !isAgreed && globalStyles.actionButtonDisabled]} disabled={!isAgreed} onPress={() => router.push('/(onboarding)/select-program')}>
                        <Text style={[globalStyles.actionButtonText, { color: theme.buttonText }]}>{"Sign Up"}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={globalStyles.redirectContainer} onPress={() => router.push('/loginStaff')}>
                    <Text style={globalStyles.redirectText}>{"Already have an account? "} <Text style={globalStyles.boldText}>{"Login"}</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
export default SignupStaff;