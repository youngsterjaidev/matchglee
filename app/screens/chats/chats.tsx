import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock message data
const initialMessages = [
  {
    id: "1",
    text: "Hey there! How's your day going?",
    sender: "other",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    senderName: "Sophia",
    senderAvatar: require("@/assets/images/users/liam.png"),
    fallbackEmoji: "👩‍🎨",
    backgroundColor: "#f4c2a1",
  },
  {
    id: "2",
    text: "It's been pretty good, thanks! Just finished a workout. How about yours?",
    sender: "me",
    timestamp: new Date(Date.now() - 1500000), // 25 minutes ago
    senderName: "You",
    senderAvatar: require("@/assets/images/users/liam.png"),
    fallbackEmoji: "👨‍💻",
    backgroundColor: "#d4a574",
  },
  {
    id: "3",
    text: "That's awesome! Mine's been busy with work, but I'm looking forward to relaxing later.",
    sender: "other",
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    senderName: "Sophia",
    senderAvatar: require("@/assets/images/users/liam.png"),
    fallbackEmoji: "👩‍🎨",
    backgroundColor: "#f4c2a1",
  },
  {
    id: "4",
    text: "Sounds like a good plan. Any fun plans for relaxation?",
    sender: "me",
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    senderName: "You",
    senderAvatar: require("@/assets/images/users/liam.png"),
    fallbackEmoji: "👨‍💻",
    backgroundColor: "#d4a574",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef(null);

  const handleBackPress = () => {
    router.back();
  };

  const handleMoreOptions = () => {
    console.log("More options pressed");
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: String(Date.now()),
        text: inputText.trim(),
        sender: "me",
        timestamp: new Date(),
        senderName: "You",
        senderAvatar: require("@/assets/images/users/liam.png"),
        fallbackEmoji: "👨‍💻",
        backgroundColor: "#d4a574",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");

      // Scroll to bottom after sending
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleAttachment = () => {
    console.log("Attachment pressed");
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = (message) => {
    const isMe = message.sender === "me";

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {/* Sender name - only for other messages */}
        {!isMe && <Text style={styles.senderName}>{message.senderName}</Text>}

        <View
          style={[
            styles.messageRow,
            isMe ? styles.myMessageRow : styles.otherMessageRow,
          ]}
        >
          {/* Avatar for other messages */}
          {!isMe && (
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: message.backgroundColor },
                ]}
              >
                {message.senderAvatar ? (
                  <Image
                    source={message.senderAvatar}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarEmoji}>
                    {message.fallbackEmoji}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Message bubble */}
          <View
            style={[
              styles.messageBubble,
              isMe ? styles.myMessageBubble : styles.otherMessageBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isMe ? styles.myMessageText : styles.otherMessageText,
              ]}
            >
              {message.text}
            </Text>
          </View>

          {/* Avatar for my messages */}
          {isMe && (
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: message.backgroundColor },
                ]}
              >
                {message.senderAvatar ? (
                  <Image
                    source={message.senderAvatar}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarEmoji}>
                    {message.fallbackEmoji}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Sender name for my messages */}
        {isMe && (
          <Text style={[styles.senderName, styles.mySenderName]}>You</Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    // Auto scroll to bottom when component mounts
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sophia</Text>
        <TouchableOpacity onPress={handleMoreOptions}>
          <Ionicons name="ellipsis-vertical" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={styles.attachButton}
              onPress={handleAttachment}
            >
              <Ionicons name="attach" size={20} color="#999" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && styles.sendButtonActive,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? "#ffffff" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#ffffff",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    color: "#e91e63",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  messagesContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginBottom: 20,
  },
  myMessageContainer: {
    alignItems: "flex-end",
  },
  otherMessageContainer: {
    alignItems: "flex-start",
  },
  senderName: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: "#999",
    marginBottom: 6,
    marginLeft: 60,
  },
  mySenderName: {
    marginLeft: 0,
    marginRight: 60,
    textAlign: "right",
    marginTop: 6,
    marginBottom: 0,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "85%",
  },
  myMessageRow: {
    justifyContent: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: "cover",
  },
  avatarEmoji: {
    fontSize: 18,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: "100%",
  },
  myMessageBubble: {
    backgroundColor: "#e91e63",
    borderBottomRightRadius: 6,
  },
  otherMessageBubble: {
    backgroundColor: "#e5e7eb",
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    lineHeight: 22,
  },
  myMessageText: {
    color: "#ffffff",
  },
  otherMessageText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#333",
    maxHeight: 100,
    textAlignVertical: "center",
  },
  attachButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: "#e91e63",
  },
});
