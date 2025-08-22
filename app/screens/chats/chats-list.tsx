import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontFamily } from "@/constants/Fonts";
import { router } from "expo-router";

// Mock data for chat conversations
const chatData = [
  {
    id: "1",
    name: "Sophia",
    message: "Hey, how's your day going?",
    time: "now",
    isOnline: true,
    unreadCount: 0,
    avatar: require("@/assets/images/users/liam.png"),
    fallbackEmoji: "👩‍🎨",
    backgroundColor: "#f4c2a1",
  },
  {
    id: "2",
    name: "Ethan",
    message: "Sounds fun! I'm in.",
    time: "2d",
    isOnline: false,
    unreadCount: 0,
    avatar: require("@/assets/images/users/ava.png"),
    fallbackEmoji: "👨‍💻",
    backgroundColor: "#d4a574",
  },
];

export default function ChatsScreen() {
  const [searchText, setSearchText] = useState("");

  // Filter chats based on search text
  const filteredChats = chatData.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleBackPress = () => {
    router.back();
  };

  const handleSettings = () => {
    // router.push("/settings");
  };

  const handleChatPress = (chat) => {
    router.push(`/screens/chats/chats`);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.avatarCircle,
            { backgroundColor: item.backgroundColor },
          ]}
        >
          {item.avatar ? (
            <Image source={item.avatar} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarEmoji}>{item.fallbackEmoji}</Text>
          )}
        </View>
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>

      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    color: "#e91e63",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#333",
  },
  micButton: {
    marginLeft: 8,
    padding: 4,
  },
  chatList: {
    paddingTop: 8,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    resizeMode: "cover",
  },
  avatarEmoji: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4ade80",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#333",
  },
  chatTime: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#999",
  },
  chatMessage: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: "#666",
    lineHeight: 20,
  },
  unreadBadge: {
    backgroundColor: "#e91e63",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: FontFamily.bold,
    color: "#ffffff",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 92,
  },
});
