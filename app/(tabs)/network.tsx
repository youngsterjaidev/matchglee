import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import { fetchProfiles } from "@/lib/firestore";
import { auth } from "@/config/firebase";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyProfile } from "@/hooks/useMyProfile";

const { width } = Dimensions.get("window");

// Mock data for user profiles
const profiles = [
  {
    id: "1",
    name: "Sophia",
    age: 24,
    title: "Top Ranker",
    bio: "I'm an artist and love exploring new cultures.",
    verified: true,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "👩‍🎨",
    backgroundColor: "#f4c2a1",
    interests: ["Art", "Travel", "Foodie"],
  },
  {
    id: "2",
    name: "Ethan",
    age: 28,
    title: "Top Ranker",
    bio: "Software engineer, passionate about tech and fitness.",
    verified: true,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "👨‍💻",
    backgroundColor: "#d4a574",
    interests: ["Tech", "Fitness", "Gaming"],
  },
  {
    id: "3",
    name: "Olivia",
    age: 22,
    title: "",
    bio: "Student, enjoys hiking and photography.",
    verified: true,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "👩‍🎓",
    backgroundColor: "#f4c2a1",
    interests: ["Hiking", "Photography", "Reading"],
  },
  {
    id: "4",
    name: "Liam",
    age: 26,
    title: "",
    bio: "Musician, loves playing guitar and writing songs.",
    verified: true,
    image: require("@/assets/images/react-logo.png"), // Replace with your image
    fallbackEmoji: "👨‍🎤",
    backgroundColor: "#d4a574",
    interests: ["Music", "Guitar", "Songwriting"],
  },
];

export default function HomeScreen() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    try {
      const data = await fetchProfiles(auth?.currentUser?.uid);
      setProfiles(data);
    } catch (e) {
      Alert.alert("Error", "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]); // initial fetch

  const handleLike = (profileId) => {
    const newLikedProfiles = new Set(likedProfiles);
    if (likedProfiles.has(profileId)) {
      newLikedProfiles.delete(profileId);
    } else {
      newLikedProfiles.add(profileId);
    }
    setLikedProfiles(newLikedProfiles);
  };

  const handleShare = (profile) => {
    console.log(`Share profile: ${profile.name}`);
  };

  const handleMessage = (profile) => {
    console.log(`Message profile: ${profile.name}`);
  };

  const renderInterestTag = (interest) => (
    <View key={interest} style={styles.interestTag}>
      <Text style={styles.interestText}>{interest}</Text>
    </View>
  );

  const renderProfile = (profile) => (
    <View key={profile.id} style={styles.profileCard}>
      {/* Profile Image */}
      <View
        style={[
          styles.profileImageContainer,
          { backgroundColor: profile.backgroundColor || "#ddd" },
        ]}
      >
        {profile?.photoURL ? (
          <Image
            // source={profile.image || require("@/assets/images/react-logo.png")}
            source={{ uri: profile?.photoURL }}
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.profileEmoji}>
            {profile.fallbackEmoji || "👨‍💻"}
          </Text>
        )}
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        {profile.title && (
          <Text style={styles.profileTitle}>{profile.title}</Text>
        )}

        <View style={styles.profileNameRow}>
          <Text style={styles.profileName}>
            {profile?.displayName || "Unknown"}, {profile.age}
          </Text>
          {!profile.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>

        <Text style={styles.profileBio}>
          {profile.bio || "No bio provided"}
        </Text>

        {/* Interests */}
        <View style={styles.interestsContainer}>
          {profile.interests.map(renderInterestTag)}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.likeButton,
            likedProfiles.has(profile.id) && styles.likedButton,
          ]}
          onPress={() => handleLike(profile.id)}
        >
          <Ionicons
            name={likedProfiles.has(profile.id) ? "heart" : "heart-outline"}
            size={24}
            color={likedProfiles.has(profile.id) ? "#fff" : "#e91e63"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.messageButton]}
          onPress={() => handleMessage(profile)}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => handleShare(profile)}
        >
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MatchGlee</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profile Feed */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {profiles.map(renderProfile)}
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
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: "#e91e63",
  },
  scrollContent: {
    paddingVertical: 20,
  },
  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  profileImageContainer: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  profileEmoji: {
    fontSize: 80,
  },
  profileInfo: {
    padding: 20,
  },
  profileTitle: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  profileNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: "#333",
    marginRight: 12,
  },
  verifiedBadge: {
    backgroundColor: "#e91e63",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: FontFamily.semiBold,
    color: "#ffffff",
  },
  profileBio: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    // NOTE: Update later
    display: "none",
  },
  interestTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
    // NOTE: Update later
    display: "none",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  likeButton: {
    borderColor: "#e91e63",
    backgroundColor: "#fff",
  },
  likedButton: {
    backgroundColor: "#e91e63",
    borderColor: "#e91e63",
  },
  messageButton: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  shareButton: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
});

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Alert,
//   Dimensions,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { fetchProfiles } from "@/lib/firestore";

// const { width } = Dimensions.get("window");

// export default function HomeScreen() {
//   const [profiles, setProfiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());

//   const load = useCallback(async () => {
//     try {
//       const data = await fetchProfiles();
//       console.log(data);
//       setProfiles(data);
//     } catch (e) {
//       Alert.alert("Error", "Failed to load profiles");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]); // initial fetch

//   const handleLike = (id: string) => {
//     const next = new Set(likedProfiles);
//     next.has(id) ? next.delete(id) : next.add(id);
//     setLikedProfiles(next);
//   };

//   const renderInterestTag = (interest: string) => (
//     <View key={interest} style={styles.interestTag}>
//       <Text style={styles.interestText}>{interest}</Text>
//     </View>
//   );

//   const renderProfile = (p: any) => (
//     <View key={p.id} style={styles.profileCard}>
//       <View
//         style={[
//           styles.profileImageContainer,
//           { backgroundColor: p.backgroundColor || "#d4a574" },
//         ]}
//       >
//         {p.photoURL ? (
//           <Image source={{ uri: p.photoURL }} style={styles.profileImage} />
//         ) : (
//           <Text style={styles.profileEmoji}>{p.fallbackEmoji || "👤"}</Text>
//         )}
//       </View>

//       <View style={styles.profileInfo}>
//         {!!p.title && <Text style={styles.profileTitle}>{p.title}</Text>}
//         <View style={styles.profileNameRow}>
//           <Text style={styles.profileName}>
//             {p.displayName || p.name || "User"}
//             {p.age ? `, ${p.age}` : ""}
//           </Text>
//           {p.verified && (
//             <View style={styles.verifiedBadge}>
//               <Text style={styles.verifiedText}>Verified</Text>
//             </View>
//           )}
//         </View>
//         {!!p.bio && <Text style={styles.profileBio}>{p.bio}</Text>}
//         <View style={styles.interestsContainer}>
//           {(p.interests || []).map(renderInterestTag)}
//         </View>
//       </View>

//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={[
//             styles.actionButton,
//             styles.likeButton,
//             likedProfiles.has(p.id) && styles.likedButton,
//           ]}
//           onPress={() => handleLike(p.id)}
//         >
//           <Ionicons
//             name={likedProfiles.has(p.id) ? "heart" : "heart-outline"}
//             size={24}
//             color={likedProfiles.has(p.id) ? "#fff" : "#e91e63"}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.messageButton]}
//           onPress={() => {}}
//         >
//           <Ionicons name="chatbubble-outline" size={24} color="#333" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.shareButton]}
//           onPress={() => {}}
//         >
//           <Ionicons name="share-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>MatchGlee</Text>
//         <TouchableOpacity>
//           <Ionicons name="settings-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {profiles.map(renderProfile)}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // reuse your existing styles object
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   headerTitle: { fontSize: 20, fontWeight: "700" },
//   scrollContent: { padding: 16, paddingBottom: 40 },
//   profileCard: {
//     marginBottom: 16,
//     borderRadius: 16,
//     backgroundColor: "#fafafa",
//     overflow: "hidden",
//   },
//   profileImageContainer: {
//     width: "100%",
//     height: width * 0.9,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   profileImage: { width: "100%", height: "100%" },
//   profileEmoji: { fontSize: 48 },
//   profileInfo: { padding: 12 },
//   profileTitle: { color: "#e91e63", fontWeight: "600", marginBottom: 4 },
//   profileNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   profileName: { fontSize: 18, fontWeight: "700" },
//   verifiedBadge: {
//     backgroundColor: "#e3f2ff",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   verifiedText: { color: "#1e88e5", fontSize: 12 },
//   profileBio: { color: "#444", marginTop: 6 },
//   interestsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
//   interestTag: {
//     backgroundColor: "#f1f1f1",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 14,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   interestText: { color: "#333" },
//   actionButtons: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 12,
//   },
//   actionButton: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     elevation: 2,
//   },
//   likeButton: { borderWidth: 1, borderColor: "#e91e63" },
//   likedButton: { backgroundColor: "#e91e63" },
//   messageButton: { borderWidth: 1, borderColor: "#ddd" },
//   shareButton: { borderWidth: 1, borderColor: "#ddd" },
// });
