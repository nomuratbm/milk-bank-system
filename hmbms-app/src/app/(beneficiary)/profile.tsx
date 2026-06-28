// src/app/(beneficiary)/queue.tsx
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const QueueScreen: React.FC = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.placeholderBadge, { backgroundColor: theme.primaryLight }]}>
                <Text style={styles.placeholderText}>Queue screen coming soon</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40, backgroundColor: '#FFFFFF' },
    placeholderBadge: { borderRadius: 12, padding: 20, alignItems: 'center' },
    placeholderText: { fontSize: 16, fontWeight: '600', color: '#000000' },
});

export default QueueScreen;
