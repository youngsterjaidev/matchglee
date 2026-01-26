import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import AppleIcon from "../../components/welcome/Apple-icon";
import GoogleIcon from "../../components/welcome/Google-icon";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.dismissTo("/(tabs)/profile");
    } catch (error: any) {
      let errorMessage = "An error occurred during login";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Reset Password", "Please enter your email address first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset",
        "A password reset email has been sent to your email address",
      );
    } catch (error: any) {
      let errorMessage = "An error occurred while sending reset email";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      Alert.alert("Reset Failed", errorMessage);
    }
  };

  const handleSignUp = () => {
    router.push("/screens/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#171214" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>
        <View style={styles.headerSpacer} />
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
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome Back!</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Email <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor="#876375"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#876375"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isLoading && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? "Logging In..." : "Log In"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.socialLoginContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                disabled={isLoading}
              >
                <View style={styles.contineuWithButoon}>
                  <GoogleIcon width={30} height={20} fill="#171214" />
                  <Text style={styles.socialButtonText}>
                    Continue with Google
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                disabled={isLoading}
              >
                <View style={styles.contineuWithButoon}>
                  <AppleIcon width={30} height={20} fill="#171214" />
                  <Text style={styles.socialButtonText}>
                    Continue with Apple
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
                  <Text style={styles.signUpText}>
                    Don't have an account? Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  keyboardAvoidingView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, minHeight: "100%" },
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
  headerSpacer: { width: 40 },
  contineuWithButoon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: { flex: 1, paddingHorizontal: 30 },
  titleContainer: {
    paddingVertical: 20,
    paddingBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#171214",
    textAlign: "center",
    lineHeight: 35,
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
  inputWrapper: {
    backgroundColor: "#F5F0F2",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    height: 56,
    color: "#171214",
    lineHeight: 24,
    padding: 0,
  },
  forgotPasswordContainer: {
    paddingVertical: 4,
    paddingBottom: 12,
    alignItems: "flex-start",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#876375",
    lineHeight: 21,
  },
  loginButtonContainer: { paddingVertical: 12 },
  loginButton: {
    height: 48,
    backgroundColor: "#E83894",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginButtonDisabled: { backgroundColor: "#C0C0C0" },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
  },
  socialLoginContainer: { paddingVertical: 12, gap: 12, alignItems: "center" },
  socialButton: {
    height: 40,
    backgroundColor: "#F5F0F2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
    alignSelf: "stretch",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171214",
    textAlign: "center",
    lineHeight: 21,
  },
  bottomContainer: {
    paddingVertical: 10,
    paddingBottom: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#876375",
    textAlign: "center",
    lineHeight: 21,
  },
});

export default LoginScreen;
