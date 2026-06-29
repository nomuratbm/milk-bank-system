// src/app/(staff)/tracker.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { ProgramId } from '../../types/database.types';

interface Props {
    programId: ProgramId;
}

type StatusFilter = 'all' | 'pending' | 'ready_for_dispensing' | 'discarded';

interface BatchRow {
    batch_id: string;
    status: string;
    pre_pasteurization_ml: number | null;
    post_pasteurization_ml: number | null;
    submitted_date: string | null;
    result_date: string | null;
    lab_result: string | null;
    collection_logs: {
        collection_date: string;
        volume_ml: number;
        donors: { first_name: string; last_name: string } | null;
    } | null;
    inventory: { volume_available_ml: number }[] | null;
}

const STATUS_LABELS: Record<string, string> = {
    pending:              'Pending',
    ready_for_dispensing: 'Ready',
    discarded:            'Discarded',
};

const STATUS_COLORS: Record<string, string> = {
    pending:              '#F5A623',
    ready_for_dispensing: '#4CD964',
    discarded:            '#FF3B30',
};

const TrackerScreen: React.FC<Props> = ({ programId }) => {
    const theme = PROGRAM_THEMES[programId];
    const [batches, setBatches] = useState<BatchRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<StatusFilter>('all');

    const fetchBatches = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('milk_batches')
            .select(`
                batch_id, status,
                pre_pasteurization_ml, post_pasteurization_ml,
                submitted_date, result_date, lab_result,
                collection_logs!inner (
                    collection_date, volume_ml,
                    donors ( first_name, last_name )
                ),
                inventory ( volume_available_ml )
            `)
            .eq('collection_logs.program_id', programId)
            .order('updated_at', { ascending: false });

        if (!error && data) setBatches(data as unknown as BatchRow[]);
        setLoading(false);
    }, [programId]);

    useEffect(() => { fetchBatches(); }, [fetchBatches]);

    const visible = filter === 'all' ? batches : batches.filter(b => b.status === filter);

    return (
        <View style={styles.container}>
            {/* Filter chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRow}
            >
                {(['all', 'pending', 'ready_for_dispensing', 'discarded'] as StatusFilter[]).map(s => (
                    <TouchableOpacity
                        key={s}
                        style={[
                            styles.filterChip,
                            filter === s && { backgroundColor: theme.primary, borderColor: '#000000' },
                        ]}
                        onPress={() => setFilter(s)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.filterChipText, filter === s && { color: '#000000', fontWeight: '700' }]}>
                            {s === 'all' ? 'All' : STATUS_LABELS[s]}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {loading ? (
                <ActivityIndicator size="large" color={theme.accent} style={{ marginTop: 40 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.list}>
                    {visible.length === 0 ? (
                        <Text style={styles.emptyText}>No batches found for {theme.name}.</Text>
                    ) : (
                        visible.map(batch => {
                            const donor = batch.collection_logs?.donors;
                            const inventoryVol = batch.inventory?.[0]?.volume_available_ml ?? null;
                            const statusColor = STATUS_COLORS[batch.status] ?? '#AAAAAA';
                            return (
                                <View
                                    key={batch.batch_id}
                                    style={[styles.card, { borderWidth: 1, borderColor: '#E3E3E3' }]}
                                >
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.batchId} numberOfLines={1}>
                                            Batch {batch.batch_id.slice(0, 8).toUpperCase()}
                                        </Text>
                                        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                                            <Text style={styles.statusBadgeText}>
                                                {STATUS_LABELS[batch.status] ?? batch.status}
                                            </Text>
                                        </View>
                                    </View>

                                    {donor ? (
                                        <Text style={styles.cardSub}>
                                            Donor: {donor.first_name} {donor.last_name}
                                        </Text>
                                    ) : null}
                                    {batch.collection_logs?.collection_date ? (
                                        <Text style={styles.cardSub}>
                                            Collected:{' '}
                                            {new Date(batch.collection_logs.collection_date).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric',
                                            })}
                                        </Text>
                                    ) : null}

                                    <View style={styles.volumeRow}>
                                        {[
                                            { label: 'Pre-Pasteur.',  value: batch.pre_pasteurization_ml },
                                            { label: 'Post-Pasteur.', value: batch.post_pasteurization_ml },
                                            { label: 'Available',     value: inventoryVol },
                                        ].map(({ label, value }) => (
                                            <View key={label} style={[styles.volumeItem, { borderTopColor: theme.primary }]}>
                                                <Text style={styles.volumeLabel}>{label}</Text>
                                                <Text style={styles.volumeValue}>
                                                    {value != null ? `${value} ml` : '—'}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                    {batch.lab_result ? (
                                        <Text style={styles.labResult}>Lab: {batch.lab_result}</Text>
                                    ) : null}
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:          { flex: 1, backgroundColor: '#FFFFFF' },
    filterRow:          { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
    filterChip: {
        paddingHorizontal: 16, paddingVertical: 8,
        borderRadius: 20, backgroundColor: '#FFFFFF',
        borderWidth: 1, borderColor: '#E3E3E3',
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05, shadowRadius: 2, elevation: 1,
    },
    filterChipText:     { fontSize: 13, fontWeight: '600', color: '#555555' },
    list:               { paddingHorizontal: 16, paddingBottom: 40 },
    emptyText:          { textAlign: 'center', marginTop: 40, color: '#AAAAAA', fontSize: 15 },
    card: {
        backgroundColor: '#FFFFFF', borderRadius: 12,
        padding: 16, marginBottom: 12,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
    },
    cardHeader:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    batchId:            { fontSize: 15, fontWeight: '700', color: '#000000', flex: 1 },
    statusBadge:        { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3, marginLeft: 8 },
    statusBadgeText:    { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
    cardSub:            { fontSize: 13, color: '#555555', marginBottom: 2 },
    volumeRow:          { flexDirection: 'row', gap: 8, marginTop: 12 },
    volumeItem: {
        flex: 1, backgroundColor: '#F8F8F8',
        borderRadius: 10, padding: 10, alignItems: 'center',
        borderTopWidth: 3,
    },
    volumeLabel:        { fontSize: 10, color: '#AAAAAA', fontWeight: '600', marginBottom: 4 },
    volumeValue:        { fontSize: 14, fontWeight: '700', color: '#000000' },
    labResult:          { fontSize: 12, color: '#777777', marginTop: 10, fontStyle: 'italic' },
});

export default TrackerScreen;