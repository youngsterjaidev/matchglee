// // app/screens/chats/chats.tsx
// import { auth } from "@/config/firebase";
// import { FontFamily } from "@/constants/Fonts";
// import {
//   getChatId,
//   listenToMessages,
//   sendImageMessage,
//   sendMessage,
// } from "@/lib/chat";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ChatScreen() {
//   const params = useLocalSearchParams();
//   const { userId, userName, userAvatar, userEmoji, userBg } = params;

//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const scrollViewRef = useRef(null);

//   const currentUserId = auth.currentUser?.uid;
//   const chatId = getChatId(currentUserId, userId as string);

//   useEffect(() => {
//     const unsubscribe = listenToMessages(chatId, (msgs) => {
//       const formatted = msgs.map((m) => ({
//         ...m,
//         sender: m.senderId === currentUserId ? "me" : "other",
//         senderName: m.senderId === currentUserId ? "You" : userName,
//         timestamp: m.timestamp?.toDate?.() || new Date(),
//         fallbackEmoji: m.senderId === currentUserId ? "👨‍💻" : userEmoji,
//         backgroundColor: m.senderId === currentUserId ? "#d4a574" : userBg,
//         senderAvatar:
//           m.senderId === currentUserId
//             ? auth.currentUser?.photoURL
//               ? { uri: auth.currentUser.photoURL }
//               : null
//             : userAvatar
//               ? { uri: userAvatar }
//               : null,
//       }));
//       setMessages(formatted);
//     });
//     return unsubscribe;
//   }, [chatId, currentUserId, userName, userEmoji, userBg, userAvatar]);

//   const handleBackPress = () => {
//     router.back();
//   };

//   const handleSendMessage = async () => {
//     if (inputText.trim() && currentUserId) {
//       setInputText("");
//       await sendMessage(chatId, currentUserId, inputText.trim());
//       setTimeout(
//         () => scrollViewRef.current?.scrollToEnd({ animated: true }),
//         100,
//       );
//     }
//   };

//   const handleAttachment = async () => {
//     try {
//       const res = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 0.7,
//       });
//       if (!res.canceled && currentUserId) {
//         setUploading(true);
//         await sendImageMessage(chatId, currentUserId, res.assets[0].uri);
//         setTimeout(
//           () => scrollViewRef.current?.scrollToEnd({ animated: true }),
//           100,
//         );
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to send image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const renderMessage = (message) => {
//     const isMe = message.sender === "me";
//     return (
//       <View
//         key={message.id}
//         style={[
//           styles.messageContainer,
//           isMe ? styles.myMessageContainer : styles.otherMessageContainer,
//         ]}
//       >
//         {!isMe && <Text style={styles.senderName}>{message.senderName}</Text>}
//         <View
//           style={[
//             styles.messageRow,
//             isMe ? styles.myMessageRow : styles.otherMessageRow,
//           ]}
//         >
//           {!isMe && (
//             <View style={styles.avatarContainer}>
//               <View
//                 style={[
//                   styles.avatarCircle,
//                   { backgroundColor: message.backgroundColor },
//                 ]}
//               >
//                 {message.senderAvatar ? (
//                   <Image
//                     source={message.senderAvatar}
//                     style={styles.avatarImage}
//                   />
//                 ) : (
//                   <Text style={styles.avatarEmoji}>
//                     {message.fallbackEmoji}
//                   </Text>
//                 )}
//               </View>
//             </View>
//           )}
//           <View
//             style={[
//               styles.messageBubble,
//               isMe ? styles.myMessageBubble : styles.otherMessageBubble,
//               message.imageUrl && styles.imageBubble,
//             ]}
//           >
//             {message.imageUrl ? (
//               <Image
//                 source={{ uri: message.imageUrl }}
//                 style={styles.messageImage}
//               />
//             ) : (
//               <Text
//                 style={[
//                   styles.messageText,
//                   isMe ? styles.myMessageText : styles.otherMessageText,
//                 ]}
//               >
//                 {message.text}
//               </Text>
//             )}
//           </View>
//           {isMe && (
//             <View style={styles.avatarContainer}>
//               <View
//                 style={[
//                   styles.avatarCircle,
//                   { backgroundColor: message.backgroundColor },
//                 ]}
//               >
//                 {message.senderAvatar ? (
//                   <Image
//                     source={message.senderAvatar}
//                     style={styles.avatarImage}
//                   />
//                 ) : (
//                   <Text style={styles.avatarEmoji}>
//                     {message.fallbackEmoji}
//                   </Text>
//                 )}
//               </View>
//             </View>
//           )}
//         </View>
//         {isMe && (
//           <Text style={[styles.senderName, styles.mySenderName]}>You</Text>
//         )}
//       </View>
//     );
//   };

//   useEffect(() => {
//     setTimeout(
//       () => scrollViewRef.current?.scrollToEnd({ animated: false }),
//       100,
//     );
//   }, [messages]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{userName}</Text>
//         <TouchableOpacity>
//           <Ionicons name="ellipsis-vertical" size={24} color="#666" />
//         </TouchableOpacity>
//       </View>

//       <KeyboardAvoidingView
//         style={styles.chatContainer}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
//       >
//         <ScrollView
//           ref={scrollViewRef}
//           style={styles.messagesContainer}
//           contentContainerStyle={styles.messagesContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {messages.map(renderMessage)}
//           {uploading && (
//             <View style={styles.uploadingContainer}>
//               <ActivityIndicator size="small" color="#e91e63" />
//               <Text style={styles.uploadingText}>Sending image...</Text>
//             </View>
//           )}
//         </ScrollView>

//         <View style={styles.inputContainer}>
//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Type a message..."
//               placeholderTextColor="#999"
//               value={inputText}
//               onChangeText={setInputText}
//               multiline
//               maxLength={500}
//               editable={!uploading}
//             />
//             <TouchableOpacity
//               style={styles.attachButton}
//               onPress={handleAttachment}
//               disabled={uploading}
//             >
//               <Ionicons
//                 name="attach"
//                 size={20}
//                 color={uploading ? "#ccc" : "#999"}
//               />
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             style={[
//               styles.sendButton,
//               inputText.trim() && styles.sendButtonActive,
//             ]}
//             onPress={handleSendMessage}
//             disabled={!inputText.trim() || uploading}
//           >
//             <Ionicons
//               name="send"
//               size={20}
//               color={inputText.trim() ? "#ffffff" : "#999"}
//             />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#ffffff" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     backgroundColor: "#ffffff",
//   },
//   backButton: { padding: 4 },
//   headerTitle: {
//     fontSize: 20,
//     fontFamily: FontFamily.semiBold,
//     color: "#e91e63",
//     flex: 1,
//     textAlign: "center",
//     marginHorizontal: 16,
//   },
//   chatContainer: { flex: 1 },
//   messagesContainer: { flex: 1, backgroundColor: "#f8f9fa" },
//   messagesContent: { paddingVertical: 20, paddingHorizontal: 16 },
//   messageContainer: { marginBottom: 12 },
//   myMessageContainer: { alignItems: "flex-end" },
//   otherMessageContainer: { alignItems: "flex-start" },
//   senderName: {
//     fontSize: 12,
//     fontFamily: FontFamily.medium,
//     color: "#999",
//     marginBottom: 6,
//     marginLeft: 60,
//   },
//   mySenderName: {
//     marginLeft: 0,
//     marginRight: 60,
//     textAlign: "right",
//     marginTop: 6,
//     marginBottom: 0,
//   },
//   messageRow: { flexDirection: "row", alignItems: "flex-end", maxWidth: "85%" },
//   myMessageRow: { justifyContent: "flex-end" },
//   otherMessageRow: { justifyContent: "flex-start" },
//   avatarContainer: { marginHorizontal: 8 },
//   avatarCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatarImage: { width: 36, height: 36, borderRadius: 18, resizeMode: "cover" },
//   avatarEmoji: { fontSize: 18 },
//   messageBubble: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 20,
//     maxWidth: "100%",
//   },
//   imageBubble: {
//     padding: 0,
//     overflow: "hidden",
//   },
//   myMessageBubble: { backgroundColor: "#e91e63", borderBottomRightRadius: 6 },
//   otherMessageBubble: { backgroundColor: "#e5e7eb", borderBottomLeftRadius: 6 },
//   messageText: { fontSize: 16, fontFamily: FontFamily.regular, lineHeight: 22 },
//   myMessageText: { color: "#ffffff" },
//   otherMessageText: { color: "#333" },
//   messageImage: { width: 200, height: 200, borderRadius: 12 },
//   uploadingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-end",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#f3f4f6",
//     borderRadius: 20,
//     marginBottom: 12,
//   },
//   uploadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontFamily: FontFamily.medium,
//     color: "#666",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#ffffff",
//     borderTopWidth: 1,
//     borderTopColor: "#f0f0f0",
//     gap: 12,
//   },
//   inputWrapper: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f3f4f6",
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     minHeight: 44,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: FontFamily.regular,
//     color: "#333",
//     maxHeight: 100,
//     paddingVertical: 4,
//   },
//   attachButton: { padding: 4, marginLeft: 8 },
//   sendButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#f0f0f0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sendButtonActive: { backgroundColor: "#e91e63" },
// });

// app/screens/chats/chats.tsx
import { auth } from "@/config/firebase";
import { FontFamily } from "@/constants/Fonts";
import {
  getChatId,
  listenToMessages,
  sendImageMessage,
  sendMessage,
} from "@/lib/chat";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { userId, userName, userAvatar, userEmoji, userBg } = params;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const scrollViewRef = useRef(null);

  const currentUserId = auth.currentUser?.uid;
  const chatId = getChatId(currentUserId, userId as string);

  useEffect(() => {
    const unsubscribe = listenToMessages(chatId, (msgs) => {
      const formatted = msgs.map((m) => ({
        ...m,
        sender: m.senderId === currentUserId ? "me" : "other",
        senderName: m.senderId === currentUserId ? "You" : userName,
        timestamp: m.timestamp?.toDate?.() || new Date(),
        fallbackEmoji: m.senderId === currentUserId ? "👨‍💻" : userEmoji,
        backgroundColor: m.senderId === currentUserId ? "#d4a574" : userBg,
        senderAvatar:
          m.senderId === currentUserId
            ? auth.currentUser?.photoURL
              ? { uri: auth.currentUser.photoURL }
              : null
            : userAvatar
              ? { uri: userAvatar }
              : null,
      }));
      setMessages(formatted);
    });
    return unsubscribe;
  }, [chatId, currentUserId, userName, userEmoji, userBg, userAvatar]);

  const handleBackPress = () => {
    router.back();
  };

  const handleSendMessage = async () => {
    if (inputText.trim() && currentUserId) {
      setInputText("");
      await sendMessage(chatId, currentUserId, inputText.trim());
      setTimeout(
        () => scrollViewRef.current?.scrollToEnd({ animated: true }),
        100,
      );
    }
  };

  const handleAttachment = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!res.canceled) {
        setPreviewImage(res.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSendImage = async () => {
    if (previewImage && currentUserId) {
      try {
        setUploading(true);
        await sendImageMessage(chatId, currentUserId, previewImage);
        setPreviewImage(null);
        setTimeout(
          () => scrollViewRef.current?.scrollToEnd({ animated: true }),
          100,
        );
      } catch (error) {
        Alert.alert("Error", "Failed to send image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleCancelPreview = () => {
    setPreviewImage(null);
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
        {!isMe && <Text style={styles.senderName}>{message.senderName}</Text>}
        <View
          style={[
            styles.messageRow,
            isMe ? styles.myMessageRow : styles.otherMessageRow,
          ]}
        >
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
          <View
            style={[
              styles.messageBubble,
              isMe ? styles.myMessageBubble : styles.otherMessageBubble,
              message.imageUrl && styles.imageBubble,
            ]}
          >
            {message.imageUrl ? (
              <Image
                source={{ uri: message.imageUrl }}
                style={styles.messageImage}
              />
            ) : (
              <Text
                style={[
                  styles.messageText,
                  isMe ? styles.myMessageText : styles.otherMessageText,
                ]}
              >
                {message.text}
              </Text>
            )}
          </View>
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
        {isMe && (
          <Text style={[styles.senderName, styles.mySenderName]}>You</Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    setTimeout(
      () => scrollViewRef.current?.scrollToEnd({ animated: false }),
      100,
    );
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userName}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Image Preview */}
        {previewImage && (
          <View style={styles.previewContainer}>
            <View style={styles.previewContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCancelPreview}
              >
                <Ionicons name="close-circle" size={28} color="#fff" />
              </TouchableOpacity>
              <Image
                source={{ uri: previewImage }}
                style={styles.previewImage}
              />
              <TouchableOpacity
                style={styles.sendImageButton}
                onPress={handleSendImage}
                disabled={uploading}
              >
                {uploading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="send" size={20} color="#fff" />
                    <Text style={styles.sendImageText}>Send Image</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

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
              editable={!uploading && !previewImage}
            />
            <TouchableOpacity
              style={styles.attachButton}
              onPress={handleAttachment}
              disabled={uploading || previewImage !== null}
            >
              <Ionicons
                name="attach"
                size={20}
                color={uploading || previewImage ? "#ccc" : "#999"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && styles.sendButtonActive,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || uploading || previewImage !== null}
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
  container: { flex: 1, backgroundColor: "#ffffff" },
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
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    color: "#e91e63",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  chatContainer: { flex: 1 },
  messagesContainer: { flex: 1, backgroundColor: "#f8f9fa" },
  messagesContent: { paddingVertical: 20, paddingHorizontal: 16 },
  messageContainer: { marginBottom: 12 },
  myMessageContainer: { alignItems: "flex-end" },
  otherMessageContainer: { alignItems: "flex-start" },
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
  messageRow: { flexDirection: "row", alignItems: "flex-end", maxWidth: "85%" },
  myMessageRow: { justifyContent: "flex-end" },
  otherMessageRow: { justifyContent: "flex-start" },
  avatarContainer: { marginHorizontal: 8 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: { width: 36, height: 36, borderRadius: 18, resizeMode: "cover" },
  avatarEmoji: { fontSize: 18 },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: "100%",
  },
  imageBubble: { padding: 0, overflow: "hidden" },
  myMessageBubble: { backgroundColor: "#e91e63", borderBottomRightRadius: 6 },
  otherMessageBubble: { backgroundColor: "#e5e7eb", borderBottomLeftRadius: 6 },
  messageText: { fontSize: 16, fontFamily: FontFamily.regular, lineHeight: 22 },
  myMessageText: { color: "#ffffff" },
  otherMessageText: { color: "#333" },
  messageImage: { width: 200, height: 200, borderRadius: 12 },
  previewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  previewContent: {
    width: "90%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: 0,
    zIndex: 1001,
  },
  previewImage: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    resizeMode: "contain",
  },
  sendImageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e91e63",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 24,
    gap: 8,
  },
  sendImageText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
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
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: "#333",
    maxHeight: 100,
    paddingVertical: 4,
  },
  attachButton: { padding: 4, marginLeft: 8 },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: { backgroundColor: "#e91e63" },
});
