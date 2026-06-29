// src/app/(staff)/reports.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { ProgramId } from '../../types/database.types';

interface Props {
    programId: ProgramId;
}

interface TransactionRow {
    transaction_id: string;
    volume_dispensed_ml: number;
    deposit_amount: number | null;
    status: string;
    transaction_date: string;
    beneficiaries: { first_name: string; last_name: string } | null;
    inventory: {
        milk_batches: {
            collection_logs: { program_id: number } | null;
        } | null;
    } | null;
}

interface Summary {
    totalDispensed: number;
    totalTransactions: number;
    completedTransactions: number;
    totalDeposit: number;
}

const ReportsScreen: React.FC<Props> = ({ programId }) => {
    const theme = PROGRAM_THEMES[programId];
    const [transactions, setTransactions] = useState<TransactionRow[]>([]);
    const [summary, setSummary] = useState<Summary>({
        totalDispensed: 0,
        totalTransactions: 0,
        completedTransactions: 0,
        totalDeposit: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('transactions')
            .select(`
                transaction_id, volume_dispensed_ml, deposit_amount,
                status, transaction_date,
                beneficiaries ( first_name, last_name ),
                inventory (
                    milk_batches (
                        collection_logs ( program_id )
                    )
                )
            `)
            .order('transaction_date', { ascending: false });

        if (!error && data) {
            const filtered = (data as unknown as TransactionRow[]).filter(
                t => t.inventory?.milk_batches?.collection_logs?.program_id === programId
            );
            setTransactions(filtered);
            setSummary({
                totalTransactions:      filtered.length,
                completedTransactions:  filtered.filter(t => t.status === 'completed').length,
                totalDispensed:         filtered.reduce((acc, t) => acc + (t.volume_dispensed_ml ?? 0), 0),
                totalDeposit:           filtered.reduce((acc, t) => acc + (t.deposit_amount ?? 0), 0),
            });
        }
        setLoading(false);
    }, [programId]);

    useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

    const summaryCards = [
        { label: 'Total Transactions', value: summary.totalTransactions.toString() },
        { label: 'Completed',          value: summary.completedTransactions.toString() },
        { label: 'Total Dispensed',    value: `${summary.totalDispensed} ml` },
        { label: 'Total Deposit',      value: `₱${summary.totalDeposit.toLocaleString()}` },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Summary cards */}
            <Text style={styles.sectionHeading}>Summary</Text>
            <View style={styles.summaryGrid}>
                {summaryCards.map(({ label, value }) => (
                    <View key={label} style={[styles.summaryCard, { borderTopColor: theme.primary, borderTopWidth: 4 }]}>
                        <Text style={styles.summaryValue}>{value}</Text>
                        <Text style={styles.summaryLabel}>{label}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionHeading}>Transaction History</Text>

            {loading ? (
                <ActivityIndicator size="large" color={theme.accent} style={{ marginTop: 24 }} />
            ) : transactions.length === 0 ? (
                <Text style={styles.emptyText}>No transactions found for {theme.name}.</Text>
            ) : (
                transactions.map(t => {
                    const ben = t.beneficiaries;
                    const isCompleted = t.status === 'completed';
                    const avatarLetter = (ben?.first_name?.[0] ?? '?').toUpperCase();
                    return (
                        <View
                            key={t.transaction_id}
                            style={[styles.card, { borderWidth: 1, borderColor: '#E3E3E3' }]}
                        >
                            <View style={styles.cardRow}>
                                <View style={[styles.avatarCircle, { backgroundColor: theme.primary }]}>
                                    <Text style={styles.avatarLetter}>{avatarLetter}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <View style={styles.cardHeaderRow}>
                                        <Text style={styles.cardName}>
                                            {ben ? `${ben.first_name} ${ben.last_name}` : 'Unknown'}
                                        </Text>
                                        <View style={[
                                            styles.statusDot,
                                            { backgroundColor: isCompleted ? '#4CD964' : '#FF3B30' }
                                        ]} />
                                    </View>
                                    <Text style={styles.cardDate}>
                                        {new Date(t.transaction_date).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric',
                                            hour: 'numeric', minute: '2-digit', hour12: true,
                                        })}
                                    </Text>
                                    <View style={styles.metricsRow}>
                                        <Text style={styles.cardMetric}>{t.volume_dispensed_ml} ml</Text>
                                        {t.deposit_amount != null && (
                                            <Text style={styles.cardMetric}>₱{t.deposit_amount.toLocaleString()}</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:          { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 },
    sectionHeading:     { fontSize: 22, fontWeight: '700', color: '#000000', marginTop: 20, marginBottom: 12 },
    emptyText:          { textAlign: 'center', marginTop: 24, color: '#AAAAAA', fontSize: 15 },

    summaryGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
    summaryCard: {
        width: '47%', backgroundColor: '#FFFFFF',
        borderRadius: 12, padding: 14,
        borderWidth: 1, borderColor: '#E3E3E3',
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
    },
    summaryValue:       { fontSize: 24, fontWeight: '800', color: '#000000', marginBottom: 4 },
    summaryLabel:       { fontSize: 12, fontWeight: '600', color: '#888888' },

    card: {
        backgroundColor: '#FFFFFF', borderRadius: 12,
        padding: 14, marginBottom: 12,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
    },
    cardRow:            { flexDirection: 'row', alignItems: 'center' },
    avatarCircle: {
        width: 46, height: 46, borderRadius: 23,
        justifyContent: 'center', alignItems: 'center', marginRight: 14,
    },
    avatarLetter:       { fontSize: 20, fontWeight: '700', color: '#000000' },
    cardBody:           { flex: 1 },
    cardHeaderRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
    cardName:           { fontSize: 15, fontWeight: '700', color: '#000000', flex: 1 },
    statusDot:          { width: 10, height: 10, borderRadius: 5, marginLeft: 8 },
    cardDate:           { fontSize: 12, color: '#AAAAAA', marginBottom: 6 },
    metricsRow:         { flexDirection: 'row', gap: 16 },
    cardMetric:         { fontSize: 13, fontWeight: '600', color: '#555555' },
});

export default ReportsScreen;