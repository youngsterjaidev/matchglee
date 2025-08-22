import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontFamily } from "@/constants/Fonts";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// Mock data for categories
const categories = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Gaming", active: false },
  { id: "3", name: "Humor", active: false },
  { id: "4", name: "Art", active: false },
  { id: "5", name: "Tech", active: false },
];

// Mock data for featured communities
const featuredCommunities = [
  {
    id: "1",
    name: "Gamers Unite",
    description: "Connect with fellow gamers",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#4a9b8e",
    fallbackEmoji: "🎮",
  },
  {
    id: "2",
    name: "Laugh Out Loud",
    description: "Share your funniest memes",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#4a9b8e",
    fallbackEmoji: "😂",
  },
  {
    id: "3",
    name: "Creative Hub",
    description: "Showcase your designs",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#f5e6d3",
    fallbackEmoji: "🎨",
  },
];

// Mock data for all communities
const allCommunities = [
  {
    id: "1",
    name: "Meme Central",
    description: "Share and discover the latest memes",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#f5e6d3",
    fallbackEmoji: "🤓",
  },
  {
    id: "2",
    name: "Tech Talk",
    description: "Discuss the latest tech trends",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#4a9b8e",
    fallbackEmoji: "💻",
  },
  {
    id: "3",
    name: "Artistic Expressions",
    description: "Showcase your artistic creations",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#f5e6d3",
    fallbackEmoji: "🎨",
  },
  {
    id: "4",
    name: "Gaming Legends",
    description: "Connect with fellow gamers",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#4a9b8e",
    fallbackEmoji: "🎮",
  },
  {
    id: "5",
    name: "Comedy Club",
    description: "Share your funniest jokes",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#f5e6d3",
    fallbackEmoji: "🎭",
  },
  {
    id: "6",
    name: "Design Hub",
    description: "Explore design and creativity",
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    backgroundColor: "#4a9b8e",
    fallbackEmoji: "🖌️",
  },
];

export default function ExploreScreen({}) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter communities based on search text
  const filteredCommunities = allCommunities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchText.toLowerCase()) ||
      community.description.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.activeCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.activeCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFeaturedCommunity = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => router.push(`/screens/community`)}
    >
      <View
        style={[
          styles.featuredImageContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        {item.image ? (
          <Image source={item.image} style={styles.featuredImage} />
        ) : (
          <Text style={styles.featuredEmoji}>{item.fallbackEmoji}</Text>
        )}
      </View>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName}>{item.name}</Text>
        <Text style={styles.featuredDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAllCommunity = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.communityCard,
        {
          marginRight: index % 2 === 0 ? 8 : 0,
          marginLeft: index % 2 === 1 ? 8 : 0,
        },
      ]}
    >
      <View
        style={[
          styles.communityImageContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        {item.image ? (
          <Image source={item.image} style={styles.communityImage} />
        ) : (
          <Text style={styles.communityEmoji}>{item.fallbackEmoji}</Text>
        )}
      </View>
      <View style={styles.communityInfo}>
        <Text style={styles.communityName}>{item.name}</Text>
        <Text style={styles.communityDescription}>{item.description}</Text>
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
        <Text style={styles.headerTitle}>Explore</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
            placeholder="Search communities"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
          />
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <FlatList
            data={featuredCommunities}
            renderItem={renderFeaturedCommunity}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* All Communities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Communities</Text>
          <View style={styles.communitiesGrid}>
            {filteredCommunities.map((item, index) => (
              <View key={item.id} style={styles.communityCardWrapper}>
                {renderAllCommunity({ item, index })}
              </View>
            ))}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
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
  categoriesList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeCategoryButton: {
    backgroundColor: "#333",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
  },
  section: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: FontFamily.bold,
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredList: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 160,
    marginRight: 16,
  },
  featuredImageContainer: {
    width: 160,
    height: 120,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
  },
  featuredEmoji: {
    fontSize: 40,
  },
  featuredInfo: {
    alignItems: "flex-start",
  },
  featuredName: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#333",
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#666",
  },
  communitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  communityCardWrapper: {
    width: "50%",
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  communityCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  communityImageContainer: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  communityImage: {
    width: "80%",
    height: "80%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  communityEmoji: {
    fontSize: 30,
  },
  communityInfo: {
    padding: 12,
  },
  communityName: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: "#333",
    marginBottom: 4,
  },
  communityDescription: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#666",
    lineHeight: 16,
  },
});
