import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import SectionLabel from '../../../../components/settings/SectionLabel';

const POLICIES = [
  { key: 'terms', title: 'Terms of Service' },
  { key: 'privacy', title: 'Privacy Policy' },
  { key: 'guidelines', title: 'Community Guidelines' },
];

const ABOUT = [
  { key: 'version', title: 'MatchGlee v2.0 • Build 2024.05', subtitle: 'Version Information' },
  { key: 'copyright', title: '© 2026 MatchGlee, Inc.', subtitle: 'All rights reserved' },
];

const OPEN_SOURCE = [{ key: 'licenses', title: 'Open Source Licenses' }];

const LegalTransparencyScreen: React.FC = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const renderChevronRows = useCallback((rows: { key: string; title: string; subtitle?: string }[]) => {
    return rows.map((row, index) => {
      const showDivider = index < rows.length - 1;

      return (
        <View key={row.key}>
          <TouchableOpacity style={styles.row} activeOpacity={0.85}>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              {row.subtitle ? <Text style={styles.rowSubtitle}>{row.subtitle}</Text> : null}
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
          </TouchableOpacity>
          {showDivider ? <View style={styles.divider} /> : null}
        </View>
      );
    });
  }, []);

  const policyRows = useMemo(() => renderChevronRows(POLICIES), [renderChevronRows]);
  const aboutRows = useMemo(() => renderChevronRows(ABOUT), [renderChevronRows]);
  const ossRows = useMemo(() => renderChevronRows(OPEN_SOURCE), [renderChevronRows]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal & Transparency</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Policies" />
        <CardContainer>{policyRows}</CardContainer>

        <SectionLabel text="About" />
        <CardContainer>{aboutRows}</CardContainer>

        <SectionLabel text="Open Source" />
        <CardContainer>{ossRows}</CardContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
  header: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F0F1F4',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 20,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 28,
  },
  row: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  rowTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  rowSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A8F9C',
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginHorizontal: 18,
  },
});

export default LegalTransparencyScreen;
