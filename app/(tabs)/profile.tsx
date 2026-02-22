// import { FontFamily } from "@/constants/Fonts";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "expo-linear-gradient";
// import { signOut } from "firebase/auth";
// import { auth } from "@/config/firebase";
// import { useMyProfile } from "@/hooks/useMyProfile";

// const { width } = Dimensions.get("window");

// export default function ProfileScreen() {
//   const { data: p, loading } = useMyProfile();
//   const [segment, setSegment] = useState<"personal" | "professional">(
//     "personal",
//   );

//   if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.dismissTo("/screens/login");
//   };

//   const handleEditProfile = () => {
//     router.push("/screens/profile/editProfile");
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
//         {/* GRADIENT HEADER */}
//         <LinearGradient
//           colors={["#FF4EC7", "#9A4DFF"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.headerGradient}
//         >
//           {/* top icons */}
//           <View style={styles.headerTop}>
//             <View style={{ width: 40 }} />
//             <TouchableOpacity style={styles.settingsBtn}>
//               <Ionicons name="settings-outline" size={22} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           {/* avatar */}
//           <View style={styles.avatarWrap}>
//             <View style={styles.avatarOuterRing}>
//               <View style={styles.avatarInnerRing}>
//                 {p?.photoURL ? (
//                   <Image
//                     source={{ uri: p.photoURL }}
//                     style={{ width: 92, height: 92, borderRadius: 46 }}
//                   />
//                 ) : (
//                   <Ionicons name="person-outline" size={48} color="#fff" />
//                 )}
//               </View>
//             </View>
//           </View>

//           {/* name + tagline */}
//           <Text style={styles.nameText}>
//             {p?.displayName || "Sarah Anderson"}
//             {p?.age ? `, ${p.age}` : ""}
//           </Text>
//           <Text style={styles.taglineText}>
//             {p?.lookingFor || "Designer by day · Explorer by heart"}
//           </Text>

//           {/* location */}
//           <View style={styles.locationRow}>
//             <Ionicons name="location" size={16} color="#fff" />
//             <Text style={styles.locationText}>
//               {p?.location || "San Francisco, CA"}
//             </Text>
//           </View>

//           {/* Open To */}
//           <View style={styles.openWrap}>
//             <Text style={styles.openDot}>●</Text>
//             <Text style={styles.openLabel}>Open To</Text>
//           </View>

//           {/* chips row */}
//           <ScrollView
//             style={{ marginTop: 12 }}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
//           >
//             <Pill label="Collaborations" icon="star-outline" active />
//             <Pill label="Friendship" icon="heart-outline" />
//             <Pill label="Networking" icon="people-outline" />
//           </ScrollView>

//           {/* stats row */}
//           <View style={styles.statsRow}>
//             <Stat label="Followers" value="1.2K" variant="purple" />
//             <Stat label="Following" value="567" variant="pink" />
//             <Stat label="Alignment" value="82% · 76%" variant="circle" />
//           </View>

//           {/* follow / collaborate */}
//           <View style={styles.followRow}>
//             <TouchableOpacity style={styles.followBtn}>
//               <Ionicons name="person-add-outline" size={18} color="#fff" />
//               <Text style={styles.followText}>Follow</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.collabBtn}>
//               <Ionicons name="briefcase-outline" size={18} color="#fff" />
//               <Text style={styles.collabText}>Collaborate</Text>
//             </TouchableOpacity>
//           </View>

//           {/* segment control */}
//           <View style={styles.segmentOuter}>
//             <View style={styles.segmentInner}>
//               <TouchableOpacity
//                 style={[
//                   styles.segmentItem,
//                   segment === "personal" && styles.segmentItemActive,
//                 ]}
//                 onPress={() => setSegment("personal")}
//               >
//                 <LinearGradient
//                   colors={["#FF4EC7", "#9A4DFF"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={[
//                     styles.segmentGradient,
//                     segment !== "personal" && { opacity: 0 },
//                   ]}
//                 />
//                 <View style={styles.segmentContent}>
//                   <Ionicons
//                     name="person-outline"
//                     size={18}
//                     color={segment === "personal" ? "#fff" : "#777"}
//                   />
//                   <Text
//                     style={[
//                       styles.segmentText,
//                       segment === "personal" && styles.segmentTextActive,
//                     ]}
//                   >
//                     Personal
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.segmentItem,
//                   segment === "professional" && styles.segmentItemActive,
//                 ]}
//                 onPress={() => setSegment("professional")}
//               >
//                 <LinearGradient
//                   colors={["#FF4EC7", "#9A4DFF"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   style={[
//                     styles.segmentGradient,
//                     segment !== "professional" && { opacity: 0 },
//                   ]}
//                 />
//                 <View style={styles.segmentContent}>
//                   <Ionicons
//                     name="briefcase-outline"
//                     size={18}
//                     color={segment === "professional" ? "#fff" : "#777"}
//                   />
//                   <Text
//                     style={[
//                       styles.segmentText,
//                       segment === "professional" && styles.segmentTextActive,
//                     ]}
//                   >
//                     Professional
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </LinearGradient>

//         {/* CONTENT CARD BELOW TABS */}
//         <View style={styles.contentCard}>
//           <View style={styles.contentHeaderRow}>
//             <Text style={styles.contentTitle}>
//               {segment === "personal" ? "About Me" : "Professional Summary"}
//             </Text>
//             <TouchableOpacity
//               style={styles.editChip}
//               onPress={handleEditProfile}
//             >
//               <Ionicons name="pencil" size={15} color="#FF4EC7" />
//               <Text style={styles.editChipText}>Edit</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.contentBody}>
//             {segment === "personal"
//               ? p?.bio ||
//                 "Tell others who you are, what you love, and what you are looking for."
//               : "Share your professional story, skills, and what kind of collaborations you’re open to."}
//           </Text>

//           {/* Interests section only on Personal tab */}
//           {segment === "personal" && p?.interests?.length ? (
//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.contentSubtitle}>Interests</Text>
//               <View style={styles.interestsWrap}>
//                 {p.interests.map((tag) => (
//                   <View key={tag} style={styles.interestTag}>
//                     <Text style={styles.interestText}>{tag}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           ) : null}

//           {/* Example professional tags */}
//           {segment === "professional" && (
//             <View style={{ marginTop: 20 }}>
//               <Text style={styles.contentSubtitle}>Focus Areas</Text>
//               <View style={styles.interestsWrap}>
//                 <View style={styles.interestTag}>
//                   <Text style={styles.interestText}>Product Design</Text>
//                 </View>
//                 <View style={styles.interestTag}>
//                   <Text style={styles.interestText}>Brand Deals</Text>
//                 </View>
//                 <View style={styles.interestTag}>
//                   <Text style={styles.interestText}>Speaking Gigs</Text>
//                 </View>
//               </View>
//             </View>
//           )}

//           {/* logout */}
//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Ionicons name="log-out-outline" size={18} color="#FF4EC7" />
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function Pill({
//   label,
//   icon,
//   active,
// }: {
//   label: string;
//   icon: any;
//   active?: boolean;
// }) {
//   return (
//     <LinearGradient
//       colors={
//         active
//           ? ["#FF4EC7", "#9A4DFF"]
//           : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.08)"]
//       }
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={[pillStyles.wrap, active && pillStyles.wrapActive]}
//     >
//       <Ionicons
//         name={icon}
//         size={18}
//         color={active ? "#fff" : "rgba(255,255,255,0.85)"}
//       />
//       <Text style={[pillStyles.text, active && pillStyles.textActive]}>
//         {label}
//       </Text>
//     </LinearGradient>
//   );
// }

// function Stat({
//   label,
//   value,
//   variant,
// }: {
//   label: string;
//   value: string;
//   variant: "purple" | "pink" | "circle";
// }) {
//   const color =
//     variant === "purple"
//       ? "#7B4CFF"
//       : variant === "pink"
//         ? "#FF4EC7"
//         : "#7B4CFF";

//   const iconName =
//     variant === "circle" ? "radio-button-on-outline" : "people-outline";

//   return (
//     <View style={statStyles.card}>
//       <Ionicons
//         name={iconName}
//         size={20}
//         color={color}
//         style={{ marginBottom: 6 }}
//       />
//       <Text style={[statStyles.value, { color }]}>{value}</Text>
//       <Text style={statStyles.label}>{label}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: "#F3F4F8" },
//   headerGradient: {
//     width,
//     paddingTop: 32,
//     paddingBottom: 70,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 24,
//     alignItems: "center",
//   },
//   settingsBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarWrap: { alignItems: "center", marginTop: 20 },
//   avatarOuterRing: {
//     width: 132,
//     height: 132,
//     borderRadius: 66,
//     borderWidth: 4,
//     borderColor: "rgba(255,255,255,0.7)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   avatarInnerRing: {
//     width: 112,
//     height: 112,
//     borderRadius: 56,
//     backgroundColor: "rgba(255,255,255,0.15)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   nameText: {
//     marginTop: 14,
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 22,
//     fontFamily: FontFamily.bold,
//   },
//   taglineText: {
//     marginTop: 4,
//     textAlign: "center",
//     color: "#FDEBFF",
//     fontSize: 14,
//     paddingHorizontal: 24,
//   },
//   locationRow: {
//     marginTop: 10,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 6,
//   },
//   locationText: { color: "#FDEBFF", fontSize: 13 },
//   openWrap: {
//     marginTop: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 24,
//     gap: 6,
//   },
//   openDot: { color: "#fff", fontSize: 10 },
//   openLabel: { color: "#fff", fontSize: 14 },
//   statsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 22,
//     marginTop: 24,
//   },
//   followRow: {
//     flexDirection: "row",
//     paddingHorizontal: 22,
//     marginTop: 18,
//     gap: 14,
//   },
//   followBtn: {
//     flex: 1,
//     height: 50,
//     borderRadius: 26,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.8)",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   followText: { color: "#fff", fontSize: 16, fontFamily: FontFamily.semiBold },
//   collabBtn: {
//     flex: 1,
//     height: 50,
//     borderRadius: 26,
//     backgroundColor: "rgba(255,255,255,0.95)",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   collabText: {
//     color: "#5B2C87",
//     fontSize: 16,
//     fontFamily: FontFamily.semiBold,
//   },
//   segmentOuter: { marginTop: 26, paddingHorizontal: 18 },
//   segmentInner: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     borderRadius: 30,
//     padding: 4,
//   },
//   segmentItem: {
//     flex: 1,
//     borderRadius: 26,
//     overflow: "hidden",
//     position: "relative",
//   },
//   segmentItemActive: {},
//   segmentGradient: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 26,
//   },
//   segmentContent: {
//     height: 44,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },
//   segmentText: {
//     fontSize: 15,
//     color: "#777",
//     fontFamily: FontFamily.medium,
//   },
//   segmentTextActive: {
//     color: "#fff",
//   },
//   contentCard: {
//     marginTop: -26,
//     marginHorizontal: 18,
//     borderRadius: 26,
//     backgroundColor: "#fff",
//     padding: 18,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   contentHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   contentTitle: {
//     fontSize: 18,
//     fontFamily: FontFamily.bold,
//     color: "#222",
//   },
//   editChip: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     borderRadius: 18,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     backgroundColor: "#FFE7F5",
//   },
//   editChipText: {
//     color: "#FF4EC7",
//     fontSize: 13,
//     fontFamily: FontFamily.medium,
//   },
//   contentBody: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#555",
//     lineHeight: 20,
//   },
//   contentSubtitle: {
//     fontSize: 15,
//     marginBottom: 8,
//     color: "#333",
//     fontFamily: FontFamily.semiBold,
//   },
//   interestsWrap: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   interestTag: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 18,
//     backgroundColor: "#F4ECFF",
//   },
//   interestText: {
//     fontSize: 12,
//     color: "#6A3FD9",
//     fontFamily: FontFamily.medium,
//   },
//   logoutBtn: {
//     marginTop: 26,
//     alignSelf: "center",
//     flexDirection: "row",
//     gap: 6,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#FFE7F5",
//   },
//   logoutText: {
//     color: "#FF4EC7",
//     fontSize: 14,
//     fontFamily: FontFamily.medium,
//   },
// });

// const pillStyles = StyleSheet.create({
//   wrap: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 26,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.7)",
//     backgroundColor: "rgba(255,255,255,0.05)",
//     gap: 8,
//   },
//   wrapActive: {
//     borderWidth: 0,
//   },
//   text: {
//     color: "rgba(255,255,255,0.85)",
//     fontSize: 15,
//     fontFamily: FontFamily.medium,
//   },
//   textActive: {
//     color: "#fff",
//   },
// });

// const statStyles = StyleSheet.create({
//   card: {
//     flex: 1,
//     marginHorizontal: 5,
//     borderRadius: 24,
//     backgroundColor: "#FFFFFF",
//     paddingVertical: 14,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.16,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   value: {
//     fontSize: 20,
//     fontFamily: FontFamily.bold,
//     marginBottom: 4,
//   },
//   label: {
//     fontSize: 13,
//     color: "#555764",
//     fontFamily: FontFamily.regular,
//   },
// });

import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useMyProfile } from "@/hooks/useMyProfile";

const { width } = Dimensions.get("window");

/* -------------------------------------------------------------------------- */
/* ✅ MAIN SCREEN */
/* -------------------------------------------------------------------------- */

export default function ProfileScreen() {
  const { data: p, loading } = useMyProfile();
  const [segment, setSegment] = useState<"personal" | "professional">(
    "personal",
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  const handleLogout = async () => {
    await signOut(auth);
    router.dismissTo("/screens/login");
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* ✅ HEADER */}
        <LinearGradient colors={["#FF4EC7", "#9A4DFF"]} style={styles.header}>
          {/* Settings */}
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() => router.push("/screens/settings")}
            >
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatarRing}>
              {p?.photoURL ? (
                <Image source={{ uri: p.photoURL }} style={styles.avatarImg} />
              ) : (
                <Ionicons name="person-outline" size={50} color="#fff" />
              )}
            </View>
          </View>

          {/* Name */}
          <Text style={styles.name}>{p?.displayName || "Sarah Anderson"}</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>
            Designer by day · Explorer by heart
          </Text>

          {/* Location */}
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#fff" />
            <Text style={styles.location}>San Francisco, CA</Text>
          </View>

          {/* ✅ Open To */}
          <View style={styles.openRow}>
            <View style={styles.openBullet} />
            <Text style={styles.openText}>Open To</Text>
          </View>

          {/* Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
          >
            <Chip label="Collaborations" icon="star-outline" />
            <Chip label="Friendship" icon="heart-outline" />
            <Chip label="Networking" icon="people-outline" />
          </ScrollView>

          {/* Stats */}
          <View style={styles.statsRow}>
            <Stat value="1.2K" label="Followers" />
            <Stat value="567" label="Following" />
            <Stat value="82% · 76%" label="Alignment" />
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.followBtn}>
              <Ionicons name="person-add-outline" size={18} color="#7B4CFF" />
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageBtn}>
              <Ionicons name="chatbubble-outline" size={18} color="#fff" />
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsWrap}>
            <TouchableOpacity
              style={[styles.tab, segment === "personal" && styles.tabActive]}
              onPress={() => setSegment("personal")}
            >
              <Ionicons
                name="person-outline"
                size={18}
                color={segment === "personal" ? "#fff" : "#666"}
              />
              <Text
                style={[
                  styles.tabText,
                  segment === "personal" && styles.tabTextActive,
                ]}
              >
                Personal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                segment === "professional" && styles.tabActive,
              ]}
              onPress={() => setSegment("professional")}
            >
              <Ionicons
                name="briefcase-outline"
                size={18}
                color={segment === "professional" ? "#fff" : "#666"}
              />
              <Text
                style={[
                  styles.tabText,
                  segment === "professional" && styles.tabTextActive,
                ]}
              >
                Professional
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ✅ BODY CONTENT */}
        {segment === "personal" ? <PersonalTab /> : <ProfessionalTab />}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#FF4EC7" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ PERSONAL TAB */
/* -------------------------------------------------------------------------- */

function PersonalTab() {
  return (
    <>
      <AboutMeCard />
      <HighlightsSection />
      <GallerySection />
      <LookingForSection />
      <ConnectSection />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ PROFESSIONAL TAB */
/* -------------------------------------------------------------------------- */

function ProfessionalTab() {
  return (
    <>
      <ProfessionalSummary />
      <SkillsBlock />
      <LanguagesBlock />
      <ExperienceBlock />
      <EducationBlock />
      <PortfolioBlock />
      <ProfessionalGalleryBlock />
      <LookingForSection />
      <ConnectSection />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ REUSABLE UI */
/* -------------------------------------------------------------------------- */

function Chip({ label, icon }: any) {
  return (
    <View style={styles.chip}>
      <Ionicons name={icon} size={18} color="#fff" />
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function Stat({ value, label }: any) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ PERSONAL COMPONENTS */
/* -------------------------------------------------------------------------- */

function AboutMeCard() {
  return (
    <View style={card.block}>
      <View style={card.headerRow}>
        <Ionicons name="heart-outline" size={22} color="#FF4EC7" />
        <Text style={card.title}>About Me</Text>
      </View>

      <Text style={card.body}>
        Adventure seeker and coffee enthusiast ☕ I love exploring new hiking
        trails on weekends and discovering cozy cafes around the city.
      </Text>
    </View>
  );
}

function HighlightsSection() {
  const highlights = [
    { label: "Creative", icon: "color-palette-outline" },
    { label: "Explorer", icon: "compass-outline" },
    { label: "Team Player", icon: "people-outline" },
    { label: "Music Lover", icon: "musical-notes-outline" },
  ];

  return (
    <View style={card.block}>
      <View style={card.rowBetween}>
        <Text style={card.titlePlain}>Personality Highlights</Text>
        <Text style={card.sub}>5 highlights</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {highlights.map((h) => (
          <View key={h.label} style={card.highlightCard}>
            <Ionicons name={h.icon} size={34} color="#7B4CFF" />
            <Text style={card.highlightText}>{h.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function GallerySection() {
  const images = [
    "https://picsum.photos/300/200?1",
    "https://picsum.photos/300/200?2",
    "https://picsum.photos/300/200?3",
  ];

  return (
    <View style={card.block}>
      <View style={card.rowBetween}>
        <Text style={card.titlePlain}>My Gallery</Text>
        <Text style={card.link}>View All</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((img, i) => (
          <Image key={i} source={{ uri: img }} style={card.galleryImg} />
        ))}
      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ PROFESSIONAL COMPONENTS */
/* -------------------------------------------------------------------------- */

function ProfessionalSummary() {
  return (
    <View style={pro.card}>
      <View style={pro.headerRow}>
        <Ionicons name="briefcase-outline" size={22} color="#7B4CFF" />
        <Text style={pro.title}>Professional Summary</Text>
      </View>

      <Text style={pro.bigRole}>Senior Product Designer</Text>
      <Text style={pro.company}>TechCorp · San Francisco, CA</Text>

      <Text style={pro.desc}>
        Passionate designer with 6+ years of experience creating user-centered
        digital products. Specialized in mobile and web design, with a strong
        focus on accessibility and inclusive design.
      </Text>
    </View>
  );
}

function SkillsBlock() {
  return (
    <View style={pro.card}>
      <Text style={pro.sectionLabel}>Skills</Text>

      <View style={pro.pillRow}>
        {[
          "UI Design",
          "Marketing",
          "React",
          "Product Strategy",
          "Data Analysis",
        ].map((s) => (
          <View key={s} style={pro.pill}>
            <Text style={pro.pillText}>{s}</Text>
          </View>
        ))}
      </View>

      <Text style={[pro.sectionLabel, { marginTop: 28 }]}>Expertise</Text>

      <View style={pro.pillRow}>
        {["UX Research", "Brand Strategy", "Agile", "Leadership"].map((s) => (
          <View key={s} style={pro.pillSoft}>
            <Text style={pro.pillText}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function LanguagesBlock() {
  return (
    <View style={pro.card}>
      <Text style={pro.sectionLabel}>Languages</Text>

      {["English (Native)", "Spanish (Fluent)", "French (Intermediate)"].map(
        (l) => (
          <View key={l} style={pro.langRow}>
            <Ionicons name="language-outline" size={18} color="#7B4CFF" />
            <Text style={pro.langText}>{l}</Text>
          </View>
        ),
      )}
    </View>
  );
}

function ExperienceBlock() {
  const jobs = [
    {
      role: "Senior Product Designer",
      company: "TechCorp",
      years: "2022 - Present",
      tag: "Full-time",
    },
    {
      role: "UX Designer",
      company: "StartupHub",
      years: "2020 - 2022",
      tag: "Full-time",
    },
    {
      role: "Freelance Designer",
      company: "Self-Employed",
      years: "2018 - 2020",
      tag: "Freelance",
    },
  ];

  return (
    <View style={pro.card}>
      <View style={pro.headerRow}>
        <Ionicons name="briefcase-outline" size={22} color="#7B4CFF" />
        <Text style={pro.title}>Experience</Text>
      </View>

      {jobs.map((j, idx) => (
        <View key={idx} style={pro.jobRow}>
          <View style={pro.timelineDot} />
          <View style={{ flex: 1 }}>
            <Text style={pro.jobRole}>{j.role}</Text>
            <Text style={pro.jobCompany}>{j.company}</Text>

            <View style={pro.jobMeta}>
              <Text style={pro.jobYears}>{j.years}</Text>
              <View style={pro.jobTag}>
                <Text style={pro.jobTagText}>{j.tag}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function EducationBlock() {
  return (
    <View style={pro.card}>
      <View style={pro.headerRow}>
        <Ionicons name="school-outline" size={22} color="#FF4EC7" />
        <Text style={pro.title}>Education</Text>
      </View>

      {[
        {
          title: "Master's in Design",
          school: "Stanford University",
          year: 2020,
        },
        { title: "B.A. in Visual Arts", school: "UC Berkeley", year: 2018 },
      ].map((e, i) => (
        <View key={i} style={pro.eduBox}>
          <Ionicons name="school-outline" size={22} color="#7B4CFF" />
          <View>
            <Text style={pro.eduTitle}>{e.title}</Text>
            <Text style={pro.eduSub}>{e.school}</Text>
            <Text style={pro.eduYear}>{e.year}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function PortfolioBlock() {
  return (
    <View style={pro.card}>
      <View style={pro.headerBetween}>
        <View style={pro.headerRow}>
          <Ionicons name="ribbon-outline" size={22} color="#7B4CFF" />
          <Text style={pro.title}>Portfolio</Text>
        </View>
        <Text style={pro.viewAll}>View All ↗</Text>
      </View>

      <PortfolioItem
        img="https://picsum.photos/500/250?1"
        title="Mobile Banking App"
        desc="Led design for a fintech startup"
        tags={["UI Design", "Mobile"]}
      />

      <PortfolioItem
        img="https://picsum.photos/500/250?2"
        title="Brand Identity System"
        desc="Created cohesive brand language"
        tags={["Branding", "Design"]}
      />
    </View>
  );
}

function PortfolioItem({ img, title, desc, tags }: any) {
  return (
    <View style={pro.portBox}>
      <Image source={{ uri: img }} style={pro.portImg} />
      <Text style={pro.portTitle}>{title}</Text>
      <Text style={pro.portDesc}>{desc}</Text>

      <View style={pro.tagRow}>
        {tags.map((t: string) => (
          <View key={t} style={pro.tagPill}>
            <Text style={pro.tagText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ProfessionalGalleryBlock() {
  return (
    <View style={pro.card}>
      <View style={pro.headerBetween}>
        <View style={pro.headerRow}>
          <Ionicons name="camera-outline" size={22} color="#7B4CFF" />
          <Text style={pro.title}>Professional Gallery</Text>
        </View>

        <TouchableOpacity style={pro.uploadBtn}>
          <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
          <Text style={pro.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <Text style={pro.desc}>
        Showcase your work samples, achievements, certifications, and projects.
      </Text>

      <View style={pro.noteBox}>
        <Text style={pro.noteText}>
          Note: Professional Gallery is separate from your personal gallery and
          only shows work-related content.
        </Text>
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ SHARED SECTIONS */
/* -------------------------------------------------------------------------- */

function LookingForSection() {
  const items = [
    {
      title: "Looking for co-founder",
      subtitle: "Building a design tool startup",
      icon: "people-outline",
      tags: ["SaaS", "Product Design"],
    },
    {
      title: "Open to freelance",
      subtitle: "UI/UX design projects",
      icon: "code-slash-outline",
      tags: ["Remote", "Part-time"],
    },
    {
      title: "Travel buddy",
      subtitle: "Japan trip in March",
      icon: "airplane-outline",
      tags: ["Adventure", "Culture"],
    },
    {
      title: "Book club member",
      subtitle: "Monthly fiction reads",
      icon: "book-outline",
      tags: ["Community", "Reading"],
    },
  ];

  return (
    <View style={card.block}>
      <View style={card.headerRow}>
        <Ionicons name="radio-button-on-outline" size={22} color="#7B4CFF" />
        <Text style={card.title}>What I'm Looking For</Text>
      </View>

      {items.map((it) => (
        <View key={it.title} style={card.lookCard}>
          <View style={card.lookIcon}>
            <Ionicons name={it.icon} size={22} color="#7B4CFF" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={card.lookTitle}>{it.title}</Text>
            <Text style={card.lookSub}>{it.subtitle}</Text>

            <View style={card.tagRow}>
              {it.tags.map((t) => (
                <View key={t} style={card.tag}>
                  <Text style={card.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function ConnectSection() {
  return (
    <View style={card.block}>
      <View style={card.headerRow}>
        <Ionicons name="chatbubble-outline" size={22} color="#7B4CFF" />
        <Text style={card.title}>How I Like to Connect</Text>
      </View>

      <View style={card.connectRow}>
        <View style={card.connectBox}>
          <View style={card.connectCircle}>
            <Ionicons name="chatbubble-outline" size={24} color="#7B4CFF" />
          </View>
          <Text style={card.connectText}>Chat-first</Text>
        </View>

        <View style={card.connectBox}>
          <View style={card.connectCircle}>
            <Ionicons name="call-outline" size={24} color="#7B4CFF" />
          </View>
          <Text style={card.connectText}>Calls</Text>
        </View>
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* ✅ STYLES */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F3F4F8" },

  header: {
    width,
    paddingTop: 45,
    paddingBottom: 70,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },

  headerTop: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },

  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarWrap: { alignItems: "center", marginTop: 20 },

  avatarRing: {
    width: 125,
    height: 125,
    borderRadius: 62,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarImg: { width: 105, height: 105, borderRadius: 52 },

  name: {
    marginTop: 14,
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
    fontFamily: FontFamily.bold,
  },

  tagline: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
    color: "#FDEBFF",
  },

  locationRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  location: { color: "#fff", fontSize: 13 },

  openRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  openBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginRight: 8,
  },

  openText: { color: "#fff", fontSize: 15 },

  chipsRow: {
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 14,
  },

  chip: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
  },

  chipText: { color: "#fff", fontSize: 15 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 20,
  },

  statCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingVertical: 18,
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    color: "#7B4CFF",
    fontFamily: FontFamily.bold,
  },

  statLabel: { fontSize: 13, color: "#555" },

  actionsRow: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 20,
    marginTop: 18,
  },

  followBtn: {
    flex: 1,
    height: 54,
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  followText: { color: "#7B4CFF", fontSize: 16 },

  messageBtn: {
    flex: 1,
    height: 54,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.25)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  messageText: { color: "#fff", fontSize: 16 },

  tabsWrap: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: 30,
    borderRadius: 40,
    padding: 6,
  },

  tab: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  tabActive: { backgroundColor: "#9A4DFF" },

  tabText: { fontSize: 15, color: "#666" },

  tabTextActive: { color: "#fff", fontFamily: FontFamily.bold },

  logoutBtn: {
    marginTop: 35,
    alignSelf: "center",
    backgroundColor: "#FFE7F5",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    gap: 8,
  },

  logoutText: { color: "#FF4EC7", fontSize: 14 },
});

/* ✅ PERSONAL + COMMON CARD STYLE */

const card = StyleSheet.create({
  block: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: 22,
    borderRadius: 26,
    padding: 18,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },

  titlePlain: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },

  sub: { fontSize: 14, color: "#999" },

  body: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: { color: "#7B4CFF", fontSize: 15 },

  highlightCard: {
    width: 115,
    height: 125,
    marginRight: 14,
    marginTop: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#EDE3FF",
    justifyContent: "center",
    alignItems: "center",
  },

  highlightText: { marginTop: 10, fontSize: 14 },

  galleryImg: {
    width: 165,
    height: 125,
    marginRight: 14,
    marginTop: 16,
    borderRadius: 20,
  },

  lookCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: "#FAF6FF",
    padding: 16,
    borderRadius: 22,
    marginTop: 16,
  },

  lookIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F1E9FF",
    justifyContent: "center",
    alignItems: "center",
  },

  lookTitle: { fontSize: 16, fontFamily: FontFamily.bold },

  lookSub: { marginTop: 4, fontSize: 14, color: "#666" },

  tagRow: { flexDirection: "row", gap: 10, marginTop: 10 },

  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#EFE6FF",
  },

  tagText: { color: "#7B4CFF", fontSize: 13 },

  connectRow: { flexDirection: "row", gap: 16, marginTop: 18 },

  connectBox: {
    flex: 1,
    height: 140,
    borderRadius: 26,
    backgroundColor: "#FAF6FF",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },

  connectCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F1E9FF",
    justifyContent: "center",
    alignItems: "center",
  },

  connectText: { fontSize: 16, fontFamily: FontFamily.semiBold },
});

/* ✅ PROFESSIONAL STYLE */

const pro = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: 20,
    borderRadius: 26,
    padding: 18,
  },

  headerRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  headerBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 18, fontFamily: FontFamily.bold },

  bigRole: {
    marginTop: 22,
    fontSize: 20,
    fontFamily: FontFamily.bold,
  },

  company: { marginTop: 6, fontSize: 15, color: "#777" },

  desc: {
    marginTop: 18,
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },

  sectionLabel: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: "#888",
    marginTop: 12,
  },

  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  pill: {
    borderWidth: 1,
    borderColor: "#D8C9FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  pillSoft: {
    backgroundColor: "#F4EFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  pillText: {
    color: "#7B4CFF",
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },

  langRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 14,
  },

  langText: { fontSize: 15, color: "#444" },

  jobRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 22,
  },

  timelineDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#9A4DFF",
    marginTop: 6,
  },

  jobRole: { fontSize: 16, fontFamily: FontFamily.bold },

  jobCompany: { marginTop: 2, fontSize: 14, color: "#777" },

  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },

  jobYears: { fontSize: 14, color: "#777" },

  jobTag: {
    backgroundColor: "#F1E9FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },

  jobTagText: {
    fontSize: 13,
    color: "#7B4CFF",
    fontFamily: FontFamily.medium,
  },

  eduBox: {
    marginTop: 18,
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#FAF6FF",
    alignItems: "center",
  },

  eduTitle: { fontSize: 16, fontFamily: FontFamily.bold },

  eduSub: { fontSize: 14, color: "#666", marginTop: 3 },

  eduYear: { marginTop: 5, fontSize: 13, color: "#888" },

  viewAll: {
    color: "#FF4EC7",
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
  },

  portBox: {
    marginTop: 18,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEE",
  },

  portImg: { width: "100%", height: 170 },

  portTitle: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginTop: 12,
    marginLeft: 14,
  },

  portDesc: {
    marginTop: 4,
    marginLeft: 14,
    fontSize: 14,
    color: "#666",
  },

  tagRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginLeft: 14,
    marginBottom: 14,
  },

  tagPill: {
    backgroundColor: "#EFE6FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  tagText: { fontSize: 13, color: "#7B4CFF" },

  uploadBtn: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
    backgroundColor: "#9A4DFF",
  },

  uploadText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },

  noteBox: {
    marginTop: 18,
    backgroundColor: "#F4EFFF",
    padding: 14,
    borderRadius: 18,
  },

  noteText: {
    color: "#7B4CFF",
    fontSize: 13,
    lineHeight: 18,
  },
});
