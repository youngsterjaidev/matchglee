import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { auth } from '../../../config/firebase';
import { FontFamily } from '../../../constants/Fonts';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface SettingsSubItem {
  id: string;
  title: string;
  subtitle?: string;
  route: string;
  badge?: number;
}

interface SettingsSection {
  id: string;
  title: string;
  icon: IoniconName;
  route: string;
  items: SettingsSubItem[];
}

interface SearchResult {
  key: string;
  title: string;
  subtitle?: string;
  route: string;
}

interface SettingsSubRowProps {
  title: string;
  subtitle?: string;
  badge?: number;
  query?: string;
  onPress: () => void;
}

interface SettingsSectionCardProps {
  id: string;
  title: string;
  icon: IoniconName;
  subItems: React.ReactNode;
  isActive: boolean;
  onToggle: (id: string) => void;
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'account',
    title: 'Account',
    icon: 'person-outline',
    route: '/screens/settings/account',
    items: [
      { id: 'contact-details', title: 'Contact Details', route: '/screens/settings/account/contact' },
      {
        id: 'password-authentication',
        title: 'Password & Authentication',
        route: '/screens/settings/account/password',
      },
      {
        id: 'deactivation-deletion',
        title: 'Deactivation or Deletion',
        route: '/screens/settings/account/delete',
      },
    ],
  },
  {
    id: 'privacy-settings',
    title: 'Privacy Settings',
    icon: 'shield-outline',
    route: '/screens/settings/privacy',
    items: [
      { id: 'personal-privacy', title: 'Personal - Privacy', route: '/screens/settings/privacy/personal' },
      {
        id: 'professional-privacy',
        title: 'Professional - Privacy',
        route: '/screens/settings/privacy/professional',
      },
      {
        id: 'community-privacy',
        title: 'Community - Privacy',
        route: '/screens/settings/privacy/community',
      },
    ],
  },
  {
    id: 'visibility',
    title: 'Visibility',
    icon: 'eye-outline',
    route: '/screens/settings/visibility',
    items: [
      {
        id: 'online-status-activity',
        title: 'Online Status & Activity',
        subtitle: 'Active status, read receipts',
        route: '/screens/settings/visibility/status',
      },
      {
        id: 'tags-mentions',
        title: 'Tags & Mentions',
        subtitle: 'Tag controls, mentions',
        route: '/screens/settings/visibility/tags',
      },
      {
        id: 'follow-requests',
        title: 'Follow Requests',
        subtitle: 'Approvals, expiry',
        route: '/screens/settings/visibility/follow',
      },
      {
        id: 'discovery-settings',
        title: 'Discovery Settings',
        subtitle: 'Location, network discovery',
        route: '/screens/settings/visibility/discovery',
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    route: '/screens/settings/notifications',
    items: [
      {
        id: 'notification-preferences',
        title: 'Notification Preferences',
        subtitle: 'Push, Email, SMS & Types',
        route: '/screens/settings/notifications',
      },
    ],
  },
  {
    id: 'block-report',
    title: 'Block & Report',
    icon: 'warning-outline',
    route: '/screens/settings/block',
    items: [
      { id: 'blocked-users', title: 'Blocked Users', route: '/screens/settings/block/users', badge: 3 },
      {
        id: 'reporting',
        title: 'Reporting',
        subtitle: 'Report users, content, or communities',
        route: '/screens/settings/block/report',
      },
    ],
  },
  {
    id: 'data-rights',
    title: 'Data & Rights',
    icon: 'server-outline',
    route: '/screens/settings/data',
    items: [
      { id: 'data-usage-control', title: 'Data Usage & Control', route: '/screens/settings/data/usage' },
      {
        id: 'legal-transparency',
        title: 'Legal & Transparency',
        route: '/screens/settings/data/legal',
      },
    ],
  },
  {
    id: 'app-system-preferences',
    title: 'App & System Preferences',
    icon: 'phone-portrait-outline',
    route: '/screens/settings/system',
    items: [
      { id: 'language', title: 'Language', subtitle: 'English', route: '/screens/settings/system/language' },
      { id: 'theme', title: 'Theme', subtitle: 'Dark Mode', route: '/screens/settings/system/theme' },
    ],
  },
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) {
    return text;
  }

  const safeQuery = escapeRegExp(query.trim());
  const regex = new RegExp(`(${safeQuery})`, 'ig');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === query.trim().toLowerCase()) {
      return (
        <Text key={`${part}-${index}`} style={styles.highlightText}>
          {part}
        </Text>
      );
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
};

const SettingsSubRow: React.FC<SettingsSubRowProps> = ({ title, subtitle, badge, query, onPress }) => {
  return (
    <TouchableOpacity style={styles.subRowContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.subRowMain}>
        <View style={styles.subRowTextWrap}>
          <Text style={styles.subRowTitle}>{highlightMatch(title, query || '')}</Text>
          {subtitle ? <Text style={styles.subRowSubtitle}>{highlightMatch(subtitle, query || '')}</Text> : null}
        </View>

        <View style={styles.subRowRight}>
          {typeof badge === 'number' ? (
            <View style={styles.badgeWrap}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
          <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SettingsSectionCard: React.FC<SettingsSectionCardProps> = React.memo(
  ({ id, title, icon, subItems, isActive, onToggle }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(rotateAnim, {
        toValue: isActive ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, [isActive, rotateAnim]);

    const rotateStyle = useMemo(
      () => ({
        transform: [
          {
            rotate: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            }),
          },
        ],
      }),
      [rotateAnim]
    );

    return (
      <View style={[styles.sectionCard, isActive && styles.sectionCardExpanded]}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onToggle(id)} style={styles.sectionHeaderPressable}>
          <View style={styles.sectionHeaderLeft}>
            <View style={[styles.sectionIconCircle, isActive && styles.sectionIconCircleExpanded]}>
              <Ionicons name={icon} size={22} color={isActive ? '#7B4CFF' : '#8A8F9C'} />
            </View>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>

          <Animated.View style={[styles.sectionChevronWrap, rotateStyle]}>
            <Ionicons name="chevron-down" size={20} color="#A4A9B2" />
          </Animated.View>
        </TouchableOpacity>

        {isActive ? <View style={styles.dropdownContainer}>{subItems}</View> : null}
      </View>
    );
  }
);
SettingsSectionCard.displayName = 'SettingsSectionCard';

const Settings: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isSearchMode = searchQuery.trim().length > 0;

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleToggle = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSection((prev) => (prev === id ? null : id));
  }, []);

  const handleNavigate = useCallback(
    (route: string) => {
      setSearchQuery('');
      router.push(route as any);
    },
    [router]
  );

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
    router.replace('/screens/login');
  }, [router]);

  const filteredResults = useMemo<SearchResult[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const results: SearchResult[] = [];

    SETTINGS_SECTIONS.forEach((section) => {
      if (section.title.toLowerCase().includes(query)) {
        results.push({
          key: `section-${section.id}`,
          title: section.title,
          route: section.route,
        });
      }

      section.items.forEach((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const subtitleMatch = item.subtitle?.toLowerCase().includes(query) || false;

        if (titleMatch || subtitleMatch) {
          results.push({
            key: `item-${section.id}-${item.id}`,
            title: item.title,
            subtitle: section.title,
            route: item.route,
          });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const accordionModeContent = useMemo(() => {
    return SETTINGS_SECTIONS.map((section) => {
      const subItems = section.items.map((item, index) => (
        <View key={item.id} style={[styles.subRowWrap, index < section.items.length - 1 && styles.subRowDivider]}>
          <SettingsSubRow
            title={item.title}
            subtitle={item.subtitle}
            badge={item.badge}
            onPress={() => handleNavigate(item.route)}
          />
        </View>
      ));

      return (
        <SettingsSectionCard
          id={section.id}
          key={section.id}
          title={section.title}
          icon={section.icon}
          subItems={subItems}
          isActive={activeSection === section.id}
          onToggle={handleToggle}
        />
      );
    });
  }, [activeSection, handleNavigate, handleToggle]);

  const searchModeContent = useMemo(
    () =>
      filteredResults.map((result) => (
        <View key={result.key} style={styles.searchResultCard}>
          <SettingsSubRow
            title={result.title}
            subtitle={result.subtitle}
            query={searchQuery}
            onPress={() => handleNavigate(result.route)}
          />
        </View>
      )),
    [filteredResults, handleNavigate, searchQuery]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F8" />

      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={22} color="#111" />
          </TouchableOpacity>

          <View style={[styles.searchBarContainer, isSearchFocused && styles.searchBarContainerFocused]}>
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search settings"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isSearchMode ? searchModeContent : accordionModeContent}

        <Text style={styles.versionText}>MatchGlee v2.0 • Build 2024.05</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#FF4EC7" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#F3F4F8',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchBarContainer: {
    flex: 1,
    marginLeft: 14,
    height: 48,
    borderRadius: 30,
    backgroundColor: '#ECEEF2',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
  },
  searchBarContainerFocused: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8C9FF',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.medium,
    paddingVertical: 0,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    marginHorizontal: 18,
    marginTop: 18,
    paddingHorizontal: 15,
    paddingVertical: 13,
    // shadowColor: '#0D0A2C',
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.16,
    // shadowRadius: 14,
    // elevation: 6,
    borderColor: 'transparent',
    borderWidth: 1.5,
  },
  sectionCardExpanded: {
    borderColor: '#D8C9FF',
    borderWidth: 1.5,
  },
  sectionHeaderPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionIconCircleExpanded: {
    backgroundColor: '#F1E9FF',
  },
  sectionTitle: {
    marginLeft: 14,
    fontSize: 18,
    color: '#111',
    fontFamily: FontFamily.semiBold,
    flex: 1,
  },
  sectionChevronWrap: {
    marginLeft: 12,
  },
  dropdownContainer: {
    marginTop: 14,
  },
  subRowWrap: {
    minHeight: 64,
    justifyContent: 'center',
  },
  subRowDivider: {
    borderBottomColor: '#F0F1F4',
    borderBottomWidth: 1,
  },
  subRowContainer: {
    height: 64,
    justifyContent: 'center',
  },
  subRowMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subRowTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  subRowTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.medium,
    lineHeight: 22,
  },
  subRowSubtitle: {
    fontSize: 14,
    color: '#8A8F9C',
    fontFamily: FontFamily.regular,
    lineHeight: 20,
    marginTop: 2,
  },
  subRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeWrap: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1E9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#7B4CFF',
    fontFamily: FontFamily.medium,
  },
  searchResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    marginHorizontal: 18,
    marginTop: 18,
    paddingHorizontal: 20,
    shadowColor: '#0D0A2C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 6,
  },
  highlightText: {
    color: '#7B4CFF',
    fontFamily: FontFamily.semiBold,
  },
  versionText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#8A8F9C',
    fontSize: 13,
    fontFamily: FontFamily.regular,
  },
  logoutButton: {
    marginHorizontal: 18,
    marginTop: 30,
    marginBottom: 40,
    height: 56,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#FF4EC7',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4EC7',
    fontFamily: FontFamily.semiBold,
  },
});

export default Settings;
