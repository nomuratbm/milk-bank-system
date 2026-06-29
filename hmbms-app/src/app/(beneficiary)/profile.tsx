// src/app/(beneficiary)/profile.tsx
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ActivityIndicator,
    Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import type { Beneficiary } from "../../types/database.types";
import { useTheme } from "../../contexts/ThemeContext";

const ProfileScreen = () => {
    const theme = useTheme();
    const { session, signOut } = useAuth();
    const router = useRouter();
    const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"profile" | "change_password" | "edit_profile">("profile");

    // Form inputs for change password
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypeNewPassword, setRetypeNewPassword] = useState("");
    const [updating, setUpdating] = useState(false);

    // Form inputs for edit profile (Name & Email changes only)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchBeneficiary() {
            if (!session?.user) {
                setLoading(false);
                return;
            }
            const { data, error } = await supabase
                .from("beneficiaries")
                .select("*")
                .eq("id", session.user.id)
                .single();
            if (!error && data) {
                setBeneficiary(data as Beneficiary);
            }
            setLoading(false);
        }
        fetchBeneficiary();
    }, [session]);

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Log Out",
                style: "destructive",
                onPress: async () => {
                    await signOut();
                    router.replace("/welcome");
                },
            },
        ]);
    };

    const handleChangePassword = () => {
        setView("change_password");
    };

    const handleChangeProgram = () => {
        router.replace("/(onboarding)/selectProgram");
    };

    const handleEnterEditProfile = () => {
        setFirstName(beneficiary?.first_name ?? "");
        setLastName(beneficiary?.last_name ?? "");
        setEmailInput(beneficiary?.email ?? session?.user?.email ?? "");
        setView("edit_profile");
    };

    const handleUpdatePassword = async () => {
        if (!oldPassword || !newPassword || !retypeNewPassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Error", "New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== retypeNewPassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }

        setUpdating(true);
        const email = session?.user?.email;
        if (!email) {
            Alert.alert("Error", "User email not found in session.");
            setUpdating(false);
            return;
        }

        try {
            // 1. Verify old password by attempting a re-authentication login
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password: oldPassword,
            });

            if (signInError) {
                Alert.alert("Verification Failed", "The current password you entered is incorrect.");
                setUpdating(false);
                return;
            }

            // 2. If verification is successful, update the password
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (updateError) {
                Alert.alert("Error", "Failed to update password: " + updateError.message);
            } else {
                Alert.alert("Success", "Password changed successfully!");
                // Reset fields
                setOldPassword("");
                setNewPassword("");
                setRetypeNewPassword("");
                setView("profile");
            }
        } catch (err: any) {
            Alert.alert("Error", err.message || "An unexpected error occurred.");
        } finally {
            setUpdating(false);
        }
    };

    const handleSaveChanges = async () => {
        if (!firstName.trim() || !lastName.trim()) {
            Alert.alert("Error", "Name fields cannot be empty.");
            return;
        }

        setSaving(true);
        const userId = session?.user?.id;
        const currentEmail = session?.user?.email;

        if (!userId) {
            Alert.alert("Error", "User not logged in.");
            setSaving(false);
            return;
        }

        try {
            // 1. Update beneficiary profile details in the database (First Name & Last Name)
            const { error: dbError } = await supabase
                .from("beneficiaries")
                .update({
                    first_name: firstName.trim(),
                    last_name: lastName.trim(),
                })
                .eq("id", userId);

            if (dbError) {
                Alert.alert("Database Error", "Failed to update profile details: " + dbError.message);
                setSaving(false);
                return;
            }

            // 2. Keep Supabase Auth full name metadata in sync
            await supabase.auth.updateUser({
                data: { full_name: `${firstName.trim()} ${lastName.trim()}` }
            });

            // 3. Update email address if it was changed (requires email confirmation)
            let emailChangeTriggered = false;
            if (emailInput.trim().toLowerCase() !== currentEmail?.toLowerCase()) {
                const { error: emailError } = await supabase.auth.updateUser({
                    email: emailInput.trim().toLowerCase(),
                });

                if (emailError) {
                    Alert.alert("Email Change Error", "Could not send email change confirmation: " + emailError.message);
                } else {
                    emailChangeTriggered = true;
                }
            }

            // 4. Refetch the local beneficiary profile data to refresh the main screen UI
            const { data: updatedBen } = await supabase
                .from("beneficiaries")
                .select("*")
                .eq("id", userId)
                .single();
            if (updatedBen) {
                setBeneficiary(updatedBen as Beneficiary);
            }

            if (emailChangeTriggered) {
                Alert.alert(
                    "Profile Saved",
                    "Profile updated! Please check your new email address to verify the change before it takes effect."
                );
            } else {
                Alert.alert("Success", "Profile updated successfully!");
            }
            setView("profile");
        } catch (err: any) {
            Alert.alert("Error", err.message || "An unexpected error occurred.");
        } finally {
            setSaving(false);
        }
    };

    // Use dynamic calculations
    const displayName = beneficiary
        ? `${beneficiary.first_name} ${beneficiary.last_name}`
        : (session?.user?.user_metadata?.full_name ?? 
           (session?.user?.email ? session.user.email.split("@")[0].replace(/[._]/g, " ") : "Beneficiary"));

    const displayEmail =
        beneficiary?.email ?? session?.user?.email ?? "—";

    const displayAvatarUrl = beneficiary?.avatar_url ?? null;

    const infantName = "Kitkat Villaluz";
    const infantAge = "10 months old";

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFD230" />
            </View>
        );
    }

    if (view === "change_password") {
        return (
            <View style={styles.container}>
                <View style={[styles.cardContainer, { backgroundColor: theme.primary }]}>
                    <Text style={styles.changePasswordTitle}>Change Password</Text>
                    <Text style={styles.changePasswordSubtitle}>
                        Enter your current password for verification and your new password!
                    </Text>

                    <View style={styles.divider} />

                    {/* Form Fields */}
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="old password"
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry={true}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            autoCapitalize="none"
                        />
                        <Text style={styles.fieldSubLabel}>Old Password</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="new password"
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry={true}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            autoCapitalize="none"
                        />
                        <Text style={styles.fieldSubLabel}>New Password</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="retype new password"
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry={true}
                            value={retypeNewPassword}
                            onChangeText={setRetypeNewPassword}
                            autoCapitalize="none"
                        />
                        <Text style={styles.fieldSubLabel}>Retype New Password</Text>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={0.8}
                        onPress={handleUpdatePassword}
                        disabled={updating}
                    >
                        {updating ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.saveButtonText}>Update Password</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* Back Navigation Row */}
                    <TouchableOpacity
                        style={styles.menuItem}
                        activeOpacity={0.6}
                        onPress={() => setView("profile")}
                    >
                        <View style={styles.menuIconWrapper}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                                <Path d="M9 14L4 9l5-5" strokeLinecap="round" strokeLinejoin="round" />
                                <Path d="M20 20v-7a4 4 0 0 0-4-4H4" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </View>
                        <Text style={styles.menuText}>Back to profile</Text>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                            <Path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </TouchableOpacity>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        activeOpacity={0.8}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (view === "edit_profile") {
        return (
            <View style={styles.container}>
                {/* ── Avatar Section ── */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarRing}>
                        <View style={styles.avatarInner}>
                            {displayAvatarUrl ? (
                                <Image
                                    source={{ uri: displayAvatarUrl }}
                                    style={{ width: 120, height: 120 }}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Svg
                                    width="64"
                                    height="64"
                                    viewBox="0 0 24 24"
                                    fill="#B0B0B0"
                                >
                                    <Path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                                </Svg>
                            )}
                        </View>
                    </View>
                </View>

                {/* ── Large Yellow Card Container ── */}
                <View style={[styles.cardContainer, { backgroundColor: theme.primary }]}>
                    <Text style={styles.changePasswordTitle}>Edit Profile</Text>
                    <Text style={styles.changePasswordSubtitle}>
                        Update your first name, last name, or email address below!
                    </Text>

                    <View style={styles.divider} />

                    {/* Form Fields */}
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="first name"
                            placeholderTextColor="#A0A0A0"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <Text style={styles.fieldSubLabel}>First Name</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="last name"
                            placeholderTextColor="#A0A0A0"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <Text style={styles.fieldSubLabel}>Last Name</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="email address"
                            placeholderTextColor="#A0A0A0"
                            value={emailInput}
                            onChangeText={setEmailInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Text style={styles.fieldSubLabel}>Email Address (verification link will be sent)</Text>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        activeOpacity={0.8}
                        onPress={handleSaveChanges}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* Back Navigation Row */}
                    <TouchableOpacity
                        style={styles.menuItem}
                        activeOpacity={0.6}
                        onPress={() => setView("profile")}
                    >
                        <View style={styles.menuIconWrapper}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                                <Path d="M9 14L4 9l5-5" strokeLinecap="round" strokeLinejoin="round" />
                                <Path d="M20 20v-7a4 4 0 0 0-4-4H4" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </View>
                        <Text style={styles.menuText}>Back to profile</Text>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                            <Path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </TouchableOpacity>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        activeOpacity={0.8}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* ── Avatar Section ── */}
            <View style={styles.avatarSection}>
                <View style={styles.avatarRing}>
                    <View style={styles.avatarInner}>
                        {displayAvatarUrl ? (
                            <Image
                                source={{ uri: displayAvatarUrl }}
                                style={{ width: 120, height: 120 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <Svg
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="#B0B0B0"
                            >
                                <Path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                            </Svg>
                        )}
                    </View>
                    <TouchableOpacity style={styles.editBadge} activeOpacity={0.7} onPress={handleEnterEditProfile}>
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                            <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Large Yellow Card Container ── */}
            <View style={[styles.cardContainer, { backgroundColor: theme.primary }]}>
                {/* ── Name & Email ── */}
                <Text style={styles.userName}>{displayName}</Text>
                <Text style={styles.userEmail}>{displayEmail}</Text>

                {/* ── Infant Info ── */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Name of Infant: </Text>
                        <Text style={styles.infoValue}>{infantName}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Age: </Text>
                        <Text style={styles.infoValue}>{infantAge}</Text>
                    </Text>
                </View>

                {/* ── Divider ── */}
                <View style={styles.divider} />

                {/* ── Menu Items ── */}
                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.6}
                    onPress={handleChangePassword}
                >
                    <View style={styles.menuIconWrapper}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                            <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
                        </Svg>
                    </View>
                    <Text style={styles.menuText}>Change Password</Text>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                        <Path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.6}
                    onPress={handleChangeProgram}
                >
                    <View style={styles.menuIconWrapper}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                            <Path d="M9 14L4 9l5-5" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M20 20v-7a4 4 0 0 0-4-4H4" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </View>
                    <Text style={styles.menuText}>Change Program</Text>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                        <Path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>

                {/* ── Logout Button ── */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 80,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 40,
        alignItems: "center",
    },

    /* ── Avatar ── */
    avatarSection: {
        alignItems: "center",
        marginBottom: -60,
        zIndex: 10,
        elevation: 10,
    },
    avatarRing: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        position: "relative",
    },
    avatarInner: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    editBadge: {
        position: "absolute",
        bottom: -5,
        left: "50%",
        marginLeft: -16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#000000",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    /* ── Card Container ── */
    cardContainer: {
        width: "100%",
        backgroundColor: "#FFEFA6",
        borderRadius: 36,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },

    /* ── Change Password specific card layout ── */
    changePasswordCard: {
        paddingTop: 32,
        marginTop: 0,
    },
    changePasswordTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#000000",
        textAlign: "left",
        marginBottom: 6,
    },
    changePasswordSubtitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#000000",
        lineHeight: 20,
        marginBottom: 8,
    },
    formContainer: {
        width: "100%",
        marginTop: 10,
    },
    fieldSubLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000000",
        marginTop: 4,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    textInput: {
        width: "100%",
        height: 48,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#000000",
    },
    saveButton: {
        width: "100%",
        height: 48,
        borderRadius: 24,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 4,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    /* ── Name & Email ── */
    userName: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000000",
        marginBottom: 2,
        textAlign: "center",
    },
    userEmail: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000",
        marginBottom: 24,
        textAlign: "center",
    },

    /* ── Infant Info ── */
    infoSection: {
        width: "100%",
        paddingHorizontal: 4,
        marginBottom: 12,
    },
    infoText: {
        fontSize: 15,
        color: "#000000",
        marginBottom: 8,
    },
    infoLabel: {
        fontWeight: "700",
    },
    infoValue: {
        fontWeight: "400",
    },

    /* ── Divider ── */
    divider: {
        width: "100%",
        height: 1.5,
        backgroundColor: "#000000",
        marginVertical: 18,
    },

    /* ── Menu Items ── */
    menuItem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 4,
    },
    menuIconWrapper: {
        width: 36,
        alignItems: "flex-start",
    },
    menuText: {
        flex: 1,
        fontSize: 20,
        fontWeight: "500",
        color: "#000000",
        marginLeft: 8,
    },

    /* ── Logout Button ── */
    logoutButton: {
        width: "80%",
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 36,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#B30000",
    },
});

export default ProfileScreen;