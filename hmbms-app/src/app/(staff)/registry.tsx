// src/app/(staff)/registry.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    ActivityIndicator, TouchableOpacity, TextInput,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { PROGRAM_THEMES } from '../../constants/programTheme';
import type { ProgramId } from '../../types/database.types';

interface Props {
    programId: ProgramId;
}

interface Beneficiary {
    id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    contact_num: string | null;
    registered_at: string;
}

interface Donor {
    donor_id: string;
    first_name: string;
    last_name: string;
    contact_num: string | null;
    registered_at: string;
}

type SubTab = 'beneficiaries' | 'donors';

const RegistryScreen: React.FC<Props> = ({ programId }) => {
    const theme = PROGRAM_THEMES[programId];
    const [subTab, setSubTab] = useState<SubTab>('beneficiaries');
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [donors, setDonors] = useState<Donor[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        if (subTab === 'beneficiaries') {
            const { data, error } = await supabase
                .from('beneficiaries')
                .select('id, first_name, last_name, email, contact_num, registered_at')
                .eq('program_id', programId)
                .order('registered_at', { ascending: false });
            if (!error && data) setBeneficiaries(data as Beneficiary[]);
        } else {
            const { data, error } = await supabase
                .from('donors')
                .select('donor_id, first_name, last_name, contact_num, created_at')
                .eq('program_id', programId)
                .order('created_at', { ascending: false });
            if (!error && data)
                setDonors(data.map((d: any) => ({ ...d, registered_at: d.created_at })) as Donor[]);
        }
        setLoading(false);
    }, [subTab, programId]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const filtered = subTab === 'beneficiaries'
        ? beneficiaries.filter(b =>
            `${b.first_name} ${b.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
            (b.email ?? '').toLowerCase().includes(search.toLowerCase())
          )
        : donors.filter(d =>
            `${d.first_name} ${d.last_name}`.toLowerCase().includes(search.toLowerCase())
          );

    return (
        <View style={styles.container}>
            {/* Sub-tab toggle */}
            <View style={[styles.tabRow, { backgroundColor: theme.primaryLight }]}>
                {(['beneficiaries', 'donors'] as SubTab[]).map(t => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.tabBtn, subTab === t && { backgroundColor: theme.primary }]}
                        onPress={() => { setSubTab(t); setSearch(''); }}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabBtnText, subTab === t && styles.tabBtnTextActive]}>
                            {t === 'beneficiaries' ? 'Beneficiaries' : 'Donors'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Search */}
            <View style={styles.searchRow}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Search ${subTab}…`}
                    placeholderTextColor="#AAAAAA"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={theme.accent} style={{ marginTop: 40 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.list}>
                    {filtered.length === 0 ? (
                        <Text style={styles.emptyText}>No {subTab} found for {theme.name}.</Text>
                    ) : (
                        filtered.map((item: any) => {
                            const avatarLetter = (item.first_name?.[0] ?? '?').toUpperCase();
                            return (
                                <View
                                    key={item.id ?? item.donor_id}
                                    style={[styles.card, { borderWidth: 1, borderColor: '#E3E3E3' }]}
                                >
                                    <View style={styles.cardRow}>
                                        <View style={[styles.avatarCircle, { backgroundColor: theme.primary }]}>
                                            <Text style={styles.avatarLetter}>{avatarLetter}</Text>
                                        </View>
                                        <View style={styles.cardBody}>
                                            <Text style={styles.cardName}>
                                                {item.first_name} {item.last_name}
                                            </Text>
                                            {item.email ? (
                                                <Text style={styles.cardSub}>{item.email}</Text>
                                            ) : null}
                                            {item.contact_num ? (
                                                <Text style={styles.cardSub}>{item.contact_num}</Text>
                                            ) : null}
                                            <Text style={styles.cardDate}>
                                                Registered:{' '}
                                                {new Date(item.registered_at).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', year: 'numeric',
                                                })}
                                            </Text>
                                        </View>
                                    </View>
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
    tabRow:             { flexDirection: 'row', margin: 16, borderRadius: 12, padding: 4 },
    tabBtn:             { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
    tabBtnText:         { fontSize: 14, fontWeight: '600', color: '#555555' },
    tabBtnTextActive:   { color: '#000000', fontWeight: '700' },
    searchRow:          { paddingHorizontal: 16, marginBottom: 12 },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 11,
        fontSize: 14,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    list:               { paddingHorizontal: 16, paddingBottom: 40 },
    emptyText:          { textAlign: 'center', marginTop: 40, color: '#AAAAAA', fontSize: 15 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 3,
        elevation: 2,
    },
    cardRow:            { flexDirection: 'row', alignItems: 'center' },
    avatarCircle: {
        width: 46, height: 46, borderRadius: 23,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 14,
    },
    avatarLetter:       { fontSize: 20, fontWeight: '700', color: '#000000' },
    cardBody:           { flex: 1 },
    cardName:           { fontSize: 16, fontWeight: '700', color: '#000000', marginBottom: 2 },
    cardSub:            { fontSize: 13, color: '#555555', marginBottom: 1 },
    cardDate:           { fontSize: 12, color: '#AAAAAA', marginTop: 4 },
});

export default RegistryScreen;