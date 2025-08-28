import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Mock user data
const userProfile = {
  id: "1",
  name: "Sophia",
  age: 26,
  location: "San Francisco",
  lookingFor: "Looking for a relationship",
  profileImage: require("@/assets/images/users/profile.png"), // Replace with your image
  fallbackEmoji: "👩‍🎨",
  backgroundColor: "#d4a574",
  aboutMe:
    "I'm a creative soul with a passion for art and design. I love exploring new cultures, trying new foods, and meeting interesting people. I'm looking for someone who is kind, adventurous, and shares my love for life's simple pleasures.",
  interests: ["Art", "Design", "Travel", "Foodie", "Culture", "Adventure"],
};

export default function ProfileScreen() {
  const [selectedInterests, setSelectedInterests] = useState(
    new Set(userProfile.interests),
  );

  const handleEditProfile = () => {
    router.push("/(onboarding)/step-1");
  };

  const handleSettings = () => {
    // router.push("/settings");
  };

  const renderInterestTag = (interest, index) => {
    const isSelected = selectedInterests.has(interest);
    return (
      <TouchableOpacity
        key={`${interest}-${index}`}
        style={[styles.interestTag, isSelected && styles.selectedInterestTag]}
        onPress={() => {
          const newSelectedInterests = new Set(selectedInterests);
          if (isSelected) {
            newSelectedInterests.delete(interest);
          } else {
            newSelectedInterests.add(interest);
          }
          setSelectedInterests(newSelectedInterests);
        }}
      >
        <Text
          style={[
            styles.interestText,
            isSelected && styles.selectedInterestText,
          ]}
        >
          {interest}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile Preview</Text>
        <TouchableOpacity onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.profileImageSection}>
          <View
            style={[
              styles.profileImageContainer,
              { backgroundColor: userProfile.backgroundColor },
            ]}
          >
            {userProfile.profileImage ? (
              <Image
                source={userProfile.profileImage}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.profileEmoji}>
                {userProfile.fallbackEmoji}
              </Text>
            )}
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfoSection}>
          <Text style={styles.profileName}>
            {userProfile.name}, {userProfile.age}
          </Text>
          <Text style={styles.profileLocation}>{userProfile.location}</Text>
          <Text style={styles.profileLookingFor}>{userProfile.lookingFor}</Text>
        </View>

        {/* Edit Profile Button */}
        <View style={styles.editButtonSection}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About me</Text>
          <Text style={styles.aboutText}>{userProfile.aboutMe}</Text>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests.map(renderInterestTag)}
          </View>
        </View>

        {/* Additional spacing at bottom */}
        <View style={styles.bottomSpacing} />
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
    display: "none",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: "#e91e63",
  },
  scrollContent: {
    paddingVertical: 20,
  },
  profileImageSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    resizeMode: "cover",
  },
  profileEmoji: {
    fontSize: 60,
  },
  profileInfoSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  profileName: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: "#333",
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#666",
    marginBottom: 8,
  },
  profileLookingFor: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: "#666",
  },
  editButtonSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  editButton: {
    backgroundColor: "#e91e63",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#e91e63",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#ffffff",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: "#333",
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#666",
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  interestTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedInterestTag: {
    backgroundColor: "#e91e63",
    borderColor: "#e91e63",
  },
  interestText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: "#666",
  },
  selectedInterestText: {
    color: "#ffffff",
  },
  bottomSpacing: {
    height: 40,
  },
});
