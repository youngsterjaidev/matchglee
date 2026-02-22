import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import PrimaryGradientButton from '../../../../components/settings/PrimaryGradientButton';
import SectionLabel from '../../../../components/settings/SectionLabel';

const SUMMARY_ROWS = [
  { key: 'photos', label: 'Profile Photos', size: '45 MB' },
  { key: 'messages', label: 'Messages', size: '12 MB' },
  { key: 'cache', label: 'Cached Data', size: '127 MB' },
];

const CLEAR_ROWS = [
  {
    key: 'cache',
    icon: 'layers-outline' as const,
    title: 'Clear Cache',
    subtitle: 'Remove temporary files to free storage',
  },
  {
    key: 'search',
    icon: 'search-outline' as const,
    title: 'Clear Search History',
    subtitle: 'Delete recent profile and community searches',
  },
  {
    key: 'media',
    icon: 'images-outline' as const,
    title: 'Clear Message Media Cache',
    subtitle: 'Delete cached images and videos from chats',
  },
];

const DataRightsScreen: React.FC = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleExport = useCallback(() => {
    router.push('/screens/settings/data/usage');
  }, [router]);

  const summaryContent = useMemo(
    () =>
      SUMMARY_ROWS.map((row, index) => {
        const showDivider = index < SUMMARY_ROWS.length - 1;

        return (
          <View key={row.key}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{row.label}</Text>
              <Text style={styles.summarySize}>{row.size}</Text>
            </View>
            {showDivider ? <View style={styles.divider} /> : null}
          </View>
        );
      }),
    []
  );

  const clearDataContent = useMemo(
    () =>
      CLEAR_ROWS.map((row, index) => {
        const showDivider = index < CLEAR_ROWS.length - 1;

        return (
          <View key={row.key}>
            <View style={styles.clearRow}>
              <View style={styles.clearIconCircle}>
                <Ionicons name={row.icon} size={18} color="#7B4CFF" />
              </View>
              <View style={styles.clearTextWrap}>
                <Text style={styles.clearTitle}>{row.title}</Text>
                <Text style={styles.clearSubtitle}>{row.subtitle}</Text>
              </View>
              <Ionicons name="trash-outline" size={18} color="#9CA3AF" />
            </View>
            {showDivider ? <View style={styles.divider} /> : null}
          </View>
        );
      }),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data & Rights</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Download Your Data" />
        <CardContainer>
          <View style={styles.exportCardInner}>
            <View style={styles.exportIconCircle}>
              <Ionicons name="download-outline" size={22} color="#7B4CFF" />
            </View>
            <Text style={styles.exportTitle}>Export Your MatchGlee Data</Text>
            <Text style={styles.exportDescription}>
              Request an archive of your profile data, messages, and account activity.
            </Text>
            <PrimaryGradientButton text="Request Data Export" onPress={handleExport} style={styles.exportButton} />
            <Text style={styles.exportNote}>Export requests are delivered within 24 hours.</Text>
          </View>
        </CardContainer>

        <SectionLabel text="Data Usage Summary" />
        <CardContainer>{summaryContent}</CardContainer>

        <SectionLabel text="Clear Data" />
        <CardContainer>{clearDataContent}</CardContainer>
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
  exportCardInner: {
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  exportIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F4EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportTitle: {
    marginTop: 12,
    fontSize: 17,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  exportDescription: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#8A8F9C',
    lineHeight: 20,
    fontFamily: FontFamily.regular,
  },
  exportButton: {
    marginTop: 16,
    width: '100%',
  },
  exportNote: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
    color: '#8A8F9C',
    fontFamily: FontFamily.regular,
  },
  summaryRow: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.medium,
  },
  summarySize: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  clearRow: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F4EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearTextWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  clearTitle: {
    fontSize: 15,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  clearSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A8F9C',
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginHorizontal: 18,
  },
});

export default DataRightsScreen;
