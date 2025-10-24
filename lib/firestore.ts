// lib/firestore.ts
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
export async function fetchProfiles(currentUserId: string) {
  const db = getFirestore();
  const q = query(
    collection(db, "users"),
    where("__name__", "!=", currentUserId), // exclude current user by doc ID
    // orderBy("updatedAt", "desc"), // optional
    // limit(50), // optional
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
}
