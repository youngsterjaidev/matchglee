// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";

// export default function ComingSoon() {
//   return (
//     <View style={styles.container}>
//       {/* Top Navigation Bar */}
//       <View style={styles.topNav}>
//         <TouchableOpacity>
//           <Ionicons name="add" size={26} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Memes</Text>
//         <View style={styles.rightIcons}>
//           <TouchableOpacity
//             style={styles.iconButton}
//             onPress={() =>
//               router.navigate("/screens/notifications/notifications")
//             }
//           >
//             <Ionicons name="notifications-outline" size={24} color="#333" />
//           </TouchableOpacity>
//           {/*<TouchableOpacity
//             style={styles.iconButton}
//             onPress={() => router.navigate("/screens/chats/chats-list")}
//           >
//             <Ionicons name="chatbubble-outline" size={24} color="#333" />
//           </TouchableOpacity>*/}
//         </View>
//       </View>
//       <View style={styles.contentContainer}>
//         <Text style={styles.title}>Coming Soon</Text>
//         <Text style={styles.subtitle}>
//           This feature will be available in a future update. Stay tuned!
//         </Text>
//         <Text style={styles.subtitle}>
//           Only{" "}
//           <Text style={{ fontWeight: "bold", color: "#e91e63" }}>Network</Text>{" "}
//           and{" "}
//           <Text style={{ fontWeight: "bold", color: "#e91e63" }}>Profile</Text>{" "}
//           feature is available now.
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 24,
//   },
//   topNav: {
//     paddingTop: 50,
//     paddingBottom: 15,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerTitle: {
//     fontWeight: "bold",
//     fontSize: 22,
//     color: "#e91e63",
//     display: "none",
//   },
//   rightIcons: {
//     flexDirection: "row",
//   },
//   iconButton: {
//     marginLeft: 15,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#e91e63",
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#666",
//     textAlign: "center",
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { auth } from "@/config/firebase";
import { listenUnreadCount } from "@/lib/notifications";

export default function ComingSoon() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const unsub = listenUnreadCount(uid, setCount);
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity>
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Memes</Text>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              router.navigate("/screens/notifications/notifications")
            }
          >
            <View>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              {count > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {count > 99 ? "99+" : count}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          This feature will be available in a future update. Stay tuned!
        </Text>
        <Text style={styles.subtitle}>
          Only{" "}
          <Text style={{ fontWeight: "bold", color: "#e91e63" }}>Network</Text>{" "}
          and{" "}
          <Text style={{ fontWeight: "bold", color: "#e91e63" }}>Profile</Text>{" "}
          feature is available now.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
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
  rightIcons: { flexDirection: "row" },
  iconButton: { marginLeft: 15 },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#e91e63",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e91e63",
    marginBottom: 16,
  },
  subtitle: { fontSize: 18, color: "#666", textAlign: "center" },
});
