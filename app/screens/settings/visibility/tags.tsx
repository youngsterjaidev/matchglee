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

const TagsMentionsScreen: React.FC = () => {
  const router = useRouter();
  const [tagPermission, setTagPermission] = useState('everyone');
  const [reviewTags, setReviewTags] = useState(true);
  const [mentionNotifications, setMentionNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tags & Mentions</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionLabel text="Who Can Tag You" />
        <RadioCardGroup
          options={[
            { label: 'Everyone', value: 'everyone' },
            { label: 'People You Follow', value: 'following' },
            { label: 'No One', value: 'none' },
          ]}
          selectedValue={tagPermission}
          onSelect={setTagPermission}
        />

        <SectionLabel text="Tag Management" />
        <CardContainer withDividers>
          <ToggleRow
            icon="checkmark-done-outline"
            title="Review Tags Before Appearing"
            subtitle="Manually approve profile tags before they display"
            value={reviewTags}
            onValueChange={setReviewTags}
          />
        </CardContainer>

        <InfoBox text="You'll receive a notification when someone tags you in a post, comment, or profile mention." />

        <SectionLabel text="Notifications" />
        <CardContainer withDividers>
          <ToggleRow
            icon="notifications-outline"
            title="Mention Notifications"
            subtitle="Get alerted when someone mentions your profile"
            value={mentionNotifications}
            onValueChange={setMentionNotifications}
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

export default TagsMentionsScreen;
