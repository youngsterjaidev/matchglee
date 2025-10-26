// pages/api/signup.ts (or app/api/signup/route.ts)
import { put } from "@vercel/blob";
import * as admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

if (!admin.apps || !admin.apps.length) {
  admin.default.initializeApp({
    credential: admin.default.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: (process.env.FIREBASE_PRIVATE_KEY || "").replace(
        /\\n/g,
        "\n",
      ),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    }),
  });
}
const Auth = admin.default.auth();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });
  try {
    const { email, password, displayName, bio, age, photoBase64 } = req.body || {};
    if (!email || !password || !bio || !displayName || typeof age !== "number")
      return res.status(400).json({ error: "Missing fields" });
    if (age < 18) return res.status(400).json({ error: "Age must be 18+" });

    const user = await Auth.createUser({ email, password, displayName });

    let photoURL = "";
    if (photoBase64) {
      const buffer = Buffer.from(photoBase64, "base64");
      const blob = await put(`avatars/${user.uid}-${Date.now()}.jpg`, buffer, {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: true,
      });
      photoURL = blob.url;
      await Auth.updateUser(user.uid, { photoURL });
    }

    const db = getFirestore();
    await db.collection("users").doc(user.uid).set({
      displayName,
      age,
      bio: bio || "",
      photoURL,
      interests: [],
      verified: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return res.status(201).json({ uid: user.uid, email: user.email, photoURL });
  } catch (err) {
    console.log("Error from server: ", err);
    // return res.status(400).json({ error: err.message || "Signup failed" });
  }
}
