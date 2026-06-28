import * as React from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";

const SupsupTodoInquiryForms = () => {

    return (
        <ScrollView
            style={styles.supsupTodoInquiryForms}
            contentContainerStyle={{ height: 1750 }}
            showsVerticalScrollIndicator={false}
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
                <View style={styles.input}>
                    <Text style={[styles.value, styles.valueTypo]}>Enter your first name</Text>
                </View>
            </View>
            <View style={[styles.input2, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter your last name</Text>
            </View>
            <Text style={[styles.firstName, styles.lastTypo]}>First Name</Text>
            <Text style={[styles.lastName, styles.lastTypo]}>Last Name</Text>
            <View style={[styles.input3, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter relationship to infant</Text>
            </View>
            <Text style={[styles.relationship, styles.lastTypo]}>Relationship</Text>
            <View style={[styles.input4, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter contact number</Text>
            </View>
            <Text style={[styles.contactNumber, styles.lastTypo]}>Contact Number</Text>
            <View style={[styles.input5, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter email address</Text>
            </View>
            <Text style={[styles.emailAddress, styles.lastTypo]}>Email Address</Text>
            <View style={[styles.inputField2, styles.inputPosition1]}>
                <Text style={styles.label}>Parent/Guardian 2</Text>
                <View style={styles.input}>
                    <Text style={[styles.value, styles.valueTypo]}>Enter your first name</Text>
                </View>
            </View>
            <View style={[styles.input7, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter your last name</Text>
            </View>
            <Text style={[styles.firstName2, styles.lastTypo]}>First Name</Text>
            <Text style={[styles.lastName2, styles.lastTypo]}>Last Name</Text>
            <View style={[styles.input8, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter relationship to infant</Text>
            </View>
            <Text style={[styles.relationship2, styles.lastTypo]}>Relationship</Text>
            <View style={[styles.input9, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter contact number</Text>
            </View>
            <Text style={[styles.contactNumber2, styles.lastTypo]}>Contact Number</Text>
            <View style={[styles.input10, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter email address</Text>
            </View>
            <Text style={[styles.emailAddress2, styles.lastTypo]}>Email Address</Text>
            <View style={[styles.inputField3, styles.inputPosition1]}>
                <Text style={styles.label}>Parent/Guardian Address</Text>
                <View style={styles.input}>
                    <Text style={[styles.value, styles.valueTypo]}>Enter street address</Text>
                </View>
            </View>
            <View style={[styles.inputField4, styles.inputPosition1]}>
                <Text style={styles.label}>Infant Information</Text>
                <View style={styles.input}>
                    <Text style={[styles.value, styles.valueTypo]}>Enter Infant Name</Text>
                </View>
            </View>
            <Text style={[styles.streetAddress, styles.lastTypo]}>Street Address</Text>
            <Text style={[styles.infantName, styles.lastTypo]}>Infant Name</Text>
            <Text style={[styles.infantAge, styles.lastTypo]}>Infant Age</Text>
            <Text style={[styles.infantWeight, styles.lastTypo]}>Infant Weight</Text>
            <Text style={[styles.additionalInformation, styles.lastTypo]}>Additional Information</Text>
            <View style={[styles.input13, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter street address line 2</Text>
            </View>
            <Text style={[styles.streetAddressLine, styles.lastTypo]}>Street Address Line 2</Text>
            <View style={[styles.input14, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter city</Text>
            </View>
            <Text style={[styles.city, styles.lastTypo]}>City</Text>
            <View style={[styles.input15, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter Infant Age</Text>
            </View>
            <View style={[styles.input16, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter zip code</Text>
            </View>
            <Text style={[styles.zipCode, styles.lastTypo]}>Zip Code</Text>
            <View style={[styles.button, styles.buttonFlexBox]}>
                <Text style={[styles.button2, styles.hereTypo]}>Submit</Text>
            </View>
            <View style={[styles.input17, styles.inputLayout]}>
                <Text style={[styles.value, styles.valueTypo]}>Enter Infant Weight</Text>
            </View>
            <View style={[styles.step1Box, styles.step1Layout]}>
                <View style={[styles.step1BoxChild, styles.step1Layout]} />
            </View>
            <Text style={[styles.enterAdditionalInformation, styles.valueTypo]}>Enter Additional Information</Text>
            <Text style={[styles.doYouHaveContainer, styles.fillOutThePosition]}>
                <Text style={styles.doYouHaveTypo}>{`Do you have concerns? `}</Text>
                <Text style={styles.contactUs}>{`Contact us `}</Text>
                <Text style={[styles.here, styles.hereTypo]}>here</Text>
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
        </ScrollView>
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