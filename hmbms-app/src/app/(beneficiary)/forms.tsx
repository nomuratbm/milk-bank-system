// src/app/(beneficiary)/forms.tsx
import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Image, TextInput, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { useTheme } from "../../contexts/ThemeContext";

interface FormsScreenProps {
    onNavigateToInquiry?: () => void;
}

const FormsScreen: React.FC<FormsScreenProps> = ({ onNavigateToInquiry }) => {
    const theme = useTheme();
    const [formData, setFormData] = React.useState({
        pg1FirstName: "",
        pg1LastName: "",
        pg1Relationship: "",
        pg1ContactNumber: "",
        pg1Email: "",
        pg2FirstName: "",
        pg2LastName: "",
        pg2Relationship: "",
        pg2ContactNumber: "",
        pg2Email: "",
        addressStreet: "",
        addressStreet2: "",
        addressCity: "",
        addressZip: "",
        infantName: "",
        infantAge: "",
        infantWeight: "",
        additionalInfo: "",
    });

    const [showErrors, setShowErrors] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async () => {
        const isPg1Invalid = !formData.pg1FirstName.trim() ||
            !formData.pg1LastName.trim() ||
            !formData.pg1Relationship.trim() ||
            !formData.pg1ContactNumber.trim() ||
            !formData.pg1Email.trim();

        const isAddressInvalid = !formData.addressStreet.trim() ||
            !formData.addressCity.trim() ||
            !formData.addressZip.trim();

        const isInfantInvalid = !formData.infantName.trim() ||
            !formData.infantAge.trim() ||
            !formData.infantWeight.trim();

        if (isPg1Invalid || isAddressInvalid || isInfantInvalid) {
            setShowErrors(true);
            Alert.alert("Missing Required Information", "Please fill out all the required fields highlighted in red.");
            return;
        }

        setIsSubmitting(true);
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError || !userData?.user) {
                Alert.alert("Authentication Required", "Please log in to submit your form.");
                setIsSubmitting(false);
                return;
            }

            const { error } = await (supabase as any)
                .from('milk_requests')
                .insert([
                    {
                        user_id: userData.user.id,
                        pg1_first_name: formData.pg1FirstName,
                        pg1_last_name: formData.pg1LastName,
                        pg1_relationship: formData.pg1Relationship,
                        pg1_contact_num: formData.pg1ContactNumber,
                        pg1_email: formData.pg1Email,
                        pg2_first_name: formData.pg2FirstName || null,
                        pg2_last_name: formData.pg2LastName || null,
                        pg2_relationship: formData.pg2Relationship || null,
                        pg2_contact_num: formData.pg2ContactNumber || null,
                        pg2_email: formData.pg2Email || null,
                        address_street: formData.addressStreet,
                        address_street2: formData.addressStreet2 || null,
                        address_city: formData.addressCity,
                        address_zip: formData.addressZip,
                        infant_name: formData.infantName,
                        infant_age: formData.infantAge,
                        infant_weight: formData.infantWeight,
                        additional_info: formData.additionalInfo || null,
                    }
                ]);

            if (error) {
                console.error("Supabase insert error:", error);
                Alert.alert("Submission Failed", error.message || "Could not insert request.");
            } else {
                Alert.alert(
                    "Request Submitted",
                    "Your milk request form has been submitted successfully!",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setFormData({
                                    pg1FirstName: "",
                                    pg1LastName: "",
                                    pg1Relationship: "",
                                    pg1ContactNumber: "",
                                    pg1Email: "",
                                    pg2FirstName: "",
                                    pg2LastName: "",
                                    pg2Relationship: "",
                                    pg2ContactNumber: "",
                                    pg2Email: "",
                                    addressStreet: "",
                                    addressStreet2: "",
                                    addressCity: "",
                                    addressZip: "",
                                    infantName: "",
                                    infantAge: "",
                                    infantWeight: "",
                                    additionalInfo: "",
                                });
                                setShowErrors(false);
                            }
                        }
                    ]
                );
            }
        } catch (e: any) {
            console.error("Unexpected submission error:", e);
            Alert.alert("Submission Error", e.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={[styles.supsupTodoInquiryForms, { height: 1800 }]}>
            <View style={styles.groupChildPosition}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
            </View>

            <View style={styles.liftedHeaderGroup}>
                <Text style={styles.newFillHeader}>Fill out the form below</Text>
                <Text style={styles.newSubHeader}>Get safe donor milk from the Makati Human Milk Bank.</Text>
            </View>

            <View style={[styles.inputField, styles.inputPosition1]}>
                <Text style={styles.label}>Parent/Guardian 1</Text>
                <TextInput
                    style={[
                        styles.input,
                        styles.valueTypo,
                        { color: "#000000" },
                        showErrors && !formData.pg1FirstName.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                    ]}
                    placeholder="Enter your first name"
                    placeholderTextColor="#b3b3b3"
                    value={formData.pg1FirstName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, pg1FirstName: text }))}
                />
            </View>
            <TextInput
                style={[
                    styles.input2,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.pg1LastName.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter your last name"
                placeholderTextColor="#b3b3b3"
                value={formData.pg1LastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg1LastName: text }))}
            />
            <Text style={[styles.firstName, styles.lastTypo]}>First Name</Text>
            <Text style={[styles.lastName, styles.lastTypo]}>Last Name</Text>
            <TextInput
                style={[
                    styles.input3,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.pg1Relationship.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter relationship to infant"
                placeholderTextColor="#b3b3b3"
                value={formData.pg1Relationship}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg1Relationship: text }))}
            />
            <Text style={[styles.relationship, styles.lastTypo]}>Relationship</Text>
            <TextInput
                style={[
                    styles.input4,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.pg1ContactNumber.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter contact number"
                placeholderTextColor="#b3b3b3"
                value={formData.pg1ContactNumber}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg1ContactNumber: text }))}
                keyboardType="phone-pad"
            />
            <Text style={[styles.contactNumber, styles.lastTypo]}>Contact Number</Text>
            <TextInput
                style={[
                    styles.input5,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.pg1Email.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter email address"
                placeholderTextColor="#b3b3b3"
                value={formData.pg1Email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg1Email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={[styles.emailAddress, styles.lastTypo]}>Email Address</Text>
            <View style={[styles.inputField2, styles.inputPosition1]}>
                <Text style={styles.label}>
                    Parent/Guardian 2 <Text style={styles.optionalText}>(optional)</Text>
                </Text>
                <TextInput
                    style={[styles.input, styles.valueTypo, { color: "#000000" }]}
                    placeholder="Enter your first name"
                    placeholderTextColor="#b3b3b3"
                    value={formData.pg2FirstName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, pg2FirstName: text }))}
                />
            </View>
            <TextInput
                style={[styles.input7, styles.inputLayout, styles.valueTypo, { color: "#000000" }]}
                placeholder="Enter your last name"
                placeholderTextColor="#b3b3b3"
                value={formData.pg2LastName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg2LastName: text }))}
            />
            <Text style={[styles.firstName2, styles.lastTypo]}>First Name</Text>
            <Text style={[styles.lastName2, styles.lastTypo]}>Last Name</Text>
            <TextInput
                style={[styles.input8, styles.inputLayout, styles.valueTypo, { color: "#000000" }]}
                placeholder="Enter relationship to infant"
                placeholderTextColor="#b3b3b3"
                value={formData.pg2Relationship}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg2Relationship: text }))}
            />
            <Text style={[styles.relationship2, styles.lastTypo]}>Relationship</Text>
            <TextInput
                style={[styles.input9, styles.inputLayout, styles.valueTypo, { color: "#000000" }]}
                placeholder="Enter contact number"
                placeholderTextColor="#b3b3b3"
                value={formData.pg2ContactNumber}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg2ContactNumber: text }))}
                keyboardType="phone-pad"
            />
            <Text style={[styles.contactNumber2, styles.lastTypo]}>Contact Number</Text>
            <TextInput
                style={[styles.input10, styles.inputLayout, styles.valueTypo, { color: "#000000" }]}
                placeholder="Enter email address"
                placeholderTextColor="#b3b3b3"
                value={formData.pg2Email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pg2Email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={[styles.emailAddress2, styles.lastTypo]}>Email Address</Text>
            <View style={[styles.inputField3, styles.inputPosition1]}>
                <Text style={styles.label}>Parent/Guardian Address</Text>
                <TextInput
                    style={[
                        styles.input,
                        styles.valueTypo,
                        { color: "#000000" },
                        showErrors && !formData.addressStreet.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                    ]}
                    placeholder="Enter street address"
                    placeholderTextColor="#b3b3b3"
                    value={formData.addressStreet}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, addressStreet: text }))}
                />
            </View>
            <View style={[styles.inputField4, styles.inputPosition1]}>
                <Text style={styles.label}>Infant Information</Text>
                <TextInput
                    style={[
                        styles.input,
                        styles.valueTypo,
                        { color: "#000000" },
                        showErrors && !formData.infantName.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                    ]}
                    placeholder="Enter Infant Name"
                    placeholderTextColor="#b3b3b3"
                    value={formData.infantName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, infantName: text }))}
                />
            </View>
            <Text style={[styles.streetAddress, styles.lastTypo]}>Street Address</Text>
            <Text style={[styles.infantName, styles.lastTypo]}>Infant Name</Text>
            <Text style={[styles.infantAge, styles.lastTypo]}>Infant Age</Text>
            <Text style={[styles.infantWeight, styles.lastTypo]}>Infant Weight</Text>
            <Text style={[styles.additionalInformation, styles.lastTypo]}>Additional Information</Text>
            <TextInput
                style={[styles.input13, styles.inputLayout, styles.valueTypo, { color: "#000000" }]}
                placeholder="Enter street address line 2"
                placeholderTextColor="#b3b3b3"
                value={formData.addressStreet2}
                onChangeText={(text) => setFormData(prev => ({ ...prev, addressStreet2: text }))}
            />
            <Text style={[styles.streetAddressLine, styles.lastTypo]}>Street Address Line 2</Text>
            <TextInput
                style={[
                    styles.input14,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.addressCity.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter city"
                placeholderTextColor="#b3b3b3"
                value={formData.addressCity}
                onChangeText={(text) => setFormData(prev => ({ ...prev, addressCity: text }))}
            />
            <Text style={[styles.city, styles.lastTypo]}>City</Text>
            <TextInput
                style={[
                    styles.input15,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.infantAge.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter Infant Age"
                placeholderTextColor="#b3b3b3"
                value={formData.infantAge}
                onChangeText={(text) => setFormData(prev => ({ ...prev, infantAge: text }))}
            />
            <TextInput
                style={[
                    styles.input16,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.addressZip.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter zip code"
                placeholderTextColor="#b3b3b3"
                value={formData.addressZip}
                onChangeText={(text) => setFormData(prev => ({ ...prev, addressZip: text }))}
                keyboardType="numeric"
            />
            <Text style={[styles.zipCode, styles.lastTypo]}>Zip Code</Text>
            <TouchableOpacity
                style={[styles.button, styles.buttonFlexBox, { backgroundColor: theme.accent, borderColor: theme.accent }, isSubmitting && { opacity: 0.7 }]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                activeOpacity={0.8}
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color="#1e1e1e" />
                ) : (
                    <Text style={styles.button2}>Submit</Text>
                )}
            </TouchableOpacity>
            <TextInput
                style={[
                    styles.input17,
                    styles.inputLayout,
                    styles.valueTypo,
                    { color: "#000000" },
                    showErrors && !formData.infantWeight.trim() && { borderColor: '#FF3B30', borderWidth: 1.5 }
                ]}
                placeholder="Enter Infant Weight"
                placeholderTextColor="#b3b3b3"
                value={formData.infantWeight}
                onChangeText={(text) => setFormData(prev => ({ ...prev, infantWeight: text }))}
            />
            <TextInput
                style={[
                    styles.step1Box,
                    styles.step1Layout,
                    styles.valueTypo,
                    {
                        color: '#000000',
                        borderColor: '#898787',
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 16,
                        textAlignVertical: 'top',
                        backgroundColor: '#fff',
                        elevation: 4,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }
                ]}
                placeholder="Enter Additional Information"
                placeholderTextColor="#b3b3b3"
                multiline={true}
                value={formData.additionalInfo}
                onChangeText={(text) => setFormData(prev => ({ ...prev, additionalInfo: text }))}
            />
            <Text style={[styles.doYouHaveContainer, styles.fillOutThePosition]}>
                <Text style={styles.doYouHaveTypo}>{`Do you have concerns? `}</Text>
                <Text style={styles.contactUs}>{`Contact us `}</Text>
                <Text style={styles.here} onPress={onNavigateToInquiry}>here</Text>
                <Text style={styles.contactUs}>.</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    groupChildPosition: {
        height: 1924,
        width: 412,
        left: 0,
        top: 0,
        position: "absolute",
    },
    fillOutThePosition: {
        textAlign: "left",
        color: "#000",
        left: 31,
        position: "absolute",
    },
    inputPosition1: {
        gap: 8,
        alignItems: "flex-start",
        width: 333,
        left: "50%",
        marginLeft: -177,
        position: "absolute",
    },
    valueTypo: {
        color: "#b3b3b3",
        fontFamily: "Inter-Regular",
        lineHeight: 16,
        fontSize: 16,
        textAlign: "left",
    },
    inputLayout: {
        width: 334,
        minWidth: 120,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d9d9d9",
        borderStyle: "solid",
        borderRadius: 8,
        position: "absolute",
        backgroundColor: "#fff",
    },
    lastTypo: {
        fontSize: 12,
        left: 29,
        width: 354,
        fontFamily: "Inter-Light",
        fontWeight: "300",
        textAlign: "left",
        color: "#000",
        position: "absolute",
    },
    buttonFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
    },
    step1Layout: {
        height: 152,
        width: 343,
        position: "absolute",
    },
    supsupTodoInquiryForms: {
        width: "100%",
        maxWidth: "100%",
        flex: 1,
        backgroundColor: "#fff",
    },
    groupChild: {
        backgroundColor: "#fff",
    },
    liftedHeaderGroup: {
        position: "absolute",
        top: -5,
        left: 31,
        zIndex: 20,
    },
    newFillHeader: {
        fontSize: 24,
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
        color: "#000000",
        marginBottom: 8,
    },
    newSubHeader: {
        width: 340,
        fontFamily: "Inter-Light",
        fontWeight: "300",
        fontSize: 16,
        color: "#000000",
        lineHeight: 20,
    },
    inputField: {
        top: 80,
    },
    label: {
        lineHeight: 22,
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        alignSelf: "stretch",
        fontSize: 16,
        textAlign: "left",
        color: "#000",
    },
    optionalText: {
        fontWeight: "400",
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "#666666",
    },
    input: {
        minWidth: 120,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#d9d9d9",
        overflow: "hidden",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        alignSelf: "stretch",
        backgroundColor: "#fff",
    },
    input2: {
        top: 178.5,
        left: 28.5,
        width: 334,
    },
    firstName: { top: 154 },
    lastName: { top: 223 },
    input3: {
        top: 247.5,
        left: 28.5,
        width: 334,
    },
    relationship: { top: 292 },
    input4: {
        top: 316.5,
        left: 28.5,
        width: 334,
    },
    contactNumber: { top: 361 },
    input5: {
        top: 385.5,
        left: 28.5,
        width: 334,
    },
    emailAddress: { top: 430 },
    inputField2: { top: 467 },
    input7: {
        top: 565.5,
        left: 28.5,
        width: 334,
    },
    firstName2: { top: 541 },
    lastName2: { top: 610 },
    input8: {
        top: 634.5,
        left: 28.5,
        width: 334,
    },
    relationship2: { top: 679 },
    input9: {
        top: 703.5,
        left: 28.5,
        width: 334,
    },
    contactNumber2: { top: 748 },
    input10: {
        top: 772.5,
        left: 28.5,
        width: 334,
    },
    emailAddress2: { top: 817 },
    inputField3: { top: 854 },
    inputField4: { top: 1170 },
    streetAddress: { top: 928 },
    infantName: { top: 1244 },
    infantAge: { top: 1314 },
    infantWeight: { top: 1388 },
    additionalInformation: { top: 1583 },
    input13: {
        top: 953.5,
        left: 28.5,
        width: 334,
    },
    streetAddressLine: { top: 998 },
    input14: {
        top: 1023.5,
        left: 28.5,
        width: 334,
    },
    city: { top: 1068 },
    input15: {
        top: 1269.5,
        left: 28.5,
        width: 334,
    },
    input16: {
        top: 1093.5,
        left: 28.5,
        width: 334,
    },
    zipCode: { top: 1138 },
    button: {
        marginLeft: -150,
        top: 1669,
        width: 300,
        height: 42,
        padding: 11,
        overflow: "hidden",
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        borderStyle: "solid",
        left: "50%",
    },
    button2: {
        color: "#1e1e1e",
        textAlign: "center",
        lineHeight: 16,
        fontWeight: "700",
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },
    input17: {
        top: 1340.5,
        left: 30.5,
    },
    step1Box: {
        top: 1417,
        left: 26,
    },
    doYouHaveContainer: {
        top: 1631,
        fontSize: 14,
    },
    doYouHaveTypo: {
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
    },
    contactUs: {
        fontFamily: "Inter-Regular",
    },
    here: {
        color: '#000000',
        textDecorationLine: "underline",
        fontFamily: "Inter-Bold",
        fontWeight: "700",
    },
});

export default FormsScreen;
