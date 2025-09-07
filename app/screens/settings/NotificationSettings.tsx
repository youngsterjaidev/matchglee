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

interface NotificationItemProps {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
}) => (
  <View style={styles.notificationItem}>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationSubtitle}>{subtitle}</Text>
    </View>
    <CustomSwitch
      value={value}
      onValueChange={onValueChange}
    />
  </View>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const NotificationSettings: React.FC = () => {
  const router = useRouter();
  
  // Push Notification Settings
  const [newMatches, setNewMatches] = useState(false);
  const [newMessages, setNewMessages] = useState(false);
  const [profileVisitors, setProfileVisitors] = useState(false);
  const [promotions, setPromotions] = useState(false);
  
  // Email Notification Settings
  const [activitySummary, setActivitySummary] = useState(false);
  const [offers, setOffers] = useState(false);
  const [news, setNews] = useState(false);

  const handleBackPress = () => {
    router.back();
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
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Push Notifications Section */}
        <SectionHeader title="Push Notifications" />
        
        <NotificationItem
          title="New Matches"
          subtitle="Get notified when someone likes you"
          value={newMatches}
          onValueChange={setNewMatches}
        />
        
        <NotificationItem
          title="New Messages"
          subtitle="Get notified when you receive a new message"
          value={newMessages}
          onValueChange={setNewMessages}
        />
        
        <NotificationItem
          title="Profile Visitors"
          subtitle="Get notified when someone views your profile"
          value={profileVisitors}
          onValueChange={setProfileVisitors}
        />
        
        <NotificationItem
          title="Promotions"
          subtitle="Get notified about special offers and promotions"
          value={promotions}
          onValueChange={setPromotions}
        />

        {/* Email Notifications Section */}
        <SectionHeader title="Email Notifications" />
        
        <NotificationItem
          title="Activity Summary"
          subtitle="Receive a weekly summary of your activity"
          value={activitySummary}
          onValueChange={setActivitySummary}
        />
        
        <NotificationItem
          title="Offers"
          subtitle="Receive emails about special offers and promotions"
          value={offers}
          onValueChange={setOffers}
        />
        
        <NotificationItem
          title="News"
          subtitle="Receive emails about new features and updates"
          value={news}
          onValueChange={setNews}
        />

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
    paddingRight: 48,
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
    paddingVertical: 20,
    paddingBottom: 12,
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 28,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 72,
    backgroundColor: '#FFF',
  },
  notificationContent: {
    flex: 1,
    paddingRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#171214',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 24,
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#876375',
    fontFamily: 'Plus Jakarta Sans',
    lineHeight: 21,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default NotificationSettings;
