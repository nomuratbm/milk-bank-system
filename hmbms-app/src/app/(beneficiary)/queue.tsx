// src/app/(beneficiary)/queue.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface OrderData {
    queue_position: number | null;
    estimated_wait_days: number | null;
    request_id: string | null;
    date_time: string | null;
    baby_age: string | null;
    milk_volume: string | null;
}

interface QueueScreenProps {
    onNavigateToInquiry?: () => void;
}

const QueueScreen: React.FC<QueueScreenProps> = ({ onNavigateToInquiry }) => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState<OrderData>({
        queue_position: null,
        estimated_wait_days: null,
        request_id: null,
        date_time: null,
        baby_age: null,
        milk_volume: null,
    });

    useEffect(() => {
        fetchQueueData();
    }, []);

    const fetchQueueData = async () => {
        setIsLoading(true);
        try {
            // === SUPABASE INTEGRATION ===
            /*
            const { data: user } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('milk_requests')
                .select('*')
                .eq('user_id', user?.user?.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
            if (data && !error) {
                setOrderData({
                    queue_position: data.queue_position || null,
                    estimated_wait_days: data.estimated_wait_days || null,
                    request_id: data.request_id || null,
                    date_time: data.created_at || null,
                    baby_age: data.baby_age || null,
                    milk_volume: data.milk_volume || null,
                });
            }
            */
            setTimeout(() => {
                setOrderData({
                    queue_position: 67,
                    estimated_wait_days: 0,
                    request_id: '0001202606111458',
                    date_time: 'June 11, 2026 @2:58PM',
                    baby_age: '6 months old',
                    milk_volume: '500ml',
                });
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching queue data:', error);
            setIsLoading(false);
        }
    };

    const hasPosition = orderData.queue_position !== null;
    const maxWaitDays = 30;
    const waitDays = orderData.estimated_wait_days !== null ? orderData.estimated_wait_days : maxWaitDays;
    const progressPercent = Math.max(0, Math.min(100, ((maxWaitDays - waitDays) / maxWaitDays) * 100));
    const isCompleted = waitDays === 0;
    const progressColor = isCompleted ? '#4CD964' : theme.accent;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={styles.mainContent}>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Awesome!</Text>
                        <Text style={styles.cardTitle}>Your milk's on its way! 🥰</Text>
                        <Text style={styles.queueLabel}>Queue Position:</Text>

                        {isLoading ? (
                            <ActivityIndicator size="large" color={theme.accent} style={{ marginVertical: 20 }} />
                        ) : (
                            <Text style={styles.queueNumber}>{hasPosition ? orderData.queue_position : '- -'}</Text>
                        )}

                        <View style={styles.progressBarContainer}>
                            <View style={styles.progressBarTrack} />
                            <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: progressColor }]} />
                            <View style={[styles.progressDot, { left: `${progressPercent}%`, backgroundColor: progressColor }]} />
                        </View>

                        <Text style={styles.statusText}>Your order has been processed.</Text>
                        <Text style={styles.waitTimeText}>
                            Estimated Wait Time: {orderData.estimated_wait_days ? `${orderData.estimated_wait_days} days.` : '--'}
                        </Text>
                    </View>

                    <Text style={styles.relaxText}>We'll let you know once your milk's ready. Sit back and relax!</Text>

                    <View style={styles.card}>
                        <Text style={styles.orderDetailsTitle}>Order Details</Text>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Request ID: </Text>
                            <Text style={styles.detailValue}>{orderData.request_id || '--'}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Date and Time: </Text>
                            <Text style={styles.detailValue}>{orderData.date_time || '--'}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Baby's Age: </Text>
                            <Text style={styles.detailValue}>{orderData.baby_age || '--'}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Milk Volume: </Text>
                            <Text style={styles.detailValue}>{orderData.milk_volume || '--'}</Text>
                        </View>
                    </View>

                    <Text style={styles.supportText}>
                        Questions? Contact support{' '}
                        <Text style={styles.supportLink} onPress={onNavigateToInquiry}>here</Text>.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollContent: { flexGrow: 1, paddingBottom: 40 },
    mainContent: { paddingHorizontal: 24, paddingTop: 20 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: '#E3E3E3', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, alignItems: 'center' },
    cardTitle: { fontSize: 18, fontWeight: '700', color: '#000000', textAlign: 'center' },
    queueLabel: { fontSize: 18, fontWeight: '600', color: '#000000', marginTop: 16 },
    queueNumber: { fontSize: 84, fontWeight: '800', color: '#000000', lineHeight: 90, marginTop: -5, marginBottom: 10 },
    progressBarContainer: { width: '100%', height: 6, justifyContent: 'center', marginVertical: 16 },
    progressBarTrack: { width: '100%', height: 4, backgroundColor: '#E6E6E6', borderRadius: 2 },
    progressBarFill: { position: 'absolute', left: 0, height: 4, borderRadius: 2 },
    progressDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, marginLeft: -4 },
    statusText: { fontSize: 14, fontWeight: '400', color: '#000000', marginBottom: 4 },
    waitTimeText: { fontSize: 13, fontWeight: '400', color: '#000000' },
    relaxText: { fontSize: 22, fontWeight: '700', color: '#000000', textAlign: 'left', marginBottom: 24, lineHeight: 28 },
    orderDetailsTitle: { fontSize: 20, fontWeight: '700', color: '#000000', marginBottom: 16, alignSelf: 'flex-start' },
    detailRow: { flexDirection: 'row', width: '100%', marginBottom: 8 },
    detailLabel: { fontSize: 14, fontWeight: '700', color: '#000000' },
    detailValue: { fontSize: 14, fontWeight: '400', color: '#333333' },
    supportText: { fontSize: 13, color: '#000000', textAlign: 'center', marginTop: 10, marginBottom: 20 },
    supportLink: { color: '#000000', fontWeight: '700', textDecorationLine: 'underline' },
});

export default QueueScreen;