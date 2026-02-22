import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import InfoBox from '../../../../components/settings/InfoBox';
import RadioCardGroup from '../../../../components/settings/RadioCardGroup';
import SectionLabel from '../../../../components/settings/SectionLabel';

const FollowRequestsScreen: React.FC = () => {
  const router = useRouter();
  const [approvalMode, setApprovalMode] = useState('manual');
  const [requestExpiry, setRequestExpiry] = useState('seven-days');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Follow Requests</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Follow Request Approval" />
        <RadioCardGroup
          options={[
            { label: 'Manual Approval', value: 'manual', subtitle: 'Review each request before approving' },
            { label: 'Auto Approve', value: 'auto', subtitle: 'Allow all incoming follow requests automatically' },
          ]}
          selectedValue={approvalMode}
          onSelect={setApprovalMode}
        />

        <InfoBox text="You'll receive a notification for each follow request so you can quickly approve or reject." />

        <SectionLabel text="Request Expiry" />
        <RadioCardGroup
          options={[
            { label: '24 Hours', value: '24-hours' },
            { label: '7 Days', value: 'seven-days' },
            { label: 'Never Expires', value: 'never' },
          ]}
          selectedValue={requestExpiry}
          onSelect={setRequestExpiry}
        />
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

export default FollowRequestsScreen;
