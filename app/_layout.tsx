// app/_layout.tsx
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { auth } from "@/config/firebase";
import {
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";

SplashScreen.preventAutoHideAsync();

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
    const unsub = auth.onAuthStateChanged((u) => {
      setSession(u || null);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Wait for auth too to avoid flicker
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
        </Stack.Protected>

        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
