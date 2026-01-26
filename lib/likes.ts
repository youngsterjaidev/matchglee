// import {
//   getFirestore,
//   doc,
//   setDoc,
//   serverTimestamp,
//   addDoc,
//   where,
//   getDocs,
//   query,
//   collection,
// } from "firebase/firestore";

// export async function likeProfile(
//   currentUserId,
//   targetUserId,
//   userName,
//   userAvatar,
// ) {
//   const db = getFirestore();

//   // Save like
//   await setDoc(doc(db, `users/${currentUserId}/likes/${targetUserId}`), {
//     timestamp: serverTimestamp(),
//     liked: true,
//   });

//   // Create notification for target user
//   await addDoc(collection(db, `users/${targetUserId}/notifications`), {
//     type: "like",
//     fromUserId: currentUserId,
//     fromUserName: userName,
//     fromUserAvatar: userAvatar,
//     timestamp: serverTimestamp(),
//     read: false,
//   });

//   // Trigger backend notification
//   await fetch("http://10.16.22.119:3000/api/send-notification", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       targetUserId,
//       title: "New Like!",
//       body: `${userName} liked your profile`,
//     }),
//   });
// }

// export async function unlikeProfile(
//   currentUserId: string,
//   targetUserId: string,
// ) {
//   const db = getFirestore();
//   await setDoc(
//     doc(db, `users/${currentUserId}/likes/${targetUserId}`),
//     {
//       liked: false,
//     },
//     { merge: true },
//   );
// }

// export async function fetchLikedProfiles(userId: string): Promise<string[]> {
//   const db = getFirestore();
//   const q = query(
//     collection(db, `users/${userId}/likes`),
//     where("liked", "==", true),
//   );
//   const snap = await getDocs(q);
//   return snap.docs.map((d) => d.id);
// }

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  collection,
  getDoc,
} from "firebase/firestore";

export async function likeProfile(
  currentUserId: string,
  targetUserId: string,
  userName: string,
  userAvatar: string,
) {
  const db = getFirestore();

  // Check if already liked before
  const likeRef = doc(db, `users/${currentUserId}/likes/${targetUserId}`);
  const likeDoc = await getDoc(likeRef);
  const wasLikedBefore = likeDoc.exists() && likeDoc.data()?.liked === true;

  // Save like
  await setDoc(likeRef, {
    timestamp: serverTimestamp(),
    liked: true,
  });

  // Only create notification if this is the FIRST time liking (not re-liking)
  if (!wasLikedBefore) {
    await addDoc(collection(db, `users/${targetUserId}/notifications`), {
      type: "like",
      fromUserId: currentUserId,
      fromUserName: userName,
      fromUserAvatar: userAvatar,
      timestamp: serverTimestamp(),
      read: false,
    });
  }
}

export async function unlikeProfile(
  currentUserId: string,
  targetUserId: string,
) {
  const db = getFirestore();
  await setDoc(
    doc(db, `users/${currentUserId}/likes/${targetUserId}`),
    {
      liked: false,
      timestamp: serverTimestamp(),
    },
    { merge: true },
  );

  // Note: We don't delete the notification when unliking
  // The user already saw it, so it stays in history
}

export async function fetchLikedProfiles(userId: string): Promise<string[]> {
  const db = getFirestore();
  const { getDocs, query, where } = await import("firebase/firestore");
  const q = query(
    collection(db, `users/${userId}/likes`),
    where("liked", "==", true),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.id);
}
