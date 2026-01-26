// components/TabBell.tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { auth } from "@/config/firebase";
import { listenUnreadCount } from "@/lib/notifications";

export function TabBell({ color }: { color: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const unsub = listenUnreadCount(uid, setCount);
    return unsub;
  }, []);
  return (
    <View>
      <IconSymbol size={28} name="bell.fill" color={color} />
      {count > 0 && (
        <View
          style={{
            position: "absolute",
            right: -2,
            top: -2,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "#e91e63",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 3,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
            {count > 99 ? "99+" : count}
          </Text>
        </View>
      )}
    </View>
  );
}
