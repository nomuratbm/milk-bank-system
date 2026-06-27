import * as React from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";

const SupsupTodoDashboardEmailInquiry = () => {

    return (
        <ScrollView style={styles.supsupTodoDashboardEmail}>
            <Image style={styles.supsupTodoDashboardEmailChild} resizeMode="cover" />
            <View style={styles.requestMilkForYourBabyParent}>
                <Text style={[styles.requestMilkFor, styles.contactUsTypo]}>Request Milk for your Baby</Text>
                <Text style={[styles.requestMilkFor, styles.contactUsTypo]}>Request Milk for your Baby</Text>
                <Text style={styles.howItWorks}>HOW IT WORKS</Text>
                <Text style={styles.getSafeDonor}>Get safe donor milk from the Makati Human Milk Bank.</Text>
                <View style={[styles.step2Box, styles.step2Layout]}>
                    <Text style={[styles.getNotified, styles.milkTypo]}>Get notified</Text>
                    <Text style={[styles.step2, styles.stepTypo]}>STEP 2</Text>
                    <Text style={[styles.youllBePlaced, styles.tapToPlaceTypo]}>You’ll be placed in a queue and receive an email once milk becomes available.</Text>
                    <View style={[styles.step2BoxChild, styles.boxBorder]} />
                    <Image style={[styles.step2BoxItem, styles.boxItemLayout]} resizeMode="cover" />
                    <Image style={styles.iconBellRing} resizeMode="cover" />
                </View>
                <View style={[styles.step3Box, styles.step2Layout]}>
                    <Text style={[styles.receiveDonorMilk, styles.milkTypo]}>Receive donor milk</Text>
                    <Text style={[styles.step2, styles.stepTypo]}>STEP 3</Text>
                    <Text style={[styles.claimYourMilk, styles.tapToPlaceTypo]}>Claim your milk.</Text>
                    <View style={[styles.step2BoxChild, styles.boxBorder]} />
                    <Image style={[styles.step2BoxItem, styles.boxItemLayout]} resizeMode="cover" />
                    <Image style={[styles.hugeiconsbabyBottle, styles.arrowIconPosition]} resizeMode="cover" />
                </View>
                <View style={[styles.orderBox, styles.step2Layout]}>
                    <View style={styles.orderBoxChild} />
                    <Text style={[styles.orderMilk, styles.orderPosition]}>Order Milk</Text>
                    <Text style={[styles.readyToProceed, styles.orderPosition]}>READY TO PROCEED?</Text>
                    <Text style={[styles.tapToPlace, styles.orderPosition]}>Tap to place your request.</Text>
                    <Image style={[styles.orderBoxItem, styles.boxItemLayout]} resizeMode="cover" />
                    <Image style={[styles.arrowIcon, styles.arrowIconPosition]} resizeMode="cover" />
                </View>
                <View style={[styles.step1Box, styles.step2Layout]}>
                    <Text style={[styles.submitAnInquiry, styles.milkTypo]}>Submit an inquiry</Text>
                    <Text style={[styles.step1, styles.stepTypo]}>STEP 1</Text>
                    <Text style={[styles.fillOutThe, styles.tapToPlaceTypo]}>Fill out the form below to register.</Text>
                    <View style={[styles.step2BoxChild, styles.boxBorder]} />
                    <Image style={[styles.step2BoxItem, styles.boxItemLayout]} resizeMode="cover" />
                    <Image style={[styles.orderIcon, styles.orderPosition]} resizeMode="cover" />
                </View>
            </View>
            <View style={styles.supsupTodoDashboardEmailItem} />
            <View style={[styles.button, styles.buttonFlexBox]}>
                <Text style={styles.button2}>Submit</Text>
            </View>
            <Text style={[styles.inquiry, styles.nameTypo]}>Inquiry</Text>
            <View style={[styles.step1Box2, styles.step1Layout]}>
                <View style={[styles.step1BoxInner, styles.step1Layout]} />
                <Text style={[styles.enterInquiry, styles.enterTypo]}>Enter Inquiry</Text>
            </View>
            <View style={[styles.input, styles.inputLayout]}>
                <Text style={[styles.enterYourFirst, styles.enterTypo]}>Enter your first name</Text>
            </View>
            <Text style={[styles.contactUs, styles.contactUsTypo]}>Contact us!</Text>
            <Text style={[styles.firstName, styles.nameTypo]}>First Name</Text>
            <Text style={[styles.lastName, styles.nameTypo]}>Last Name</Text>
            <View style={[styles.input2, styles.inputLayout]}>
                <Text style={[styles.enterYourFirst, styles.enterTypo]}>Enter your last name</Text>
            </View>
            <Text style={[styles.emailAddress, styles.nameTypo]}>Email Address</Text>
            <View style={[styles.input3, styles.inputLayout]}>
                <Text style={[styles.enterYourFirst, styles.enterTypo]}>Enter your last name</Text>
            </View>
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
                <Image style={[styles.navbarChild, styles.boxItemLayout]} resizeMode="cover" />
            </View>
        </ScrollView>);
};

const styles = StyleSheet.create({
    contactUsTypo: {
        textAlign: "left",
        color: "#000",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600",
        fontSize: 24,
        position: "absolute"
    },
    step2Layout: {
        height: 102,
        width: 343,
        position: "absolute"
    },
    milkTypo: {
        fontSize: 14,
        textAlign: "left",
        color: "#000",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600"
    },
    stepTypo: {
        fontSize: 15,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontStyle: "italic",
        textAlign: "left",
        color: "#000"
    },
    tapToPlaceTypo: {
        width: 242,
        fontSize: 11,
        fontFamily: "Inter-Light",
        fontWeight: "300",
        textAlign: "left",
        color: "#000"
    },
    boxBorder: {
        borderWidth: 1,
        borderColor: "#898787",
        borderRadius: 10,
        elevation: 4,
        boxShadow: "0px 1px 4px #000",
        borderStyle: "solid",
        left: 0,
        top: 0
    },
    boxItemLayout: {
        height: 62,
        position: "absolute"
    },
    arrowIconPosition: {
        height: 40,
        top: 31,
        position: "absolute"
    },
    orderPosition: {
        left: 29,
        position: "absolute"
    },
    buttonFlexBox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute"
    },
    nameTypo: {
        fontSize: 12,
        fontFamily: "Inter-Light",
        fontWeight: "300",
        textAlign: "left",
        color: "#000",
        width: 354,
        position: "absolute"
    },
    step1Layout: {
        height: 152,
        width: 334,
        position: "absolute"
    },
    enterTypo: {
        color: "#b3b3b3",
        fontFamily: "Inter-Regular",
        lineHeight: 16,
        fontSize: 16,
        textAlign: "left"
    },
    inputLayout: {
        minWidth: 120,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: "#d9d9d9",
        left: 39.5,
        width: 334,
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "solid",
        position: "absolute",
        backgroundColor: "#fff"
    },
    navbarLayout: {
        width: 432,
        position: "absolute"
    },
    iconPosition: {
        left: "16.67%",
        position: "absolute"
    },
    supsupTodoDashboardEmail: {
        width: "100%",
        maxWidth: "100%",
        flex: 1,
        backgroundColor: "#fff"
    },
    supsupTodoDashboardEmailChild: {
        top: -140,
        left: -76,
        width: 615,
        height: 476.25,
        position: "absolute"
    },
    requestMilkForYourBabyParent: {
        top: 128,
        height: 610,
        width: 354,
        left: 33,
        position: "absolute"
    },
    requestMilkFor: {
        left: 0,
        top: 0
    },
    howItWorks: {
        top: 84,
        fontSize: 20,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontStyle: "italic",
        textAlign: "left",
        color: "#000",
        left: 0,
        position: "absolute"
    },
    getSafeDonor: {
        fontFamily: "Inter-Light",
        fontWeight: "300",
        fontSize: 16,
        top: 33,
        textAlign: "left",
        color: "#000",
        left: 0,
        width: 354,
        position: "absolute"
    },
    step2Box: {
        top: 256,
        left: 0
    },
    getNotified: {
        top: 37,
        left: 95,
        position: "absolute"
    },
    step2: {
        top: 19,
        left: 95,
        position: "absolute"
    },
    youllBePlaced: {
        top: 57,
        left: 95,
        position: "absolute"
    },
    step2BoxChild: {
        height: 102,
        width: 343,
        position: "absolute"
    },
    step2BoxItem: {
        left: 17,
        width: 67,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        height: 62,
        top: 20
    },
    iconBellRing: {
        left: 32,
        height: 38,
        width: 38,
        top: 33,
        position: "absolute"
    },
    step3Box: {
        top: 382,
        left: 0
    },
    receiveDonorMilk: {
        top: 38,
        left: 95,
        position: "absolute"
    },
    claimYourMilk: {
        top: 58,
        left: 95,
        position: "absolute"
    },
    hugeiconsbabyBottle: {
        left: 30,
        width: 40
    },
    orderBox: {
        top: 508,
        left: 4
    },
    orderBoxChild: {
        borderColor: "#1e1e1e",
        backgroundColor: "#ffd230",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        elevation: 4,
        boxShadow: "0px 1px 4px #000",
        height: 102,
        width: 343,
        left: 0,
        top: 0,
        position: "absolute"
    },
    orderMilk: {
        top: 42,
        fontSize: 14,
        textAlign: "left",
        color: "#000",
        fontFamily: "Inter-SemiBold",
        fontWeight: "600"
    },
    readyToProceed: {
        top: 23,
        fontSize: 15,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        fontStyle: "italic",
        textAlign: "left",
        color: "#000"
    },
    tapToPlace: {
        top: 62,
        width: 242,
        fontSize: 11,
        fontFamily: "Inter-Light",
        fontWeight: "300",
        textAlign: "left",
        color: "#000"
    },
    orderBoxItem: {
        left: 252,
        width: 67,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        height: 62,
        top: 19
    },
    arrowIcon: {
        width: "11.66%",
        right: "10.2%",
        left: "78.13%"
    },
    step1Box: {
        top: 129,
        left: 0
    },
    submitAnInquiry: {
        top: 41,
        left: 95,
        position: "absolute"
    },
    step1: {
        top: 22,
        left: 95,
        position: "absolute"
    },
    fillOutThe: {
        top: 61,
        left: 95,
        position: "absolute"
    },
    orderIcon: {
        top: 29,
        width: 43,
        height: 43
    },
    supsupTodoDashboardEmailItem: {
        top: 776,
        width: 412,
        height: 576,
        left: 0,
        position: "absolute",
        backgroundColor: "#fff"
    },
    button: {
        marginLeft: -149,
        top: 1261,
        left: "50%",
        borderColor: "#ffd230",
        width: 300,
        height: 42,
        padding: 11,
        overflow: "hidden",
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#ffd230",
        borderStyle: "solid"
    },
    button2: {
        fontWeight: "700",
        fontFamily: "Inter-Bold",
        color: "#1e1e1e",
        textAlign: "center",
        lineHeight: 16,
        fontSize: 16
    },
    inquiry: {
        top: 1216,
        left: 33,
        fontSize: 12
    },
    step1Box2: {
        top: 1059,
        left: 40
    },
    step1BoxInner: {
        borderWidth: 1,
        borderColor: "#898787",
        borderRadius: 10,
        elevation: 4,
        boxShadow: "0px 1px 4px #000",
        borderStyle: "solid",
        left: 0,
        top: 0
    },
    enterInquiry: {
        top: 120,
        left: 15,
        width: 275,
        position: "absolute"
    },
    input: {
        top: 828.5
    },
    enterYourFirst: {
        flex: 1
    },
    contactUs: {
        top: 787,
        left: 21
    },
    firstName: {
        top: 874,
        left: 33,
        fontSize: 12
    },
    lastName: {
        top: 952,
        left: 35
    },
    input2: {
        top: 906.5
    },
    emailAddress: {
        top: 1029,
        left: 31
    },
    input3: {
        top: 983.5
    },
    navbar: {
        top: 834,
        left: -7,
        height: 83,
        display: "none"
    },
    subtractIcon: {
        height: 63,
        top: 20,
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
        opacity: 0,
        height: 43,
        width: 40
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
        height: 35,
        width: 38
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
        top: 0
    }
});

export default SupsupTodoDashboardEmailInquiry;
