import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import InfoBox from '../../../../components/settings/InfoBox';
import SectionLabel from '../../../../components/settings/SectionLabel';
import ToggleRow from '../../../../components/settings/ToggleRow';

const VisibilityStatusScreen: React.FC = () => {
  const router = useRouter();
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showLastActive, setShowLastActive] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  const areAllOff = useMemo(
    () => !showOnlineStatus && !showLastActive && !readReceipts,
    [readReceipts, showLastActive, showOnlineStatus]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Status & Activity</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Visibility Settings" />

        <CardContainer withDividers>
          <ToggleRow
            icon="radio-outline"
            title="Show Online Status"
            subtitle="Let others know when you're currently active"
            value={showOnlineStatus}
            onValueChange={setShowOnlineStatus}
          />
          <ToggleRow
            icon="time-outline"
            title="Show Last Active"
            subtitle="Display your recent activity timestamp"
            value={showLastActive}
            onValueChange={setShowLastActive}
          />
          <ToggleRow
            icon="mail-open-outline"
            title="Read Receipts"
            subtitle="Allow contacts to see when messages are read"
            value={readReceipts}
            onValueChange={setReadReceipts}
          />
        </CardContainer>

        {areAllOff ? (
          <InfoBox text="All activity indicators are off. You have maximum privacy." variant="green" />
        ) : null}
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

export default VisibilityStatusScreen;
