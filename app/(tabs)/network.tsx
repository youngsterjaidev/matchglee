// import { FontFamily } from "@/constants/Fonts";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useState, useEffect, useCallback } from "react";
// import { fetchProfiles } from "@/lib/firestore";
// import { auth } from "@/config/firebase";
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { likeProfile, unlikeProfile, fetchLikedProfiles } from "@/lib/likes";
// import { useMyProfile } from "@/hooks/useMyProfile";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// export default function HomeScreen() {
//   const router = useRouter();
//   const [profiles, setProfiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());

//   const load = useCallback(async () => {
//     try {
//       const currentUserId = auth?.currentUser?.uid;
//       if (!currentUserId) return;

//       // Fetch profiles and liked profiles in parallel
//       const [profilesData, likedIds] = await Promise.all([
//         fetchProfiles(currentUserId),
//         fetchLikedProfiles(currentUserId),
//       ]);

//       setProfiles(profilesData);
//       setLikedProfiles(new Set(likedIds)); // Set liked profiles from Firestore
//     } catch (e) {
//       Alert.alert("Error", "Failed to load profiles");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]); // initial fetch

//   // Update handleLike in HomeScreen:
//   const handleLike = async (profile) => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     const newLikedProfiles = new Set(likedProfiles);
//     const isLiked = likedProfiles.has(profile.id);

//     // Optimistic update - UI updates immediately
//     if (isLiked) {
//       newLikedProfiles.delete(profile.id);
//     } else {
//       newLikedProfiles.add(profile.id);
//     }
//     setLikedProfiles(newLikedProfiles); // Update UI first

//     // Background Firestore sync (no await)
//     try {
//       if (isLiked) {
//         unlikeProfile(currentUser.uid, profile.id);
//       } else {
//         likeProfile(
//           currentUser.uid,
//           profile.id,
//           currentUser.displayName || "Someone",
//           currentUser.photoURL || "",
//         );
//       }
//     } catch (error) {
//       // Rollback on error
//       setLikedProfiles(likedProfiles);
//       Alert.alert("Error", "Failed to update like");
//     }
//   };

//   const handleShare = (profile) => {
//     console.log(`Share profile: ${profile.name}`);
//   };

//   const handleMessage = (profile) => {
//     // router.push(`/screens/chats/chats`);
//     router.push({
//       pathname: "/screens/chats/chats",
//       params: {
//         userId: profile.id,
//         userName: profile.displayName || "Unknown",
//         userAvatar: profile.photoURL || "",
//         userEmoji: profile.fallbackEmoji || "👤",
//         userBg: profile.backgroundColor || "#ddd",
//       },
//     });
//     console.log(`Message profile: `, profile);
//   };

//   const renderInterestTag = (interest) => (
//     <View key={interest} style={styles.interestTag}>
//       <Text style={styles.interestText}>{interest}</Text>
//     </View>
//   );

//   const renderProfile = (profile) => (
//     <View key={profile.id} style={styles.profileCard}>
//       {/* Profile Image */}
//       <View
//         style={[
//           styles.profileImageContainer,
//           { backgroundColor: profile.backgroundColor || "#ddd" },
//         ]}
//       >
//         {profile?.photoURL ? (
//           <Image
//             // source={profile.image || require("@/assets/images/react-logo.png")}
//             source={{ uri: profile?.photoURL }}
//             style={styles.profileImage}
//           />
//         ) : (
//           <Text style={styles.profileEmoji}>
//             {profile.fallbackEmoji || "👨‍💻"}
//           </Text>
//         )}
//       </View>

//       {/* Profile Info */}
//       <View style={styles.profileInfo}>
//         {profile.title && (
//           <Text style={styles.profileTitle}>{profile.title}</Text>
//         )}

//         <View style={styles.profileNameRow}>
//           <Text style={styles.profileName}>
//             {profile?.displayName || "Unknown"}, {profile.age}
//           </Text>
//           {!profile.verified && (
//             <View style={styles.verifiedBadge}>
//               <Text style={styles.verifiedText}>Verified</Text>
//             </View>
//           )}
//         </View>

//         <Text style={styles.profileBio}>
//           {profile.bio || "No bio provided"}
//         </Text>

//         {/* Interests */}
//         <View style={styles.interestsContainer}>
//           {profile.interests.map(renderInterestTag)}
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={[
//             styles.actionButton,
//             styles.likeButton,
//             likedProfiles.has(profile.id) && styles.likedButton,
//           ]}
//           onPress={() => handleLike(profile)}
//         >
//           <Ionicons
//             name={likedProfiles.has(profile.id) ? "heart" : "heart-outline"}
//             size={24}
//             color={likedProfiles.has(profile.id) ? "#fff" : "#e91e63"}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionButton, styles.messageButton]}
//           onPress={() => handleMessage(profile)}
//         >
//           <Ionicons name="chatbubble-outline" size={24} color="#333" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionButton, styles.shareButton]}
//           onPress={() => handleShare(profile)}
//         >
//           <Ionicons name="share-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>MatchGlee</Text>
//         <TouchableOpacity>
//           <Ionicons name="settings-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Feed */}
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {profiles.map(renderProfile)}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     display: "none",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontFamily: FontFamily.bold,
//     color: "#e91e63",
//   },
//   scrollContent: {
//     paddingVertical: 20,
//   },
//   profileCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginBottom: 24,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 6,
//     overflow: "hidden",
//   },
//   profileImageContainer: {
//     height: 280,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   profileImage: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 12,
//     resizeMode: "cover",
//   },
//   profileEmoji: {
//     fontSize: 80,
//   },
//   profileInfo: {
//     padding: 20,
//   },
//   profileTitle: {
//     fontSize: 12,
//     fontFamily: FontFamily.medium,
//     color: "#666",
//     textTransform: "uppercase",
//     marginBottom: 4,
//     letterSpacing: 1,
//   },
//   profileNameRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   profileName: {
//     fontSize: 20,
//     fontFamily: FontFamily.bold,
//     color: "#333",
//     marginRight: 12,
//   },
//   verifiedBadge: {
//     backgroundColor: "#e91e63",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   verifiedText: {
//     fontSize: 10,
//     fontFamily: FontFamily.semiBold,
//     color: "#ffffff",
//   },
//   profileBio: {
//     fontSize: 16,
//     fontFamily: FontFamily.regular,
//     color: "#666",
//     lineHeight: 22,
//     marginBottom: 16,
//   },
//   interestsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     // NOTE: Update later
//     display: "none",
//   },
//   interestTag: {
//     backgroundColor: "#f0f0f0",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   interestText: {
//     fontSize: 12,
//     fontFamily: FontFamily.medium,
//     color: "#666",
//   },
//   actionButtons: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     gap: 12,
//   },
//   actionButton: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     borderRadius: 25,
//     borderWidth: 1,
//   },
//   likeButton: {
//     borderColor: "#e91e63",
//     backgroundColor: "#fff",
//     // // NOTE: Update later
//     // display: "none",
//   },
//   likedButton: {
//     backgroundColor: "#e91e63",
//     borderColor: "#e91e63",
//   },
//   messageButton: {
//     borderColor: "#e0e0e0",
//     backgroundColor: "#fff",
//   },
//   shareButton: {
//     borderColor: "#e0e0e0",
//     backgroundColor: "#fff",
//     // NOTE: Update later
//     display: "none",
//   },
// });

// app/(tabs)/network.tsx
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
import { likeProfile, unlikeProfile, fetchLikedProfiles } from "@/lib/likes";
import { useRouter } from "expo-router";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ensureChat, getChatId, resetUnread } from "@/lib/chat";

const { width } = Dimensions.get("window");

export default function NetworkScreen() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatOpening, setChatOpening] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());

  const attachUnseenCounts = useCallback(
    async (list: any[], currentUserId: string) => {
      const db = getFirestore();
      const qs = await getDocs(
        query(
          collection(db, "chats"),
          where("participants", "array-contains", currentUserId),
        ),
      );
      const map = new Map<string, number>(); // otherUserId -> count
      qs.forEach((d) => {
        const data: any = d.data();
        const otherId = Array.isArray(data.participants)
          ? data.participants.find((p: string) => p !== currentUserId)
          : undefined;
        const cnt = Number(data?.unread?.[currentUserId] ?? 0);
        if (otherId) map.set(otherId, (map.get(otherId) ?? 0) + cnt);
      });
      return list.map((p) => ({ ...p, unseenCount: map.get(p.id) ?? 0 }));
    },
    [],
  );

  const load = useCallback(async () => {
    try {
      const currentUserId = auth?.currentUser?.uid;
      if (!currentUserId) return;

      const [profilesData, likedIds] = await Promise.all([
        fetchProfiles(currentUserId),
        fetchLikedProfiles(currentUserId),
      ]);
      const withCounts = await attachUnseenCounts(profilesData, currentUserId);

      setProfiles(withCounts);
      setLikedProfiles(new Set(likedIds));
    } catch (e) {
      Alert.alert("Error", "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [attachUnseenCounts]);

  useEffect(() => {
    load();
  }, [load]);

  const handleLike = async (profile) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const newLiked = new Set(likedProfiles);
    const isLiked = likedProfiles.has(profile.id);
    if (isLiked) newLiked.delete(profile.id);
    else newLiked.add(profile.id);
    setLikedProfiles(newLiked);

    try {
      if (isLiked) {
        unlikeProfile(currentUser.uid, profile.id);
      } else {
        likeProfile(
          currentUser.uid,
          profile.id,
          currentUser.displayName || "Someone",
          currentUser.photoURL || "",
        );
      }
    } catch {
      setLikedProfiles(likedProfiles);
      Alert.alert("Error", "Failed to update like");
    }
  };

  const handleMessage = async (profile) => {
    if (chatOpening) return; // Prevent double open
    setChatOpening(true);

    const me = auth.currentUser?.uid;
    if (!me) return;
    const chatId = getChatId(me, profile.id);
    await ensureChat(chatId, me, profile.id);
    await resetUnread(chatId, me);

    router.push({
      pathname: "/screens/chats/chats",
      params: {
        userId: profile.id,
        userName: profile.displayName || "Unknown",
        userAvatar: profile.photoURL || "",
        userEmoji: profile.fallbackEmoji || "👤",
        userBg: profile.backgroundColor || "#ddd",
      },
    });

    setTimeout(() => setChatOpening(false), 800); // Re-enable after 1s
  };

  const renderInterestTag = (interest) => (
    <View key={interest} style={styles.interestTag}>
      <Text style={styles.interestText}>{interest}</Text>
    </View>
  );

  const renderProfile = (profile) => (
    <View key={profile.id} style={styles.profileCard}>
      <View
        style={[
          styles.profileImageContainer,
          { backgroundColor: profile.backgroundColor || "#ddd" },
        ]}
      >
        {profile?.photoURL ? (
          <Image
            source={{ uri: profile?.photoURL }}
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.profileEmoji}>
            {profile.fallbackEmoji || "👨‍💻"}
          </Text>
        )}
      </View>

      <View style={styles.profileInfo}>
        {!!profile.title && (
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

        <View style={styles.interestsContainer}>
          {(profile.interests || []).map(renderInterestTag)}
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.likeButton,
            likedProfiles.has(profile.id) && styles.likedButton,
          ]}
          onPress={() => handleLike(profile)}
        >
          <Ionicons
            name={likedProfiles.has(profile.id) ? "heart" : "heart-outline"}
            size={24}
            color={likedProfiles.has(profile.id) ? "#fff" : "#e91e63"}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, position: "relative" }}>
          <TouchableOpacity
            style={[styles.actionButton, styles.messageButton]}
            onPress={() => handleMessage(profile)}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#333" />
          </TouchableOpacity>
          {profile.unseenCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {profile.unseenCount > 99 ? "99+" : profile.unseenCount}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => {}}
        >
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContent: { paddingVertical: 20 },
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
  profileEmoji: { fontSize: 80 },
  profileInfo: { padding: 20 },
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
    display: "none",
  },
  interestTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: { fontSize: 12, fontFamily: FontFamily.medium, color: "#666" },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  likeButton: { borderColor: "#e91e63", backgroundColor: "#fff" },
  likedButton: { backgroundColor: "#e91e63", borderColor: "#e91e63" },
  messageButton: { borderColor: "#e0e0e0", backgroundColor: "#fff" },
  shareButton: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    display: "none",
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#e91e63",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: "#fff", fontSize: 10, fontFamily: FontFamily.semiBold },
});
