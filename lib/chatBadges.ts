// lib/chatBadges.ts
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export function listenUnseenTotal(userId: string, cb: (n: number) => void) {
  const db = getFirestore();
  const q = query(
    collection(db, "chats"),
    where(`participants`, "array-contains", userId),
  );
  return onSnapshot(q, (snap) => {
    let total = 0;
    snap.forEach((d) => {
      const data: any = d.data();
      total += Number(data?.unread?.[userId] ?? 0);
    });
    cb(total);
  });
}
