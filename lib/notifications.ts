// // lib/notifications.ts
// import {
//   getFirestore,
//   collection,
//   query,
//   doc,
//   updateDoc,
//   where,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";

// export function listenToNotifications(
//   userId: string,
//   callback: (notifs: any[]) => void,
// ) {
//   const db = getFirestore();
//   const q = query(
//     collection(db, `users/${userId}/notifications`),
//     where("read", "==", false),
//     orderBy("timestamp", "desc"),
//   );
//   return onSnapshot(q, (snap) => {
//     const notifs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
//     callback(notifs);
//   });
// }

// export async function saveExpoPushToken(userId: string, token: string) {
//   const db = getFirestore();
//   await updateDoc(doc(db, "users", userId), {
//     expoPushToken: token,
//   });
// }

// lib/notifications.ts
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  writeBatch,
  where,
} from "firebase/firestore";

export async function saveExpoPushToken(userId: string, token: string) {
  const db = getFirestore();
  await setDoc(
    doc(db, "users", userId),
    {
      expoPushToken: token,
    },
    { merge: true },
  ); // merge: true to not overwrite other fields
}

export function listenToNotifications(
  userId: string,
  callback: (notifs: any[]) => void,
) {
  const db = getFirestore();
  const q = query(
    collection(db, `users/${userId}/notifications`),
    orderBy("timestamp", "desc"),
  );
  return onSnapshot(q, (snap) => {
    const notifs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(notifs);
  });
}

export async function markAsRead(userId: string, notificationId: string) {
  const db = getFirestore();
  await updateDoc(doc(db, `users/${userId}/notifications/${notificationId}`), {
    read: true,
  });
}

export async function markAllAsRead(userId: string, notificationIds: string[]) {
  const db = getFirestore();
  const batch = writeBatch(db);

  notificationIds.forEach((id) => {
    const ref = doc(db, `users/${userId}/notifications/${id}`);
    batch.update(ref, { read: true });
  });

  await batch.commit();
}

// lib/notifications.ts
export function listenUnreadCount(userId: string, cb: (n: number) => void) {
  const db = getFirestore();
  const q = query(
    collection(db, `users/${userId}/notifications`),
    where("read", "==", false),
  );
  return onSnapshot(q, (snap) => cb(snap.size));
}
