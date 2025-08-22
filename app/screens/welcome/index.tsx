import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    // Navigate to main sign up flow
    navigation.navigate("SignUp");
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic
    console.log("Google Sign-In pressed");
  };

  const handleAppleSignIn = () => {
    // Implement Apple Sign-In logic
    console.log("Apple Sign-In pressed");
  };

  const handleEmailSignUp = () => {
    // Navigate to email sign up
    navigation.navigate("EmailSignUp");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://yourapp.com/privacy");
  };

  const openTerms = () => {
    Linking.openURL("https://yourapp.com/terms");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>😊</Text>
          </View>
        </View>

        {/* Main Heading */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Find your vibe,{" "}
            <Text style={styles.headerAccent}>not{"\n"}just a match.</Text>
          </Text>
        </View>

        {/* Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationPlaceholder}>
            {/* You can replace this with an actual illustration */}
            <Text style={styles.illustrationText}>👥</Text>
            <Text style={styles.illustrationSubtext}>
              Diverse group of people chatting
            </Text>
          </View>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            icon={<Ionicons name="person" size={20} color="#ee2a7b" />}
            text="Personality-matched connections"
          />
          <FeatureItem
            icon={<Ionicons name="happy" size={20} color="#ee2a7b" />}
            text="Meme-powered icebreakers"
          />
          <FeatureItem
            icon={
              <Ionicons name="shield-checkmark" size={20} color="#ee2a7b" />
            }
            text="Verified, real people only"
          />
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        {/* Or continue with */}
        <Text style={styles.orText}>or continue with</Text>

        {/* Social Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignIn}
          >
            <Text style={styles.socialButtonText}>G</Text>
            <Text style={styles.socialButtonLabel}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleAppleSignIn}
          >
            <Ionicons name="logo-apple" size={18} color="#000" />
            <Text style={styles.socialButtonLabel}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Email Sign Up */}
        <TouchableOpacity onPress={handleEmailSignUp}>
          <Text style={styles.emailSignUpText}>Sign up with email</Text>
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText} onPress={openPrivacyPolicy}>
            Privacy Policy
          </Text>{" "}
          <Text style={styles.linkText} onPress={openTerms}>
            Terms
          </Text>{" "}
          and .
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Ionicons name="shield-checkmark" size={16} color="#999" />
            <Text style={styles.footerText}>100% Verified Profiles</Text>
          </View>
          <View style={styles.footerItem}>
            <Ionicons name="close-circle" size={16} color="#999" />
            <Text style={styles.footerText}>No Bots</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Feature Item Component
function FeatureItem({ icon, text }) {
  return (
    <View style={styles.featureItem}>
      {icon}
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#ee2a7b",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ee2a7b",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 32,
    color: "white",
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    lineHeight: 38,
  },
  headerAccent: {
    color: "#ee2a7b",
  },
  illustrationContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  illustrationPlaceholder: {
    width: width * 0.8,
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderStyle: "dashed",
  },
  illustrationText: {
    fontSize: 48,
    marginBottom: 8,
  },
  illustrationSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  featuresContainer: {
    marginBottom: 40,
    alignSelf: "stretch",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 20,
  },
  featureText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 12,
    fontWeight: "500",
  },
  getStartedButton: {
    backgroundColor: "#ee2a7b",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: "center",
    shadowColor: "#ee2a7b",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  orText: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    minWidth: 120,
    justifyContent: "center",
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
    color: "#4285f4",
  },
  socialButtonLabel: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 8,
  },
  emailSignUpText: {
    fontSize: 16,
    color: "#ee2a7b",
    marginBottom: 24,
    fontWeight: "500",
  },
  termsText: {
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 16,
    paddingHorizontal: 20,
  },
  linkText: {
    color: "#ee2a7b",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  footerText: {
    fontSize: 12,
    color: "#999999",
    marginLeft: 6,
  },
});
