import React, { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import SectionLabel from '../../../../components/settings/SectionLabel';

interface ReportOption {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

const REPORT_OPTIONS: ReportOption[] = [
  {
    key: 'user',
    icon: 'person-outline',
    title: 'Report User',
    subtitle: 'Report harassment, impersonation, or abusive behavior',
  },
  {
    key: 'content',
    icon: 'document-text-outline',
    title: 'Report Content',
    subtitle: 'Flag inappropriate posts, media, or comments',
  },
  {
    key: 'community',
    icon: 'people-outline',
    title: 'Report Community',
    subtitle: 'Report a community for policy violations',
  },
];

const ReportOptionRow: React.FC<{ item: ReportOption }> = React.memo(({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.reportRow}>
      <View style={styles.rowIconCircle}>
        <Ionicons name={item.icon} size={20} color="#7B4CFF" />
      </View>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
    </TouchableOpacity>
  );
});

ReportOptionRow.displayName = 'ReportOptionRow';

const OutlineButton: React.FC<{ text: string }> = React.memo(({ text }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true, speed: 28, bounciness: 0 }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 22, bounciness: 6 }).start();
  }, [scaleAnim]);

  const animatedStyle = useMemo(
    () => ({
      transform: [{ scale: scaleAnim }],
    }),
    [scaleAnim]
  );

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.outlineButton, animatedStyle]}>
        <Text style={styles.outlineButtonText}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

OutlineButton.displayName = 'OutlineButton';

const ReportingScreen: React.FC = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const reportRows = useMemo(() => REPORT_OPTIONS.map((item) => <ReportOptionRow key={item.key} item={item} />), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reporting</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Help us keep MatchGlee safe by reporting harmful behavior, content, or communities that violate our
          guidelines.
        </Text>

        <View style={styles.safetyCard}>
          <Text style={styles.safetyTitle}>Your safety is our priority</Text>
          <Text style={styles.safetyBody}>Reports are reviewed quickly and handled with confidentiality.</Text>
        </View>

        <SectionLabel text="What would you like to report?" />
        <CardContainer withDividers>{reportRows}</CardContainer>

        <SectionLabel text="Need Immediate Help?" />
        <CardContainer>
          <View style={styles.crisisRow}>
            <View style={styles.rowIconCircle}>
              <Ionicons name="medkit-outline" size={20} color="#7B4CFF" />
            </View>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowTitle}>Crisis Support</Text>
              <Text style={styles.rowSubtitle}>Reach trusted crisis resources in your region.</Text>
            </View>
          </View>
          <View style={styles.outlineWrap}>
            <OutlineButton text="View Crisis Resources" />
          </View>
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
    fontSize: 15,
    color: '#6B7280',
    marginHorizontal: 18,
    marginTop: 20,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
  },
  safetyCard: {
    marginHorizontal: 18,
    marginTop: 18,
    backgroundColor: '#F4EFFF',
    borderRadius: 20,
    padding: 18,
  },
  safetyTitle: {
    fontSize: 16,
    color: '#7B4CFF',
    fontFamily: FontFamily.semiBold,
  },
  safetyBody: {
    marginTop: 8,
    fontSize: 14,
    color: '#8A8F9C',
    lineHeight: 20,
    fontFamily: FontFamily.regular,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  rowIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTextWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  rowTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  rowSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#8A8F9C',
    lineHeight: 19,
    fontFamily: FontFamily.regular,
  },
  crisisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  outlineWrap: {
    paddingHorizontal: 18,
  },
  outlineButton: {
    height: 48,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  outlineButtonText: {
    color: '#374151',
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
  },
});

export default ReportingScreen;
