// components/ThemedTextInput.tsx
import React from "react";
import {
  TextInput,
  Platform,
  StyleSheet,
  View,
  TextInputProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";

type Props = TextInputProps & {
  variant?: "default" | "outline";
};

export default function ThemedTextInput({
  variant = "default",
  style,
  ...props
}: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={isDark ? "#a7a9a9" : "#62646d"}
        style={[
          styles.base,
          variant === "outline" ? styles.outline : styles.filled,
          isDark ? styles.dark : styles.light,
          style,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 56,
    backgroundColor: "#F5F0F2",
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  base: {
    fontSize: 16,
    height: 56,
    color: "#171214",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    lineHeight: 24,
    padding: 0,
    backgroundColor: "#F5F0F2",
  },
  filled: {
    backgroundColor: "#F5F0F2",
    borderWidth: 0,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  light: {
    color: "#13343b",
    borderColor: "rgba(94, 82, 64, 0.2)",
  },
  dark: {
    color: "#f5f5f5",
    backgroundColor: "#262828",
    borderColor: "rgba(119, 124, 124, 0.3)",
  },
});
