// lib/chat.ts
import * as FS from "expo-file-system/legacy";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

export function getChatId(uid1: string, uid2: string) {
  return [uid1, uid2].sort().join("_");
}

export async function ensureChat(chatId: string, a: string, b: string) {
  const db = getFirestore();
  const ref = doc(db, "chats", chatId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        participants: [a, b],
        lastMessage: "",
        lastMessageTime: serverTimestamp(),
        unread: { [a]: 0, [b]: 0 },
      },
      { merge: true },
    );
  }
}

export async function sendMessage(
  chatId: string,
  senderId: string,
  text: string,
) {
  const db = getFirestore();
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    text,
    senderId,
    timestamp: serverTimestamp(),
    read: false,
  });
  // Update last + increment receiver's unread
  const ref = doc(db, "chats", chatId);
  await updateDoc(ref, {
    lastMessage: text,
    lastMessageTime: serverTimestamp(),
    [`unread.${senderId}`]: 0, // ensure sender's own count stays 0
  });
}

export async function bumpUnreadFor(chatId: string, receiverId: string) {
  const db = getFirestore();
  await updateDoc(doc(db, "chats", chatId), {
    [`unread.${receiverId}`]: increment(1),
  });
}

export async function sendTextWithUnread(
  chatId: string,
  senderId: string,
  receiverId: string,
  text: string,
) {
  await sendMessage(chatId, senderId, text);
  await bumpUnreadFor(chatId, receiverId);
}

export async function sendImageMessage(
  chatId: string,
  senderId: string,
  imageUri: string,
  receiverId?: string,
) {
  const imageBase64 = await FS.readAsStringAsync(imageUri, {
    encoding: "base64",
  });
  const res = await fetch(
    "https://matchglee.vercel.app/api/upload-chat-image",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, chatId }),
    },
  );
  if (!res.ok) throw new Error("Image upload failed");
  const { url } = await res.json();

  const db = getFirestore();
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    imageUrl: url,
    senderId,
    timestamp: serverTimestamp(),
    read: false,
  });
  const ref = doc(db, "chats", chatId);
  await updateDoc(ref, {
    lastMessage: "📷 Photo",
    lastMessageTime: serverTimestamp(),
    [`unread.${senderId}`]: 0,
  });
  if (receiverId) await bumpUnreadFor(chatId, receiverId);
}

export function listenToMessages(
  chatId: string,
  callback: (msgs: any[]) => void,
) {
  const db = getFirestore();
  const q = query(
    collection(db, `chats/${chatId}/messages`),
    orderBy("timestamp", "asc"),
  );
  return onSnapshot(q, (snap) => {
    const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(msgs);
  });
}

// Reset unread when user opens the chat
export async function resetUnread(chatId: string, userId: string) {
  const db = getFirestore();
  await updateDoc(doc(db, "chats", chatId), { [`unread.${userId}`]: 0 });
}

// Listen total unseen across all chats for a user (for badge)
export function listenUnseenTotal(userId: string, cb: (n: number) => void) {
  const db = getFirestore();
  const q = query(collection(db, "chats")); // client-filter
  return onSnapshot(q, (snap) => {
    let total = 0;
    snap.forEach((d) => {
      const data: any = d.data();
      if (
        Array.isArray(data.participants) &&
        data.participants.includes(userId)
      ) {
        total += Number(data?.unread?.[userId] ?? 0);
      }
    });
    cb(total);
  });
}

// // lib/chat.ts
// import * as FS from "expo-file-system/legacy";
// import {
//   addDoc,
//   collection,
//   doc,
//   getFirestore,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";

// export function getChatId(uid1: string, uid2: string) {
//   return [uid1, uid2].sort().join("_");
// }

// export async function sendMessage(
//   chatId: string,
//   senderId: string,
//   text: string,
// ) {
//   const db = getFirestore();
//   await addDoc(collection(db, `chats/${chatId}/messages`), {
//     text,
//     senderId,
//     timestamp: serverTimestamp(),
//     read: false,
//   });
//   await setDoc(
//     doc(db, "chats", chatId),
//     { lastMessage: text, lastMessageTime: serverTimestamp() },
//     { merge: true },
//   );
// }

// export async function sendImageMessage(
//   chatId: string,
//   senderId: string,
//   imageUri: string,
// ) {
//   // Convert image to base64
//   const imageBase64 = await FS.readAsStringAsync(imageUri, {
//     encoding: "base64",
//   });

//   // Upload via backend
//   const res = await fetch("http://10.16.22.119:3000/api/upload-chat-image", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ imageBase64, chatId }),
//   });

//   if (!res.ok) throw new Error("Image upload failed");
//   const { url } = await res.json();

//   // Save message to Firestore
//   const db = getFirestore();
//   await addDoc(collection(db, `chats/${chatId}/messages`), {
//     imageUrl: url,
//     senderId,
//     timestamp: serverTimestamp(),
//     read: false,
//   });
//   await setDoc(
//     doc(db, "chats", chatId),
//     { lastMessage: "📷 Photo", lastMessageTime: serverTimestamp() },
//     { merge: true },
//   );
// }

// export function listenToMessages(
//   chatId: string,
//   callback: (msgs: any[]) => void,
// ) {
//   const db = getFirestore();
//   const q = query(
//     collection(db, `chats/${chatId}/messages`),
//     orderBy("timestamp", "asc"),
//   );
//   return onSnapshot(q, (snap) => {
//     const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     callback(msgs);
//   });
// }
