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
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    // Variable font supports all weights dynamically
    "PJSans-ExtraLight": PlusJakartaSans_200ExtraLight,
    "PJSans-Light": PlusJakartaSans_300Light,
    "PJSans-Regular": PlusJakartaSans_400Regular,
    "PJSans-Medium": PlusJakartaSans_500Medium,
    "PJSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PJSans-Bold": PlusJakartaSans_700Bold,
    "PJSans-ExtraBold": PlusJakartaSans_800ExtraBold,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="step-1" />
        <Stack.Screen name="AddPhotos" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
