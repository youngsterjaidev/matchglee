import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import InfoBox from '../../../../components/settings/InfoBox';
import RadioCardGroup from '../../../../components/settings/RadioCardGroup';
import SectionLabel from '../../../../components/settings/SectionLabel';
import ToggleRow from '../../../../components/settings/ToggleRow';

const DiscoverySettingsScreen: React.FC = () => {
  const router = useRouter();
  const [recommendationType, setRecommendationType] = useState('balanced');
  const [skillsDiscovery, setSkillsDiscovery] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discovery Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Profile Recommendation Type" />
        <RadioCardGroup
          options={[
            { label: 'Balanced Recommendations', value: 'balanced' },
            { label: 'Skills-Based Priority', value: 'skills-priority' },
            { label: 'Network-Based Priority', value: 'network-priority' },
          ]}
          selectedValue={recommendationType}
          onSelect={setRecommendationType}
        />

        <SectionLabel text="Additional Discovery" />
        <CardContainer withDividers>
          <ToggleRow
            icon="sparkles-outline"
            title="Skills-Based Discovery"
            subtitle="Boost matching based on your listed skills"
            value={skillsDiscovery}
            onValueChange={setSkillsDiscovery}
          />
        </CardContainer>

        <InfoBox text="Your profile may appear when people search for specific skills relevant to your expertise." />
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
    fontSize: 20,
    marginLeft: 12,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
});

export default DiscoverySettingsScreen;
