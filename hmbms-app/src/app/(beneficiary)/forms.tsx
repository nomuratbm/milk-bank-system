import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Image, TextInput, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";

interface FormsScreenProps {
    onNavigateToInquiry?: () => void;
}

const SupsupTodoInquiryForms: React.FC<FormsScreenProps> = ({ onNavigateToInquiry }) => {
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
        // Validate required fields (Parent/Guardian 1, Parent/Guardian Address (Street, City, Zip), and Infant Information)
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
        <View
            style={[styles.supsupTodoInquiryForms, { height: 1800 }]}
        >
            <View style={styles.groupChildPosition}>
                <View style={[styles.groupChild, styles.groupChildPosition]} />
            </View>

            <View style={styles.liftedHeaderGroup}>
                <Text style={styles.newFillHeader}>Fill out the form below</Text>
                <Text style={styles.newSubHeader}>Get safe donor milk from the Makati Human Milk Bank.</Text>
            </View>

            <View style={styles.vectorParent}>
                <Image style={styles.groupItem} resizeMode="cover" />
                <Image style={styles.objectIcon} resizeMode="cover" />
                <Image style={[styles.objectIcon2, styles.objectIconLayout]} resizeMode="cover" />
                <Image style={[styles.objectIcon3, styles.objectIconLayout]} resizeMode="cover" />
                <Image style={[styles.objectIcon4, styles.objectIconLayout]} resizeMode="cover" />
                <Image style={[styles.objectIcon5, styles.objectIconLayout]} resizeMode="cover" />
                <Image style={[styles.objectIcon6, styles.objectIconLayout]} resizeMode="cover" />
                <Image style={[styles.objectIcon7, styles.objectIconLayout]} resizeMode="cover" />
                <Image style={styles.formsIcon} resizeMode="cover" />
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
                style={[styles.button, styles.buttonFlexBox, isSubmitting && { opacity: 0.7 }]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                activeOpacity={0.8}
            >
                {isSubmitting ? (
                    <ActivityIndicator size="small" color="#1e1e1e" />
                ) : (
                    <Text style={[styles.button2, styles.hereTypo]}>Submit</Text>
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
                        shadowRadius: 4
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
                <Text style={[styles.here, styles.hereTypo]} onPress={onNavigateToInquiry}>here</Text>
                <Text style={styles.contactUs}>.</Text>
            </Text>
            <View style={[styles.navbar, styles.navbarLayout]}>
                <Image style={[styles.subtractIcon, styles.navbarLayout]} resizeMode="cover" />
                <View style={[styles.homeParent, styles.buttonFlexBox]}>
                    <Image style={styles.homeIcon} resizeMode="cover" />
                    <View style={styles.message}>
                        <View style={styles.messageChild} />
                        <Image style={[styles.messageItem, styles.iconPosition]} resizeMode="cover" />
                    </View>
                    <Image style={styles.paperIcon} resizeMode="cover" />
                    <View style={styles.user}>
                        <Image style={[styles.icon, styles.iconPosition]} resizeMode="cover" />
                    </View>
                </View>
                <Image style={styles.navbarChild} resizeMode="cover" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    groupChildPosition: {
        height: 1924,
        width: 412,
        left: 0,
        top: 0,
        position: "absolute"
    },
    fillOutThePosition: {
        textAlign: "left",
        color: "#000",
        left: 31,
        position: "absolute"
    },
    objectIconLayout: {
        width: "11.94%",
        height: "14.49%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    inputPosition1: {
        gap: 8,
        alignItems: "flex-start",
        width: 333,
        left: "50%",
        marginLeft: -177,
        position: "absolute"
    },
    valueTypo: {
        color: "#b3b3b3",
        fontFamily: "Inter-Regular",
        lineHeight: 16,
        fontSize: 16,
        textAlign: "left"
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
        backgroundColor: "#fff"
    },
    lastTypo: {
        fontSize: 12,
        left: 29,
        width: 354,
        fontFamily: "Inter-Light",
        fontWeight: "300",
        textAlign: "left",
        color: "#000",
        position: "absolute"
    },
    buttonFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute"
    },
    hereTypo: {
        fontFamily: "Inter-Bold",
        fontWeight: "700"
    },
    step1Layout: {
        height: 152,
        width: 343,
        position: "absolute"
    },
    navbarLayout: {
        width: 432,
        position: "absolute"
    },
    iconPosition: {
        left: "16.67%",
        position: "absolute"
    },
    supsupTodoInquiryForms: {
        width: "100%",
        maxWidth: "100%",
        flex: 1,
        backgroundColor: "#fff"
    },
    groupChild: {
        backgroundColor: "#fff"
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
    vectorParent: {
        top: -140,
        left: -76,
        width: 632.09,
        height: 493.35,
        position: "absolute"
    },
    groupItem: {
        width: 555.56,
        height: 254.07,
        left: 0,
        top: 0,
        position: "absolute"
    },
    objectIcon: {
        height: "28.26%",
        width: "23.27%",
        top: "19.26%",
        right: "72.46%",
        bottom: "52.48%",
        left: "4.27%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "absolute"
    },
    objectIcon2: {
        top: "21.08%",
        right: "51.67%",
        bottom: "64.42%",
        left: "36.39%"
    },
    objectIcon3: {
        top: "32.84%",
        right: "47.4%",
        bottom: "52.67%",
        left: "40.66%"
    },
    objectIcon4: {
        top: "23.92%",
        right: "33.79%",
        bottom: "61.59%",
        left: "54.26%"
    },
    objectIcon5: {
        top: "21.89%",
        right: "16.07%",
        bottom: "63.61%",
        left: "71.98%"
    },
    objectIcon6: {
        top: "35.68%",
        right: "23.19%",
        bottom: "49.83%",
        left: "64.86%"
    },
    objectIcon7: {
        top: "29.6%",
        right: "63.53%",
        bottom: "55.91%",
        left: "24.52%"
    },
    formsIcon: {
        top: 190,
        left: 186,
        width: 400,
        height: 257.25,
        position: "absolute"
    },
    inputField: {
        top: 80
    },
    label: {
        lineHeight: 22,
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        alignSelf: "stretch",
        fontSize: 16,
        textAlign: "left",
        color: "#000"
    },
    optionalText: {
        fontWeight: "400",
        fontFamily: "Inter-Regular",
        fontSize: 14,
        color: "#666666"
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
        backgroundColor: "#fff"
    },
    value: {
        flex: 1
    },
    input2: {
        top: 178.5,
        left: 28.5,
        width: 334
    },
    firstName: {
        top: 154
    },
    lastName: {
        top: 223
    },
    input3: {
        top: 247.5,
        left: 28.5,
        width: 334
    },
    relationship: {
        top: 292
    },
    input4: {
        top: 316.5,
        left: 28.5,
        width: 334
    },
    contactNumber: {
        top: 361
    },
    input5: {
        top: 385.5,
        left: 28.5,
        width: 334
    },
    emailAddress: {
        top: 430
    },
    inputField2: {
        top: 467
    },
    input7: {
        top: 565.5,
        left: 28.5,
        width: 334
    },
    firstName2: {
        top: 541
    },
    lastName2: {
        top: 610
    },
    input8: {
        top: 634.5,
        left: 28.5,
        width: 334
    },
    relationship2: {
        top: 679
    },
    input9: {
        top: 703.5,
        left: 28.5,
        width: 334
    },
    contactNumber2: {
        top: 748
    },
    input10: {
        top: 772.5,
        left: 28.5,
        width: 334
    },
    emailAddress2: {
        top: 817
    },
    inputField3: {
        top: 854
    },
    inputField4: {
        top: 1170
    },
    streetAddress: {
        top: 928
    },
    infantName: {
        top: 1244
    },
    infantAge: {
        top: 1314
    },
    infantWeight: {
        top: 1388
    },
    additionalInformation: {
        top: 1583
    },
    input13: {
        top: 953.5,
        left: 28.5,
        width: 334
    },
    streetAddressLine: {
        top: 998
    },
    input14: {
        top: 1023.5,
        left: 28.5,
        width: 334
    },
    city: {
        top: 1068
    },
    input15: {
        top: 1269.5,
        left: 28.5,
        width: 334
    },
    input16: {
        top: 1093.5,
        left: 28.5,
        width: 334
    },
    zipCode: {
        top: 1138
    },
    button: {
        marginLeft: -150,
        top: 1669,
        backgroundColor: "#ffd230",
        borderColor: "#ffd230",
        width: 300,
        height: 42,
        padding: 11,
        overflow: "hidden",
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        borderStyle: "solid",
        left: "50%"
    },
    button2: {
        color: "#1e1e1e",
        textAlign: "center",
        lineHeight: 16,
        fontWeight: "700",
        fontSize: 16
    },
    input17: {
        top: 1340.5,
        left: 30.5
    },
    step1Box: {
        top: 1417,
        left: 26
    },
    step1BoxChild: {
        boxShadow: "0px 1px 4px #000",
        elevation: 4,
        borderRadius: 10,
        borderColor: "#898787",
        borderWidth: 1,
        borderStyle: "solid",
        left: 0,
        top: 0
    },
    enterAdditionalInformation: {
        top: 1540,
        left: 39,
        width: 275,
        position: "absolute"
    },
    doYouHaveContainer: {
        top: 1631,
        fontSize: 14
    },
    doYouHaveTypo: {
        fontFamily: "Inter-SemiBold",
        fontWeight: "600"
    },
    contactUs: {
        fontFamily: "Inter-Regular"
    },
    here: {
        color: '#000000',
        textDecorationLine: "underline"
    },
    navbar: {
        top: 834,
        left: -7,
        height: 83,
        display: "none"
    },
    subtractIcon: {
        top: 20,
        height: 63,
        left: 0
    },
    homeParent: {
        top: 30,
        left: 53,
        gap: 55
    },
    homeIcon: {
        width: 35,
        height: 35
    },
    message: {
        height: 43,
        width: 40,
        opacity: 0
    },
    messageChild: {
        height: "54.65%",
        width: "71.75%",
        top: "22.67%",
        right: "14.08%",
        bottom: "22.67%",
        left: "14.17%",
        backgroundColor: "#0d072f",
        borderColor: "#0d072f",
        borderWidth: 2,
        borderRadius: 2,
        borderStyle: "solid",
        position: "absolute"
    },
    messageItem: {
        height: "16.74%",
        width: "66.75%",
        top: "37.5%",
        right: "16.58%",
        bottom: "45.76%",
        borderRadius: 2
    },
    paperIcon: {
        width: 38,
        height: 35
    },
    user: {
        height: 36,
        width: 36,
        overflow: "hidden"
    },
    icon: {
        height: "75%",
        width: "66.67%",
        top: "12.5%",
        right: "16.67%",
        bottom: "12.5%"
    },
    navbarChild: {
        left: 131,
        width: 64,
        height: 62,
        top: 0,
        position: "absolute"
    }
});

export default SupsupTodoInquiryForms;