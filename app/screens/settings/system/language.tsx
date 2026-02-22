import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import PrimaryGradientButton from '../../../../components/settings/PrimaryGradientButton';
import RadioCardGroup, { RadioOption } from '../../../../components/settings/RadioCardGroup';
import SectionLabel from '../../../../components/settings/SectionLabel';

const LANGUAGE_OPTIONS: RadioOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
];

const LanguageScreen: React.FC = () => {
  const router = useRouter();
  const [language, setLanguage] = useState('en');

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSave = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Select Language" />
        <CardContainer>
          <RadioCardGroup options={LANGUAGE_OPTIONS} selectedValue={language} onSelect={setLanguage} embedded compactSelected />
        </CardContainer>

        <PrimaryGradientButton text="Save Changes" onPress={handleSave} style={styles.primaryButton} />
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
  primaryButton: {
    marginHorizontal: 18,
    marginTop: 30,
  },
});

export default LanguageScreen;
