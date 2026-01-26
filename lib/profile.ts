import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "@/config/firebase";

export async function updateCurrentUserProfile(data: any) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Not logged in");

  const db = getFirestore();
  try {
    await updateDoc(doc(db, "users", userId), data);
    return { success: true };
  } catch (e) {
    console.error("Profile update failed:", e);
    return { success: false, error: e.message };
  }
}
