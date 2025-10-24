import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ComingSoon from "../../components/soon";

// Mock data for communities
const favouriteCommunities = [
  {
    id: 1,
    name: "Funny Memes",
    members: 123,
    avatar: "🤓", // You can replace with actual image
    color: "#f5f5f5",
  },
  {
    id: 2,
    name: "Dark Humor",
    members: 456,
    avatar: "😐",
    color: "#ffeaa7",
  },
  {
    id: 3,
    name: "Wholesome",
    members: 789,
    avatar: "🌱",
    color: "#74b9ff",
  },
  {
    id: 4,
    name: "Gaming",
    members: 234,
    avatar: "🎮",
    color: "#fd79a8",
  },
];

const myCommunities = [
  {
    id: 1,
    name: "Funny Memes",
    members: 123,
    avatar: "🤓",
    color: "#f5f5f5",
  },
  {
    id: 2,
    name: "Dark Humor",
    members: 456,
    avatar: "😐",
    color: "#ffeaa7",
  },
  {
    id: 3,
    name: "Wholesome Memes",
    members: 789,
    avatar: "🌱",
    color: "#a8e6cf",
  },
  {
    id: 4,
    name: "Political Memes",
    members: 101,
    avatar: "🗳️",
    color: "#ffd93d",
  },
  {
    id: 5,
    name: "Animal Memes",
    members: 202,
    avatar: "🐱",
    color: "#ffb3ba",
  },
];

function CommunitiesScreen() {
  const handleDiscoverCommunities = () => {
    router.push("/screens/explore-communities");
  };

  const renderFavouriteCommunity = ({ item }) => (
    <TouchableOpacity style={styles.favouriteCard}>
      <ThemedView
        style={[styles.avatarContainer, { backgroundColor: item.color }]}
      >
        <ThemedText style={styles.avatarEmoji}>{item.avatar}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.communityName}>{item.name}</ThemedText>
      <ThemedText style={styles.memberCount}>{item.members} members</ThemedText>
    </TouchableOpacity>
  );

  const renderMyCommunity = ({ item }) => (
    <TouchableOpacity style={styles.communityItem}>
      <ThemedView
        style={[styles.communityAvatar, { backgroundColor: item.color }]}
      >
        <ThemedText style={styles.communityAvatarEmoji}>
          {item.avatar}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.communityInfo}>
        <ThemedText style={styles.communityTitle}>{item.name}</ThemedText>
        <ThemedText style={styles.communityMembers}>
          {item.members} members
        </ThemedText>
      </ThemedView>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <>
      <ThemedStatusBar />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText style={styles.headerTitle}>Communities</ThemedText>
          </ThemedView>

          {/* My Favourites Section */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>My Favourites</ThemedText>

            <FlatList
              data={favouriteCommunities}
              renderItem={renderFavouriteCommunity}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </ThemedView>

          {/* Explore Communities Section */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Explore Communities
            </ThemedText>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={handleDiscoverCommunities}
            >
              <Ionicons
                name="search"
                size={20}
                color="#666"
                style={styles.searchIcon}
              />
              <ThemedText style={styles.exploreThemedText}>
                Discover New Communities
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* My Communities Section */}
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>My Communities</ThemedText>

            <FlatList
              data={myCommunities}
              renderItem={renderMyCommunity}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    display: "none",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "PJSans-SemiBold",
    color: "#e91e63",
  },
  section: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "PJSans-Bold",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  favouriteCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 140,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  communityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    ThemedTextAlign: "center",
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 12,
    color: "#666",
    ThemedTextAlign: "center",
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  searchIcon: {
    marginRight: 12,
  },
  exploreThemedText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  communityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  communityAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  communityAvatarEmoji: {
    fontSize: 20,
  },
  communityInfo: {
    flex: 1,
  },
  communityTitle: {
    fontSize: 16,
    fontFamily: "PJSans-Medium",
    marginBottom: 2,
  },
  communityMembers: {
    fontSize: 14,
  },
});

export default ComingSoon;
