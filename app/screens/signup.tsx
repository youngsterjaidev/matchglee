// app/screens/signup.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as FS from "expo-file-system/legacy"; // legacy API surface

export default function SignupScreen() {
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
      quality: 0.7, // keep request small
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  async function toBase64(uri: string) {
    // legacy readAsStringAsync supports string literal encoding
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

      console.log(photoBase64);

      const r = await fetch("http://172.20.10.5:3000/api/register", {
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
      console.log(data);
      if (!r.ok) throw new Error(data.error || "Signup failed");

      Alert.alert("Success", "Account created");
      // navigate to home or login
    } catch (e: any) {
      console.log(e);
      Alert.alert("Error", e.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, padding: 16, gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Create account
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              style={{ alignSelf: "center", marginVertical: 8 }}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 120, height: 120, borderRadius: 60 }}
                />
              ) : (
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: "#eee",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text>Upload photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              placeholder="Display name"
              value={displayName}
              onChangeText={setDisplayName}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
              }}
            />
            <TextInput
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
              }}
            />
            <TextInput
              placeholder="Bio (optional)"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
              maxLength={200}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
                height: 80,
                textAlignVertical: "top",
              }}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
              }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
              }}
            />

            <TouchableOpacity
              disabled={loading}
              onPress={onSignup}
              style={{
                backgroundColor: "#e91e63",
                padding: 14,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 6,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Sign up
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: "100%",
  },
});
