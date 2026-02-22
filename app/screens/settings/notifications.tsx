import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../constants/Fonts';
import CardContainer from '../../../components/settings/CardContainer';
import PrimaryGradientButton from '../../../components/settings/PrimaryGradientButton';
import SectionLabel from '../../../components/settings/SectionLabel';
import ToggleRow from '../../../components/settings/ToggleRow';

const PUSH_ROWS = [
  {
    key: 'messages',
    icon: 'chatbubble-ellipses-outline' as const,
    title: 'Messages',
    subtitle: 'Receive push alerts for direct messages',
  },
  {
    key: 'mentions',
    icon: 'at-outline' as const,
    title: 'Mentions',
    subtitle: 'Be notified when someone mentions you',
  },
];

const EMAIL_ROWS = [
  {
    key: 'updates',
    icon: 'notifications-outline' as const,
    title: 'Important Updates',
    subtitle: 'Product updates and policy changes',
    iconColor: '#7B4CFF',
  },
  {
    key: 'security',
    icon: 'mail-outline' as const,
    title: 'Security Alerts',
    subtitle: 'Login and account security notices',
    iconColor: '#EF4444',
  },
];

const SMS_ROWS = [
  {
    key: 'sms-alerts',
    icon: 'chatbox-ellipses-outline' as const,
    title: 'SMS Alerts',
    subtitle: 'Critical alerts sent to your phone number',
  },
];

const NotificationsScreen: React.FC = () => {
  const router = useRouter();
  const [messagesEnabled, setMessagesEnabled] = useState(true);
  const [mentionsEnabled, setMentionsEnabled] = useState(true);
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [securityEnabled, setSecurityEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSave = useCallback(() => {
    router.back();
  }, [router]);

  const toggleStateMap = useMemo(
    () => ({
      messages: [messagesEnabled, setMessagesEnabled] as const,
      mentions: [mentionsEnabled, setMentionsEnabled] as const,
      updates: [updatesEnabled, setUpdatesEnabled] as const,
      security: [securityEnabled, setSecurityEnabled] as const,
      'sms-alerts': [smsEnabled, setSmsEnabled] as const,
    }),
    [mentionsEnabled, messagesEnabled, securityEnabled, smsEnabled, updatesEnabled]
  );

  const renderToggleGroup = useCallback(
    (rows: typeof PUSH_ROWS | typeof EMAIL_ROWS | typeof SMS_ROWS) => {
      return rows.map((row) => {
        const [value, setter] = toggleStateMap[row.key as keyof typeof toggleStateMap];

        return (
          <ToggleRow
            key={row.key}
            icon={row.icon}
            title={row.title}
            subtitle={row.subtitle}
            value={value}
            onValueChange={setter}
            iconColor={'iconColor' in row && row.iconColor ? row.iconColor : '#7B4CFF'}
          />
        );
      });
    },
    [toggleStateMap]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Preferences</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Push Notifications" />
        <CardContainer withDividers>{renderToggleGroup(PUSH_ROWS)}</CardContainer>

        <SectionLabel text="Email Notifications" />
        <CardContainer withDividers>{renderToggleGroup(EMAIL_ROWS)}</CardContainer>

        <SectionLabel text="SMS Notifications" />
        <CardContainer withDividers>{renderToggleGroup(SMS_ROWS)}</CardContainer>

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
    paddingBottom: 40,
  },
  primaryButton: {
    marginHorizontal: 18,
    marginTop: 30,
    marginBottom: 40,
    height: 56,
    borderRadius: 28,
  },
});

export default NotificationsScreen;
