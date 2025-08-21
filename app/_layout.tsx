import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Plus Jakarta Sans': require('../assets/fonts/SpaceMono-Regular.ttf'), // Fallback to SpaceMono
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="screens/welcome-screen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/login" options={{ headerShown: false }} />
        <Stack.Screen name="screens/onboarding/step-1" options={{ headerShown: false }} />
        <Stack.Screen name="screens/onboarding/AddPhotos" options={{ headerShown: false }} />
        <Stack.Screen name="screens/onboarding/PersonalInterest" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/Settings" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/DiscoverySettings" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/NotificationSettings" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/BlockedUsers" options={{ headerShown: false }} />
        <Stack.Screen name="screens/settings/DeleteAccount" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
