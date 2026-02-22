import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import SegmentedControl from '../../../../components/settings/SegmentedControl';
import ToggleRow from '../../../../components/settings/ToggleRow';

const CommunityPrivacyScreen: React.FC = () => {
  const router = useRouter();
  const [invitePermission, setInvitePermission] = useState('Followers');
  const [allowMemberMessages, setAllowMemberMessages] = useState(true);
  const [allowProfileView, setAllowProfileView] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community - Privacy</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardBlock}>
          <CardContainer>
            <View style={styles.cardInner}>
              <Text style={styles.sectionTitle}>Who can invite me</Text>
              <SegmentedControl
                options={['Everyone', 'Followers', 'Following']}
                value={invitePermission}
                onChange={setInvitePermission}
              />
            </View>
          </CardContainer>
        </View>

        <View style={styles.cardBlock}>
          <CardContainer withDividers>
            <ToggleRow
              icon="chatbubble-ellipses-outline"
              title="Allow messages from members"
              subtitle="Community members can message you directly"
              value={allowMemberMessages}
              onValueChange={setAllowMemberMessages}
            />
            <ToggleRow
              icon="person-outline"
              title="Allow members to view profile"
              subtitle="Members can open your public profile from groups"
              value={allowProfileView}
              onValueChange={setAllowProfileView}
            />
          </CardContainer>
        </View>
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
  cardBlock: {
    marginTop: 18,
  },
  cardInner: {
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
});

export default CommunityPrivacyScreen;
