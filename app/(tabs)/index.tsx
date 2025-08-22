import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const users = [
  {
    id: "1",
    name: "Liam",
    username: "@meme_master",
    color: "#8e44ad",
    image: require("@/assets/images/users/liam.png"),
  },
  {
    id: "2",
    name: "Chloe",
    username: "@laugh_factory",
    color: "#d35400",
    image: require("@/assets/images/users/chloe.png"),
  },
  {
    id: "3",
    name: "Ava",
    username: "@meme_queen",
    color: "#c0392b",
    image: require("@/assets/images/users/ava.png"),
  },
  {
    id: "4",
    name: "Jake",
    username: "@funny_guy",
    color: "#2ecc71",
    image: require("@/assets/images/users/ava.png"),
  },
  {
    id: "5",
    name: "Emma",
    username: "@meme_lord",
    color: "#3498db",
    image: require("@/assets/images/users/ava.png"),
  },
  {
    id: "6",
    name: "Ryan",
    username: "@laugh_master",
    color: "#f39c12",
    image: require("@/assets/images/users/ava.png"),
  },
];

const posts = [
  {
    id: "101",
    user: users[0],
    likes: 234,
    caption: "This meme is hilarious! #memes #funny",
    imageColor: "#b3e5d1",
    image: require("@/assets/images/posts/post1.png"),
  },
  {
    id: "102",
    user: users[1],
    likes: 189,
    caption: "Can't stop laughing at this one! #memes #comedy",
    imageColor: "#b3e5d1",
    image: require("@/assets/images/posts/post2.png"),
  },
  {
    id: "103",
    user: users[2],
    likes: 312,
    caption: "This is so relatable! #memes #humor",
    imageColor: "#f4f4f4",
    image: require("@/assets/images/posts/post3.png"),
  },
];

export default function MemeFeed() {
  const renderUser = ({ item }: { item: (typeof users)[0] }) => (
    <TouchableOpacity style={styles.userAvatarContainer}>
      <View style={[styles.userAvatar, { backgroundColor: item.color }]}>
        <Image source={item.image} style={styles.userAvatarImage} />
      </View>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userHandle}>{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color="#e91e63" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Memes</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              router.navigate("/screens/notifications/notifications")
            }
          >
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.navigate("/screens/chats/chats-list")}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Feed */}
      <ScrollView
        style={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Users List - Scrollable */}
        <View style={styles.usersSection}>
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.usersListContent}
          />

          {/* Liam's small avatar below */}
          <View style={styles.smallUserContainer}>
            <View
              style={[
                styles.smallUserAvatar,
                { backgroundColor: users[0].color },
              ]}
            >
              <Image
                source={users[0].image}
                style={styles.smallUserAvatarImage}
              />
            </View>
            <View style={styles.smallUserDetails}>
              <Text style={styles.smallUserName}>Liam</Text>
              <Text style={styles.smallUserHandle}>@meme_master</Text>
            </View>
          </View>
        </View>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post image */}
            <Image source={post.image} style={styles.postImage} />

            {/* Post actions */}
            <View style={styles.postActions}>
              <TouchableOpacity>
                <Feather name="heart" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="send" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="bookmark" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Likes count */}
            <Text style={styles.likesText}>Liked by {post.likes} people</Text>

            {/* Caption */}
            <Text style={styles.captionText}>{post.caption}</Text>

            {/* Post user info */}
            <View style={styles.postUserInfo}>
              <View
                style={[
                  styles.postUserAvatar,
                  { backgroundColor: post.user.color },
                ]}
              >
                <Image
                  source={post.user.image}
                  style={styles.postUserAvatarImage}
                />
              </View>
              <View style={styles.postUserDetails}>
                <Text style={styles.postUserName}>{post.user.name}</Text>
                <Text style={styles.postUserHandle}>{post.user.username}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topNav: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#e91e63",
    display: "none",
  },
  rightIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
  usersSection: {
    paddingVertical: 15,
  },
  usersListContent: {
    paddingHorizontal: 15,
  },
  userAvatarContainer: {
    alignItems: "center",
    marginRight: 15,
    width: 80,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  userAvatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  userHandle: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  smallUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  smallUserAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  smallUserAvatarImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  smallUserDetails: {
    flex: 1,
  },
  smallUserName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  smallUserHandle: {
    fontSize: 12,
    color: "#999",
  },
  postsContainer: {
    flex: 1,
  },
  postCard: {
    marginBottom: 30,
  },
  postImage: {
    height: 300,
    marginHorizontal: 0,
    borderRadius: 0,
    resizeMode: "cover",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  likesText: {
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  captionText: {
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 20,
    lineHeight: 18,
    marginBottom: 10,
  },
  postUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  postUserAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  postUserAvatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  postUserDetails: {
    flex: 1,
  },
  postUserName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  postUserHandle: {
    fontSize: 12,
    color: "#999",
  },
});
