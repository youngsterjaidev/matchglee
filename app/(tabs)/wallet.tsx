import ComingSoon from "@/components/soon";
import { ThemedText } from "@/components/ThemedText";
import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Mock data for earn more points
const earnPointsData = [
  {
    id: "1",
    title: "Complete your profile",
    subtitle: "Earn 500 points",
    icon: "🎁",
    backgroundColor: "#f5deb3",
    points: 500,
  },
  {
    id: "2",
    title: "Refer a friend",
    subtitle: "Earn 1000 points",
    icon: "💬",
    backgroundColor: "#f5deb3",
    points: 1000,
  },
  {
    id: "3",
    title: "Daily check-in",
    subtitle: "Earn 100 points",
    icon: "👤",
    backgroundColor: "#d4c5a9",
    points: 100,
  },
];

// Mock data for spend points
const spendPointsData = [
  {
    id: "1",
    title: "Boost",
    subtitle: "Boost your profile visibility",
    icon: "rocket",
    points: 100,
  },
  {
    id: "2",
    title: "Super Like",
    subtitle: "Show your profile to more people",
    icon: "heart",
    points: 50,
  },
  {
    id: "3",
    title: "Rewind",
    subtitle: "Rewind your last swipe",
    icon: "arrow-undo",
    points: 20,
  },
];

// Mock data for recent activity
const recentActivity = [
  {
    id: "1",
    title: "Profile Boost",
    date: "2024-03-15",
    points: -100,
    icon: "rocket",
  },
  {
    id: "2",
    title: "Daily Check-in",
    date: "2024-03-14",
    points: +100,
    icon: "calendar",
  },
  {
    id: "3",
    title: "Super Like",
    date: "2024-03-12",
    points: -50,
    icon: "heart",
  },
];

function WalletScreen() {
  const router = useRouter();

  const handleBuyPoints = () => {
    router.push("/BuyPoints");
  };

  const handleHowItWorks = () => {
    console.log("How it works pressed");
  };

  const handleEarnPoints = (item) => {
    console.log(`Earn points: ${item.title}`);
  };

  const handleSpendPoints = (item) => {
    console.log(`Spend points: ${item.title}`);
  };

  const renderEarnPointCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.earnCard, { backgroundColor: item.backgroundColor }]}
      onPress={() => handleEarnPoints(item)}
    >
      <View style={styles.earnCardContent}>
        <ThemedText style={styles.earnCardIcon}>{item.icon}</ThemedText>
      </View>
      <ThemedText style={styles.earnCardTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.earnCardSubtitle}>{item.subtitle}</ThemedText>
    </TouchableOpacity>
  );

  const renderSpendPointItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.spendItem}
      onPress={() => handleSpendPoints(item)}
    >
      <View style={styles.spendItemLeft}>
        <Ionicons
          name={item.icon}
          size={24}
          color="#333"
          style={styles.spendItemIcon}
        />
        <View style={styles.spendItemThemedText}>
          <ThemedText style={styles.spendItemTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.spendItemSubtitle}>
            {item.subtitle}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={styles.spendItemPoints}>
        {item.points} points
      </ThemedText>
    </TouchableOpacity>
  );

  const renderActivityItem = (item) => (
    <View key={item.id} style={styles.activityItem}>
      <View style={styles.activityItemLeft}>
        <Ionicons
          name={item.icon}
          size={20}
          color="#666"
          style={styles.activityItemIcon}
        />
        <View style={styles.activityItemThemedText}>
          <ThemedText style={styles.activityItemTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.activityItemDate}>{item.date}</ThemedText>
        </View>
      </View>
      <ThemedText
        style={[
          styles.activityItemPoints,
          { color: item.points > 0 ? "#4caf50" : "#333" },
        ]}
      >
        {item.points > 0 ? "+" : ""}
        {item.points} points
      </ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>My Wallet</ThemedText>
        </View>

        {/* Wallet Card */}
        <View style={styles.walletCardContainer}>
          <LinearGradient
            colors={["#ffd700", "#ffb347", "#8b7355"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.walletCard}
          >
            {/* Gradient overlay content */}
          </LinearGradient>
        </View>

        {/* Balance Info */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceLeft}>
            <ThemedText style={styles.balanceAmount}>1,250 Points</ThemedText>
            <ThemedText style={styles.balanceSubThemedText}>
              Your current balance
            </ThemedText>
          </View>
          <TouchableOpacity
            style={styles.buyPointsButton}
            onPress={handleBuyPoints}
          >
            <ThemedText style={styles.buyPointsButtonThemedText}>
              Buy More Points
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        {/* <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.buyMoreButton}
            onPress={handleBuyPoints}
          >
            <ThemedText style={styles.buyMoreButtonThemedText}>
              Buy More Points
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.howItWorksButton}
            onPress={handleHowItWorks}
          >
            <ThemedText style={styles.howItWorksButtonThemedText}>
              How it Works
            </ThemedText>
          </TouchableOpacity>
        </View> */}

        {/* Earn More Points Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Earn More Points</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.earnPointsList}
          >
            {earnPointsData.map(renderEarnPointCard)}
          </ScrollView>
        </View>

        {/* Spend Your Points Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Spend Your Points</ThemedText>
          <View style={styles.spendPointsList}>
            {spendPointsData.map(renderSpendPointItem)}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
          <View style={styles.activityList}>
            {recentActivity.map(renderActivityItem)}
          </View>
        </View>
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
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    display: "none",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: "#e91e63",
  },
  walletCardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  walletCard: {
    height: 120,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  balanceLeft: {
    flex: 1,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: "#333",
    marginBottom: 4,
  },
  balanceSubThemedText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: "#666",
  },
  buyPointsButton: {
    backgroundColor: "#e91e63",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buyPointsButtonThemedText: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: "#ffffff",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  buyMoreButton: {
    flex: 1,
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buyMoreButtonThemedText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#ffffff",
  },
  howItWorksButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  howItWorksButtonThemedText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#333",
  },
  section: {
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  earnPointsList: {
    paddingHorizontal: 20,
  },
  earnCard: {
    width: 140,
    height: 160,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  earnCardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  earnCardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  earnCardTitle: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  earnCardSubtitle: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#666",
    textAlign: "center",
  },
  spendPointsList: {
    paddingHorizontal: 20,
  },
  spendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  spendItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  spendItemIcon: {
    marginRight: 16,
  },
  spendItemThemedText: {
    flex: 1,
  },
  spendItemTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: "#333",
    marginBottom: 2,
  },
  spendItemSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: "#666",
  },
  spendItemPoints: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: "#333",
  },
  activityList: {
    paddingHorizontal: 20,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  activityItemIcon: {
    marginRight: 12,
  },
  activityItemThemedText: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: "#333",
    marginBottom: 2,
  },
  activityItemDate: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: "#666",
  },
  activityItemPoints: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
});

export default ComingSoon;
