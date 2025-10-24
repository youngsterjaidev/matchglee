// hooks/useMyProfile.ts
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore();

export type MyProfile = {
  displayName?: string;
  bio?: string;
  photoURL?: string;
  interests?: string[];
  age?: number;
  location?: string;
  lookingFor?: string;
};

export function useMyProfile() {
  const [data, setData] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      const u = auth.currentUser;
      console.log("user: ", u.uid);
      if (!u) {
        setData(null);
        setLoading(false);
        return;
      }
      const snap = await getDoc(doc(db, "users", u.uid));
      const base = {
        displayName: u.displayName || "",
        photoURL: u.photoURL || "",
        email: u.email || "",
      };
      const merged = snap.exists()
        ? { ...base, ...(snap.data() as MyProfile) }
        : base;
      if (mounted) {
        setData(merged);
        setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}
