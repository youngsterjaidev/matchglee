import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '../../../../constants/Fonts';
import CardContainer from '../../../../components/settings/CardContainer';
import InfoBox from '../../../../components/settings/InfoBox';
import PrimaryGradientButton from '../../../../components/settings/PrimaryGradientButton';
import SectionLabel from '../../../../components/settings/SectionLabel';

interface BlockedUser {
  id: string;
  name: string;
  role: string;
  blockedTime: string;
}

const INITIAL_USERS: BlockedUser[] = [
  { id: '1', name: 'Alex Turner', role: 'Product Designer', blockedTime: 'Blocked 2 weeks ago' },
  { id: '2', name: 'Priya Menon', role: 'Growth Strategist', blockedTime: 'Blocked 1 month ago' },
  { id: '3', name: 'Jordan Lee', role: 'Community Moderator', blockedTime: 'Blocked 3 months ago' },
];

const BlockedUsersScreen: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<BlockedUser[]>(INITIAL_USERS);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleUnblock = useCallback((id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  const renderUser = useCallback(
    ({ item }: { item: BlockedUser }) => {
      const onUnblockPress = () => handleUnblock(item.id);

      return (
        <CardContainer>
          <View style={styles.userTop}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person-outline" size={26} color="#7B4CFF" />
            </View>
            <View style={styles.userMeta}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userRole}>{item.role}</Text>
              <Text style={styles.userTime}>{item.blockedTime}</Text>
            </View>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.buttonWrap}>
            <PrimaryGradientButton text="Unblock User" onPress={onUnblockPress} style={styles.unblockButton} />
          </View>
        </CardContainer>
      );
    },
    [handleUnblock]
  );

  const keyExtractor = useCallback((item: BlockedUser) => item.id, []);

  const headerComponent = <SectionLabel text={`${users.length} BLOCKED USERS`} />;
  const footerComponent = (
    <InfoBox text="Blocked users can't view your profile, send messages, or invite you to communities." />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blocked Users</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const ItemSeparator = React.memo(() => <View style={styles.itemGap} />);
ItemSeparator.displayName = 'BlockedItemSeparator';

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
  listContent: {
    paddingBottom: 24,
  },
  itemGap: {
    height: 18,
  },
  userTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F4EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMeta: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    color: '#111',
    fontFamily: FontFamily.semiBold,
  },
  userRole: {
    marginTop: 3,
    fontSize: 14,
    color: '#6B7280',
    fontFamily: FontFamily.regular,
  },
  userTime: {
    marginTop: 3,
    fontSize: 13,
    color: '#9CA3AF',
    fontFamily: FontFamily.regular,
  },
  rowDivider: {
    height: 1,
    marginHorizontal: 18,
    marginTop: 16,
    backgroundColor: '#F0F1F4',
  },
  buttonWrap: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  unblockButton: {
    height: 44,
    borderRadius: 22,
  },
});

export default BlockedUsersScreen;
