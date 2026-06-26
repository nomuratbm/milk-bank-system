import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';
import Svg, { Path, G, ClipPath, Defs } from 'react-native-svg';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const signupStaff: React.FC = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Top Branding Section */}
            <View style={styles.topSection}>
                <View style={styles.logoContainer}>
                    {/* High-Fidelity SVG "Mother and Child" Graphic */}
                    <Svg width="109" height="160" viewBox="0 0 109 160" fill="none">
                        <G clipPath="url(#clip0)">
                            <Path
                                fill="#0D072F"
                                d="M102.658 103.987c5.131-3.283 1.031 14.995.688 16.184-.336 1.164-11.515 11.536-11.767 11.782.26-.245-9.052-15.046-12.313-13.595-3.252 1.448-4.591-9.562-4.6-9.635.05-.003 9.368-.497 9.299-2.528.025.002 13.566 1.075 18.693-2.208M36.074 126.735c3.747 4.49 6.092 9.874 6.434 15.02s-1.355 9.829-5.079 12.752-8.8 3.556-13.92 2.159c-5.118-1.397-10.06-4.742-13.807-9.233l-1.032-1.237 26.371-20.698z"
                            />
                            <Path
                                fill="#0D072F"
                                d="M74.246 109.135c-.983 4.207-4.526 9.006-8.987 12.38-4.46 3.374-8.946 11.412-7.33 14.883s6.276 7.488 11.089 7.266c4.812-.223 24.217-9.942 23.65-13.654-.566-3.712 2.097-8.072-9.21-10.438-11.309-2.365-8.229-14.643-9.212-10.437M34.862 137.461a56 56 0 0 1-6.628-10.503c-1.8-3.716-3.111-7.506-3.86-11.153-.75-3.648-.92-7.082-.505-10.106s1.411-5.578 2.928-7.518l5.988 7.479c-1.054 1.348-1.746 3.123-2.035 5.224s-.17 4.487.35 7.022c.521 2.534 1.432 5.167 2.683 7.749a39 39 0 0 0 4.605 7.298z"
                            />
                            <Path
                                fill="#D9D9D9"
                                d="m105.521 104.455-.255.029c.37 7.457-.152 11.651-1.06 14.415-.907 2.76-2.193 4.098-3.447 5.905l.208.126.209.126c1.217-1.755 2.577-3.187 3.515-6.041.936-2.849 1.455-7.112 1.084-14.589zm-4.554 20.475-.208-.126c-.413.595-1.179 1.404-2.17 2.317a54 54 0 0 1-3.449 2.889c-2.536 1.962-5.323 3.818-7.223 4.674l.093.221.094.22c1.962-.883 4.792-2.772 7.337-4.742a54 54 0 0 0 3.487-2.92c.996-.918 1.799-1.76 2.248-2.407z"
                            />
                            <G>
                                <Path
                                    fill="#0D072F"
                                    d="M94.984 127.511c.166.138.434.17.786.094s.781-.26 1.26-.538a11.6 11.6 0 0 0 1.519-1.079 16 16 0 0 0 1.52-1.436c.48-.514.91-1.042 1.264-1.55s.624-.984.793-1.4c.168-.415.232-.759.186-1.012a.52.52 0 0 0-.452-.452l-1.377 1.562a.306.306 0 0 1 .264.264c.026.147-.011.348-.109.59s-.256.52-.462.816a8 8 0 0 1-.737.903c-.28.3-.581.585-.886.838a7 7 0 0 1-.886.629c-.279.162-.53.269-.734.313-.206.045-.362.026-.459-.054z"
                                />
                            </G>
                            <Path
                                fill="#0D072F"
                                d="M31.116 64.023c9.376-5.433 19.783-8.07 29.944-7.588s19.634 4.062 27.257 10.302c7.622 6.24 13.064 14.868 15.656 24.825 1.229 4.72 1.789 9.641 1.691 14.622l-31.38 2.949q-.003.131-.008.262.013-.495.007-.987c7.15.34 13.654-4.176 14.875-10.566.409-2.143.174-4.24-.579-6.14a5.8 5.8 0 0 0 2.437-.357c1.495.654 3.534.814 5.173-.765l-.692-.718c-1.003.966-2.235 1.098-3.323.829.189-.155.354-.324.48-.507.186-.272.313-.608.258-.967-.056-.37-.288-.665-.61-.871-.314-.202-.735-.336-1.246-.413-.62-.094-1.134-.09-1.522.032-.415.13-.742.423-.795.874-.046.386.13.76.341 1.053.188.261.446.516.746.75a4.8 4.8 0 0 1-1.734-.008c-1.873-3.597-5.683-6.306-10.469-6.945-6.172-.824-12.086 2.046-14.834 6.74a19.2 19.2 0 0 0-6.613-1.491c-4.125-.196-8.35.873-12.156 3.079-3.806 2.205-7.029 5.45-9.273 9.336-2.243 3.885-3.41 8.244-3.357 12.54s1.323 8.341 3.655 11.641L9.01 146.586c-5.745-8.13-8.874-18.097-9.005-28.678-.13-10.58 2.743-21.317 8.27-30.888s13.465-17.564 22.842-22.997m40.918 54.785q-.027.058-.056.116zM89.83 88.919c.176-.055.511-.082 1.073.002.434.066.704.17.857.268.145.093.161.162.164.181.005.03.001.113-.094.251a1.8 1.8 0 0 1-.496.453q-.136.09-.296.17a5 5 0 0 1-.462-.29 3 3 0 0 1-.681-.648c-.138-.193-.16-.307-.161-.344a.4.4 0 0 1 .096-.043M52.702 48.412c13.199 0 23.9-10.838 23.9-24.206S65.9 0 52.701 0c-13.2 0-23.9 10.837-23.9 24.206s10.7 24.206 23.9 24.206"
                            />
                        </G>
                        <Defs>
                            <ClipPath id="clip0">
                                <Path fill="#fff" d="M0 0h109v160H0z" />
                            </ClipPath>
                        </Defs>
                    </Svg>
                </View>

                {/* Wave Divider */}
                <View style={styles.waveContainer}>
                    <Svg
                        height="100"
                        width={width}
                        viewBox={`0 0 ${width} 100`}
                        style={styles.waveSvg}
                        preserveAspectRatio="none"
                    >
                        <Path
                            d={`M0 50 C ${width * 0.25} 10, ${width * 0.75} 90, ${width} 50 L${width} 100 L0 100 Z`}
                            fill="#0D072F"
                        />
                    </Svg>
                </View>
            </View>

            {/* Content Form Body */}
            <ScrollView style={styles.bottomSection} contentContainerStyle={styles.scrollContent}>

                {/* Header title block */}
                <View style={styles.headerRow}>
                    <Text style={styles.signUpTitle}>{"Sign Up"}</Text>
                    <View style={styles.badgeContainer}>
                        <Image
                            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/78bLcHxrTT/2jpqab9q_expires_30_days.png" }}
                            resizeMode={"stretch"}
                            style={styles.badgeImage}
                        />
                        <Text style={styles.badgeText}>{"Staff Login"}</Text>
                    </View>
                </View>

                {/* Input 1: Full Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{"Full Name"}</Text>
                    <TextInput
                        placeholder={"Enter your full name"}
                        placeholderTextColor="#B3B3B380"
                        value={fullName}
                        onChangeText={setFullName}
                        style={styles.textInput}
                    />
                </View>

                {/* Input 2: Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{"Email"}</Text>
                    <TextInput
                        placeholder={"Enter your email"}
                        placeholderTextColor="#B3B3B380"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.textInput}
                    />
                </View>

                {/* Input 3: Mobile Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{"Mobile Number"}</Text>
                    <TextInput
                        placeholder={"Enter your mobile number"}
                        placeholderTextColor="#B3B3B380"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        keyboardType="phone-pad"
                        style={styles.textInput}
                    />
                </View>

                {/* Input 4: Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{"Password"}</Text>
                    <TextInput
                        placeholder={"Enter your password"}
                        placeholderTextColor="#B3B3B380"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </View>

                {/* Terms and Conditions Interactive Checkbox */}
                <TouchableOpacity
                    style={styles.checkboxRow}
                    activeOpacity={0.8}
                    onPress={() => setIsAgreed(!isAgreed)}
                >
                    <View style={[styles.checkbox, isAgreed && styles.checkboxActive]}>
                        {isAgreed && <View style={styles.checkboxCheck} />}
                    </View>
                    <Text style={styles.termsText}>
                        {"I agree with the Terms and Conditions and Privacy Policy"}
                    </Text>
                </TouchableOpacity>

                {/* Registration Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.registerButton, !isAgreed && styles.registerButtonDisabled]}
                        disabled={!isAgreed}
                        onPress={() => router.push('/(onboarding)/select-program')}
                    >
                        <Text style={styles.registerButtonText}>{"Sign Up"}</Text>
                    </TouchableOpacity>
                </View>

                {/* Existing Membership entry hyperlink */}
                <TouchableOpacity
                    style={styles.loginRedirectContainer}
                    onPress={() => router.push('/(auth)/loginStaff')}
                >
                    <Text style={styles.loginRedirectText}>
                        {"Already have an account? "}
                        <Text style={styles.boldText}>{"Login"}</Text>
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    topSection: {
        height: height * 0.32,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    logoContainer: {
        marginTop: 10,
        marginBottom: 35,
        alignItems: 'center',
    },
    waveContainer: {
        position: 'absolute',
        bottom: -1,
        width: '100%',
    },
    waveSvg: {
        width: '100%',
    },
    bottomSection: {
        flex: 1,
        backgroundColor: '#0D072F',
    },
    scrollContent: {
        paddingHorizontal: 32,
        paddingTop: 15,
        paddingBottom: 48,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
    },
    signUpTitle: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
    },
    badgeContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#10103A",
        borderColor: "#FFFDFD4F",
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    badgeImage: {
        borderRadius: 30,
        width: 16,
        height: 13,
        marginRight: 5,
    },
    badgeText: {
        color: "#B3B3B3",
        fontSize: 10,
        fontWeight: "700",
    },
    inputGroup: {
        marginBottom: 20,
        width: '100%',
    },
    inputLabel: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },
    textInput: {
        color: "#1E1E1E",
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        borderColor: "#D9D9D9",
        borderRadius: 8,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 32,
        width: '100%',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        backgroundColor: 'transparent',
    },
    checkboxActive: {
        backgroundColor: '#FFFFFF',
    },
    checkboxCheck: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: '#0D072F',
    },
    termsText: {
        color: "#FFFFFF",
        fontSize: 12,
        flex: 1,
    },
    buttonContainer: {
        alignItems: "center",
        marginBottom: 24,
        width: '100%',
    },
    registerButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingVertical: 14,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },
    registerButtonDisabled: {
        opacity: 0.5,
    },
    registerButtonText: {
        color: "#1E1E1E",
        fontSize: 16,
        fontWeight: "700",
    },
    loginRedirectContainer: {
        alignItems: "center",
        marginBottom: 20,
        width: '100%',
    },
    loginRedirectText: {
        color: "#FFFFFF",
        fontSize: 13,
    },
    boldText: {
        fontWeight: "700",
        textDecorationLine: "underline",
    },
});

export default signupStaff;