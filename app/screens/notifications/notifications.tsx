// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { FontFamily } from "@/constants/Fonts";
// import { router } from "expo-router";

// // Mock activity data
// const activityData = [
//   {
//     id: "1",
//     name: "Sophia",
//     action: "liked your profile",
//     time: "2d",
//     type: "like",
//     avatar: "@/assets/images/users/ava.png",
//     backgroundColor: "#f4c2a1",
//     fallbackEmoji: "👩‍🎨",
//   },
//   {
//     id: "2",
//     name: "Liam",
//     action: "sent you a message",
//     time: "1d",
//     type: "message",
//     avatar: "@/assets/images/users/liam.png",
//     backgroundColor: "#8a8a8a",
//     fallbackEmoji: "👨‍🎤",
//   },
// ];

// export default function ActivityScreen() {
//   const [activities, setActivities] = useState(activityData);
//   const [hasUnread, setHasUnread] = useState(true);

//   const handleBackPress = () => {
//     router.back();
//   };

//   const handleMarkAllAsRead = () => {
//     setHasUnread(false);
//     console.log("All activities marked as read");
//   };

//   const handleActivityPress = (activity) => {
//     if (activity.type === "message") {
//       // Navigate to chat with this person
//       console.log(`Open chat with ${activity.name}`);
//     } else if (activity.type === "like") {
//       // Navigate to their profile or show match screen
//       console.log(`Open profile for ${activity.name}`);
//     }
//   };

//   const renderActivityItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.activityItem}
//       onPress={() => handleActivityPress(item)}
//     >
//       <View style={styles.avatarContainer}>
//         <View
//           style={[
//             styles.avatarCircle,
//             { backgroundColor: item.backgroundColor },
//           ]}
//         >
//           <Image
//             source={{ uri: item.avatar }}
//             style={styles.avatarImage}
//             defaultSource={require("@/assets/images/users/ava.png")}
//           />
//         </View>
//       </View>

//       <View style={styles.activityContent}>
//         <Text style={styles.activityName}>{item.name}</Text>
//         <Text style={styles.activityAction}>{item.action}</Text>
//       </View>

//       <Text style={styles.activityTime}>{item.time}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header with Back Arrow */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Activity</Text>
//         <TouchableOpacity
//           style={styles.markAllButton}
//           onPress={handleMarkAllAsRead}
//         >
//           <Text style={styles.markAllText}>Mark All as Read</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Activity List */}
//       <FlatList
//         data={activities}
//         renderItem={renderActivityItem}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.activityList}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//       />
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
//   },
//   backButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontFamily: FontFamily.bold,
//     color: "#333",
//     flex: 1,
//   },
//   markAllButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   markAllText: {
//     fontSize: 14,
//     fontFamily: FontFamily.medium,
//     color: "#9333ea",
//   },
//   activityList: {
//     paddingTop: 8,
//   },
//   activityItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: "#ffffff",
//   },
//   avatarContainer: {
//     marginRight: 16,
//   },
//   avatarCircle: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   avatarImage: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     resizeMode: "cover",
//   },
//   activityContent: {
//     flex: 1,
//   },
//   activityName: {
//     fontSize: 18,
//     fontFamily: FontFamily.semiBold,
//     color: "#333",
//     marginBottom: 4,
//   },
//   activityAction: {
//     fontSize: 14,
//     fontFamily: FontFamily.regular,
//     color: "#666",
//     lineHeight: 20,
//   },
//   activityTime: {
//     fontSize: 14,
//     fontFamily: FontFamily.regular,
//     color: "#999",
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#f0f0f0",
//     marginLeft: 92,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontFamily } from "@/constants/Fonts";
import { router } from "expo-router";
import { auth } from "@/config/firebase";
import {
  listenToNotifications,
  markAsRead,
  markAllAsRead,
} from "@/lib/notifications";

export default function ActivityScreen() {
  const [activities, setActivities] = useState([]);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribe = listenToNotifications(currentUserId, (notifs) => {
      const formatted = notifs.map((n) => ({
        id: n.id,
        name: n.fromUserName || "Someone",
        action:
          n.type === "like"
            ? "liked your profile"
            : n.type === "message"
              ? "sent you a message"
              : "interacted with you",
        time: formatTime(n.timestamp?.toDate()),
        type: n.type,
        avatar: n.fromUserAvatar || "",
        backgroundColor: "#f4c2a1",
        fallbackEmoji: "👤",
        read: n.read,
        fromUserId: n.fromUserId,
      }));
      setActivities(formatted);
    });

    return unsubscribe;
  }, [currentUserId]);

  const formatTime = (date) => {
    if (!date) return "now";
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleMarkAllAsRead = async () => {
    if (!currentUserId) return;
    const unreadIds = activities.filter((a) => !a.read).map((a) => a.id);
    if (unreadIds.length > 0) {
      await markAllAsRead(currentUserId, unreadIds);
    }
  };

  const handleActivityPress = async (activity) => {
    if (!currentUserId) return;

    // Mark as read
    if (!activity.read) {
      await markAsRead(currentUserId, activity.id);
    }

    if (activity.type === "message") {
      router.push({
        pathname: "/screens/chats/chats",
        params: {
          userId: activity.fromUserId,
          userName: activity.name,
          userAvatar: activity.avatar,
        },
      });
    } else if (activity.type === "like") {
      console.log(`Open profile for ${activity.name}`);
      // Navigate to profile or show match screen
    }
  };

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.activityItem, !item.read && styles.unreadActivity]}
      onPress={() => handleActivityPress(item)}
    >
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.avatarCircle,
            { backgroundColor: item.backgroundColor },
          ]}
        >
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.fallbackEmoji}>{item.fallbackEmoji}</Text>
          )}
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.activityContent}>
        <Text style={styles.activityName}>{item.name}</Text>
        <Text style={styles.activityAction}>{item.action}</Text>
      </View>

      <Text style={styles.activityTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  const unreadCount = activities.filter((a) => !a.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity</Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.activityList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: "#333",
    flex: 1,
  },
  markAllButton: { paddingVertical: 8, paddingHorizontal: 12 },
  markAllText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: "#9333ea",
  },
  activityList: { paddingTop: 8 },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
  },
  unreadActivity: { backgroundColor: "#f9fafb" },
  avatarContainer: { marginRight: 16, position: "relative" },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: { width: 52, height: 52, borderRadius: 26, resizeMode: "cover" },
  fallbackEmoji: { fontSize: 24 },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e91e63",
    borderWidth: 2,
    borderColor: "#fff",
  },
  activityContent: { flex: 1 },
  activityName: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: "#333",
    marginBottom: 4,
  },
  activityAction: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: "#666",
    lineHeight: 20,
  },
  activityTime: { fontSize: 14, fontFamily: FontFamily.regular, color: "#999" },
  separator: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 92 },
  emptyContainer: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 16, fontFamily: FontFamily.regular, color: "#999" },
});
