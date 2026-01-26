import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system/legacy";
import { updateCurrentUserProfile } from "@/lib/profile";
import { router } from "expo-router";
import { useMyProfile } from "@/hooks/useMyProfile";

const PREDEFINED_INTERESTS = [
  "Food Lover",
  "Traveler",
  "Hiking",
  "Music",
  "Movies",
  "Sports",
  "Coding",
  "Art",
  "Coffee",
  "Books",
];

export default function EditProfileScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: p } = useMyProfile();

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handlePickPhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!res.canceled) setPhotoURL(res.assets[0].uri);
  };

  async function toBase64(uri: string) {
    return await FS.readAsStringAsync(uri, { encoding: "base64" });
  }

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Name required");
      return;
    }
    if (!bio.trim()) {
      Alert.alert("Bio required");
      return;
    }
    if (interests.length === 0) {
      Alert.alert("Select at least one interest");
      return;
    }
    // if (!photoURL) {
    //   Alert.alert("Profile photo required");
    //   return;
    // }

    setLoading(true);

    let photoBase64: string | undefined;
    if (photoURL && photoURL.startsWith("file://")) {
      photoBase64 = await toBase64(photoURL);
      // TODO: Upload photoBase64 to backend or Firebase Storage, get remote URL
      // photoURL = uploadedUrl;
    }

    // TODO: Upload photoURL here if local URI, get remote URL (see note below)
    // Sample: const uploadedUrl = await uploadImageAndGetUrl(photoURL);

    const result = await updateCurrentUserProfile({
      displayName: name,
      bio: bio,
      interests,
      age,
      location,
      photoURL, // use uploadedUrl if uploaded
    });
    setLoading(false);

    if (result.success) {
      // Reset form after save
      setName("");
      setBio("");
      setInterests([]);
      setAge("");
      setPhotoURL("");
      Alert.alert("Profile updated successfully");
    } else {
      Alert.alert("Update error", String(result.error));
    }

    if (!result.success) {
      Alert.alert("Update error", String(result.error));
    }
  };

  useEffect(() => {
    if (p) {
      setName(p.displayName || "");
      setBio(p.bio || "");
      setInterests(p.interests || []);
      setPhotoURL(p?.photoURL || "");
      setAge(p.age ? String(p.age) : "");
      setLocation(p.location || "");
    }
  }, [p]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Profile Photo */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={photoURL ? { uri: photoURL } : { uri: p?.photoURL }}
            style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 7 }}
          />
          <TouchableOpacity onPress={handlePickPhoto}>
            <Text style={{ color: "#4377ff", fontWeight: "500", fontSize: 16 }}>
              Change profile photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Name */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Enter your name"
            onChangeText={setName}
          />
        </View>

        {/* Age */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={styles.input}
            value={age}
            keyboardType="numeric"
            placeholder="Enter your age"
            onChangeText={setAge}
          />
        </View>

        {/* Location */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            value={location}
            placeholder="Enter your location"
            onChangeText={setLocation}
          />
        </View>

        {/* Bio */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Bio *</Text>
          <TextInput
            style={[styles.input, { height: 72 }]}
            value={bio}
            placeholder="Write about yourself"
            onChangeText={setBio}
            multiline
          />
        </View>

        {/* Interests */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Interests *</Text>
          <View style={styles.interestGrid}>
            {PREDEFINED_INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestTag,
                  interests.includes(interest) && styles.interestSelected,
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text
                  style={[
                    styles.interestText,
                    interests.includes(interest) && styles.interestTextSelected,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save */}
        <TouchableOpacity
          style={styles.saveBtn}
          disabled={loading}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>{loading ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { paddingBottom: 32 },
  header: { flexDirection: "row", alignItems: "center", padding: 16, gap: 5 },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 19,
    flex: 1,
    textAlign: "center",
  },
  fieldRow: { marginHorizontal: 16, marginTop: 24 },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
    color: "#151515",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#eee",
  },
  interestGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  interestTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },
  interestSelected: { backgroundColor: "#e91e63" },
  interestText: { color: "#666", fontSize: 14 },
  interestTextSelected: { color: "#fff", fontWeight: "bold" },
  saveBtn: {
    marginHorizontal: 16,
    marginTop: 38,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: "#e91e63",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 17 },
});

/*
Note for profile photo:
- If using Firebase Storage, you need to upload photoURL with your own logic and set the result as photoURL for Firestore.
- For now, use the picked URI for testing, update with upload logic for production.
*/

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { updateCurrentUserProfile } from "@/lib/profile";

// const PREDEFINED_INTERESTS = [
//   "Food Lover",
//   "Traveler",
//   "Hiking",
//   "Music",
//   "Movies",
//   "Sports",
//   "Coding",
//   "Art",
//   "Coffee",
//   "Books",
// ];

// export default function EditProfileScreen() {
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [interests, setInterests] = useState<string[]>([]);

//   const toggleInterest = (interest: string) => {
//     setInterests((prev) =>
//       prev.includes(interest)
//         ? prev.filter((i) => i !== interest)
//         : [...prev, interest],
//     );
//   };

//   const handleSave = async () => {
//     // Save name, bio, interests logic here
//     await updateCurrentUserProfile({ displayName: name, bio, interests });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity>
//             <Ionicons name="arrow-back" size={28} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Edit Profile</Text>
//         </View>

//         {/* Name */}
//         <View style={styles.fieldRow}>
//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             value={name}
//             placeholder="Enter your name"
//             onChangeText={setName}
//           />
//         </View>

//         {/* Bio */}
//         <View style={styles.fieldRow}>
//           <Text style={styles.label}>Bio</Text>
//           <TextInput
//             style={[styles.input, { height: 72 }]}
//             value={bio}
//             placeholder="Write about yourself"
//             onChangeText={setBio}
//             multiline
//           />
//         </View>

//         {/* Interests */}
//         <View style={styles.fieldRow}>
//           <Text style={styles.label}>Interests</Text>
//           <View style={styles.interestGrid}>
//             {PREDEFINED_INTERESTS.map((interest) => (
//               <TouchableOpacity
//                 key={interest}
//                 style={[
//                   styles.interestTag,
//                   interests.includes(interest) && styles.interestSelected,
//                 ]}
//                 onPress={() => toggleInterest(interest)}
//               >
//                 <Text
//                   style={[
//                     styles.interestText,
//                     interests.includes(interest) && styles.interestTextSelected,
//                   ]}
//                 >
//                   {interest}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Save */}
//         <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
//           <Text style={styles.saveText}>Save</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   scroll: { paddingBottom: 32 },
//   header: { flexDirection: "row", alignItems: "center", padding: 16, gap: 5 },
//   headerTitle: {
//     fontWeight: "bold",
//     fontSize: 19,
//     flex: 1,
//     textAlign: "center",
//   },
//   fieldRow: { marginHorizontal: 16, marginTop: 24 },
//   label: {
//     fontWeight: "500",
//     fontSize: 16,
//     marginBottom: 10,
//     color: "#151515",
//   },
//   input: {
//     backgroundColor: "#f8f8f8",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     fontSize: 16,
//     color: "#333",
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   interestGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
//   interestTag: {
//     backgroundColor: "#f0f0f0",
//     paddingHorizontal: 13,
//     paddingVertical: 7,
//     borderRadius: 20,
//   },
//   interestSelected: {
//     backgroundColor: "#e91e63",
//   },
//   interestText: { color: "#666", fontSize: 14 },
//   interestTextSelected: { color: "#fff", fontWeight: "bold" },
//   saveBtn: {
//     marginHorizontal: 16,
//     marginTop: 38,
//     borderRadius: 8,
//     alignItems: "center",
//     paddingVertical: 14,
//     backgroundColor: "#e91e63",
//   },
//   saveText: { color: "#fff", fontWeight: "700", fontSize: 17 },
// });
