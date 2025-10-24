// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ8KV1dBMKLflXLpyxlXKC7P_R92tGyF8",
  authDomain: "fb-matchglee.firebaseapp.com",
  projectId: "fb-matchglee",
  storageBucket: "fb-matchglee.firebasestorage.app",
  messagingSenderId: "824198772142",
  appId: "1:824198772142:web:52fe1d2ac08d31b936843f",
  measurementId: "G-M2J2DW5BX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
