// app/_layout.tsx
import { auth } from "@/config/firebase";
import { useColorScheme } from "@/hooks/useColorScheme";
import { saveExpoPushToken } from "@/lib/notifications";
import {
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<null | object>(null);
  const [authReady, setAuthReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "PJSans-ExtraLight": PlusJakartaSans_200ExtraLight,
    "PJSans-Light": PlusJakartaSans_300Light,
    "PJSans-Regular": PlusJakartaSans_400Regular,
    "PJSans-Medium": PlusJakartaSans_500Medium,
    "PJSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PJSans-Bold": PlusJakartaSans_700Bold,
    "PJSans-ExtraBold": PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setSession(u || null);
      setAuthReady(true);

      // Register push notifications when user logs in
      if (u) {
        await registerForPushNotifications(u.uid);
      }
    });
    return unsub;
  }, []);

  async function registerForPushNotifications(userId: string) {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Push notification permission denied");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await saveExpoPushToken(userId, token);
      console.log("Push token saved:", token);
    } catch (error) {
      console.error("Error registering push notifications:", error);
    }
  }

  useEffect(() => {
    if (fontsLoaded || fontError) {
      if (authReady) SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, authReady]);

  if (!fontsLoaded || !authReady) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Public routes */}
        <Stack.Protected guard={!session}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="screens/login" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/signup"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>

        {/* Authed routes */}
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(wallets)" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/explore-communities"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/community"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/chats/chats-list"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/chats/chats"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/notifications/notifications"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/profile/editProfile"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/contact"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/password"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/twoFactor"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/deactivate"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/delete"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/email"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/phone"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/username"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/verification"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/linkedAccounts"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/sessions"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityLog"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityAlerts"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityCheckup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityKeys"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityNotifications"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securitySummary"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityTips"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityTools"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/settings/account/securityWarnings"
            options={{ headerShown: false }}
          />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
