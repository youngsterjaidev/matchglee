// app/screens/signup.tsx
import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system/legacy";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedText from "@/components/ThemedText";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  async function toBase64(uri: string) {
    return await FS.readAsStringAsync(uri, { encoding: "base64" });
  }

  const onSignup = async () => {
    if (!displayName || !email || !password || !age)
      return Alert.alert("Missing", "Fill all fields");
    const ageNum = Number(age);
    if (Number.isNaN(ageNum) || ageNum < 18)
      return Alert.alert("Age", "Age must be 18+");

    setLoading(true);
    try {
      let photoBase64: string | undefined;
      if (imageUri) photoBase64 = await toBase64(imageUri);

      const r = await fetch("https://matchglee.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          displayName,
          age: ageNum,
          bio,
          photoBase64,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Signup failed");

      Alert.alert("Success", "Account created");
      router.dismissTo("/screens/login");
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#171214" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Create Account</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.avatarContainer}
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <ThemedText>Upload photo</ThemedText>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Display Name <Text style={styles.required}>*</Text>
              </Text>
              <ThemedTextInput
                placeholder="Display name"
                value={displayName}
                onChangeText={setDisplayName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Age <Text style={styles.required}>*</Text>
              </Text>
              <ThemedTextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bio (optional)</Text>
              <ThemedTextInput
                placeholder="Tell us about yourself"
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={3}
                style={{
                  borderRadius: 8,
                  paddingVertical: 10,
                  height: 80,
                  textAlignVertical: "top",
                }}
                maxLength={200}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Email <Text style={styles.required}>*</Text>
              </Text>
              <ThemedTextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <ThemedTextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.signupButtonContainer}>
              <TouchableOpacity
                disabled={loading}
                onPress={onSignup}
                style={[
                  styles.signupButton,
                  loading && styles.signupButtonDisabled,
                ]}
              >
                <Text style={styles.signupButtonText}>
                  {loading ? "Creating Account..." : "Sign up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: "#171214",
  },
  keyboardAvoidingView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, minHeight: "100%" },
  content: { flex: 1, padding: 16, paddingHorizontal: 30 },
  avatarContainer: { alignSelf: "center", marginVertical: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: { marginBottom: 6, paddingVertical: 6 },
  inputLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#171214",
    marginBottom: 8,
    lineHeight: 24,
  },
  required: { color: "#E53935", fontSize: 16 },
  signupButtonContainer: { paddingVertical: 12 },
  signupButton: {
    height: 48,
    backgroundColor: "#E83894",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  signupButtonDisabled: { backgroundColor: "#C0C0C0" },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
  },
});
