import { StatusBar } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";

export type ThemedStatusBarProps = {
  lightColor?: string;
  darkColor?: string;
  barStyle?: "default" | "light-content" | "dark-content";
};

export function ThemedStatusBar({
  lightColor,
  darkColor,
  barStyle,
}: ThemedStatusBarProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";

  // Auto-determine bar style if not provided
  const statusBarStyle =
    barStyle || (isDark ? "light-content" : "dark-content");

  return (
    <StatusBar
      barStyle={statusBarStyle}
      backgroundColor={backgroundColor}
      translucent={false}
    />
  );
}
