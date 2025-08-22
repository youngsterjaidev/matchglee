import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontFamily } from "@/constants/Fonts";

const { width } = Dimensions.get("window");

// Mock data for community posts
const recentPosts = [
  {
    id: "1",
    title: "When you finally understand a complex meme",
    likes: 123,
    comments: 45,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "😐",
    backgroundColor: "#f5e6d3",
  },
  {
    id: "2",
    title: "The struggle is real",
    likes: 87,
    comments: 22,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "😊",
    backgroundColor: "#f0f0f0",
  },
  {
    id: "3",
    title: "Relatable",
    likes: 201,
    comments: 68,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "🤓",
    backgroundColor: "#e8f5e8",
  },
];

export default function CommunityScreen() {
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoin = () => {
    setHasJoined(!hasJoined);
  };

  const handleInvite = () => {
    // Implement invite functionality
    console.log("Invite pressed");
  };

  const renderPost = (post) => (
    <TouchableOpacity key={post.id} style={styles.postCard}>
      <View
        style={[
          styles.postImageContainer,
          { backgroundColor: post.backgroundColor },
        ]}
      >
        {post.image ? (
          <Image source={post.image} style={styles.postImage} />
        ) : (
          <Text style={styles.postEmoji}>{post.fallbackEmoji}</Text>
        )}
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <View style={styles.postStats}>
          <Text style={styles.postStatsText}>
            {post.likes} likes • {post.comments} comments
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Community Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerImageContainer}>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.bannerImage}
              defaultSource={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
              }}
            />
            {/* Fallback content if image fails */}
            <View style={styles.bannerFallback}>
              <View style={styles.bannerAvatars}>
                <Text style={styles.bannerEmoji}>👥</Text>
              </View>
              <Text style={styles.bannerText}>COMMUNITY</Text>
              <Text style={styles.bannerSubtext}>STAY CONNECTED</Text>
            </View>
          </View>
        </View>

        {/* Community Info */}
        <View style={styles.communityInfo}>
          <Text style={styles.communityName}>Meme Lovers</Text>
          <Text style={styles.communityDescription}>
            A place for meme enthusiasts to share, discuss, and appreciate the
            latest and greatest memes from across the internet.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.joinButton, hasJoined && styles.joinedButton]}
            onPress={handleJoin}
          >
            <Text
              style={[
                styles.joinButtonText,
                hasJoined && styles.joinedButtonText,
              ]}
            >
              {hasJoined ? "Joined" : "Join"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inviteButton} onPress={handleInvite}>
            <Text style={styles.inviteButtonText}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Posts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          <View style={styles.postsContainer}>
            {recentPosts.map(renderPost)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: "#333",
  },
  bannerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  bannerImageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerFallback: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  bannerAvatars: {
    flexDirection: "row",
    marginBottom: 16,
  },
  bannerEmoji: {
    fontSize: 48,
    marginHorizontal: 4,
  },
  bannerText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: "#333",
    letterSpacing: 2,
    marginBottom: 4,
  },
  bannerSubtext: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: "#666",
    letterSpacing: 1,
  },
  communityInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  communityName: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: "#333",
    marginBottom: 8,
  },
  communityDescription: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#666",
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  joinButton: {
    flex: 1,
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  joinedButton: {
    backgroundColor: "#4caf50",
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#ffffff",
  },
  joinedButtonText: {
    color: "#ffffff",
  },
  inviteButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  inviteButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#333",
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: "#333",
    marginBottom: 16,
  },
  postsContainer: {
    gap: 16,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: "90%",
    height: "90%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  postEmoji: {
    fontSize: 60,
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#333",
    marginBottom: 8,
    lineHeight: 22,
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  postStatsText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: "#9333ea",
  },
});
