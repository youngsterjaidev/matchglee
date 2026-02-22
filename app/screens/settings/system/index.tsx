import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import SectionLabel from '../../../../components/settings/SectionLabel';
import ToggleRow from '../../../../components/settings/ToggleRow';

const AppSystemPreferencesScreen: React.FC = () => {
  const router = useRouter();
  const [dataSaver, setDataSaver] = useState(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const displayRows = useMemo(
    () => [
      { key: 'language', title: 'Language', value: 'English', route: '/screens/settings/system/language' },
      { key: 'theme', title: 'Theme', value: 'Dark Mode', route: '/screens/settings/system/theme' },
    ],
    []
  );

  const handleNavigate = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const displayContent = useMemo(
    () =>
      displayRows.map((row, index) => {
        const showDivider = index < displayRows.length - 1;
        const onPress = () => handleNavigate(row.route);

        return (
          <View key={row.key}>
            <TouchableOpacity style={styles.displayRow} activeOpacity={0.85} onPress={onPress}>
              <Text style={styles.displayTitle}>{row.title}</Text>
              <View style={styles.displayRight}>
                <Text style={styles.displayValue}>{row.value}</Text>
                <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
              </View>
            </TouchableOpacity>
            {showDivider ? <View style={styles.divider} /> : null}
          </View>
        );
      }),
    [displayRows, handleNavigate]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App & System Preferences</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Control how MatchGlee appears and performs across your devices with display and performance preferences.
        </Text>

        <SectionLabel text="Display" />
        <CardContainer>{displayContent}</CardContainer>

        <SectionLabel text="Data & Performance" />
        <CardContainer withDividers>
          <ToggleRow
            icon="speedometer-outline"
            title="Data Saver Mode"
            subtitle="Reduce background data usage and media quality"
            value={dataSaver}
            onValueChange={setDataSaver}
          />
        </CardContainer>
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
  description: {
    marginHorizontal: 18,
    marginTop: 20,
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    fontFamily: FontFamily.regular,
  },
  displayRow: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  displayRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayValue: {
    marginRight: 8,
    fontSize: 15,
    color: '#6B7280',
    fontFamily: FontFamily.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F4',
    marginHorizontal: 18,
  },
});

export default AppSystemPreferencesScreen;
