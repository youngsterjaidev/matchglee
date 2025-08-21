import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomSwitch from '../../../components/ui/CustomSwitch';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightComponent?: React.ReactNode;
}

interface ToggleItemProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  rightComponent,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color="#171214" />
      </View>
      <View style={styles.settingsItemContent}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {rightComponent || (showChevron && (
      <Ionicons name="chevron-forward" size={18} color="#171214" />
    ))}
  </TouchableOpacity>
);

const ToggleItem: React.FC<ToggleItemProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
}) => (
  <View style={styles.toggleItem}>
    <View style={styles.toggleItemContent}>
      <Text style={styles.toggleItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.toggleItemSubtitle}>{subtitle}</Text>}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#F5F0F2', true: '#F5F0F2' }}
      thumbColor={value ? '#FFF' : '#FFF'}
      style={styles.switch}
    />
  </View>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const Settings: React.FC = () => {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log('Navigate to edit profile');
  };

  const handleLinkedAccounts = () => {
    // Navigate to linked accounts screen
    console.log('Navigate to linked accounts');
  };

  const handleDiscoveryPreferences = () => {
    router.push('/screens/settings/DiscoverySettings');
  };

  const handlePushNotifications = () => {
    router.push('/screens/settings/NotificationSettings');
  };

  const handleEmailNotifications = () => {
    router.push('/screens/settings/NotificationSettings');
  };

  const handleSafetyTips = () => {
    // Navigate to safety tips screen
    console.log('Navigate to safety tips');
  };

  const handlePrivacySettings = () => {
    // Navigate to privacy settings screen
    console.log('Navigate to privacy settings');
  };

  const handleBlockedContacts = () => {
    router.push('/screens/settings/BlockedUsers');
  };

  const handleLogOut = () => {
    // Handle logout
    console.log('Logout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#171214" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <SectionHeader title="Account" />
        
        <SettingsItem
          icon="person-outline"
          title="Edit Profile"
          subtitle="Name, age, photos"
          onPress={handleEditProfile}
        />
        
        <SettingsItem
          icon="link-outline"
          title="Linked Accounts"
          onPress={handleLinkedAccounts}
        />

        {/* Discovery Section */}
        <SectionHeader title="Discovery" />
        
        <SettingsItem
          icon="search-outline"
          title="Discovery Preferences"
          onPress={handleDiscoveryPreferences}
        />

        {/* Notifications Section */}
        <SectionHeader title="Notifications" />
        
        <SettingsItem
          icon="notifications-outline"
          title="Push Notifications"
          onPress={handlePushNotifications}
          rightComponent={
            <CustomSwitch
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          }
          showChevron={false}
        />
        
        <SettingsItem
          icon="mail-outline"
          title="Email Notifications"
          onPress={handleEmailNotifications}
          rightComponent={
            <CustomSwitch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
            />
          }
          showChevron={false}
        />

        {/* Safety & Privacy Section */}
        <SectionHeader title="Safety & Privacy" />
        
        <SettingsItem
          icon="shield-checkmark-outline"
          title="Safety Tips"
          onPress={handleSafetyTips}
        />
        
        <SettingsItem
          icon="lock-closed-outline"
          title="Privacy Settings"
          onPress={handlePrivacySettings}
        />
        
        <SettingsItem
          icon="people-outline"
          title="Blocked Contacts"
          onPress={handleBlockedContacts}
        />

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 48, // Balance the back button
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
  },
  scrollContainer: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 16,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
    backgroundColor: '#FFF',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F0F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#87637A',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
    marginTop: 2,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
    backgroundColor: '#FFF',
  },
  toggleItemContent: {
    flex: 1,
  },
  toggleItemTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
  },
  toggleItemSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#876375',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
    marginTop: 2,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 32,
  },
  logoutButton: {
    height: 40,
    backgroundColor: '#E340AB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default Settings;
