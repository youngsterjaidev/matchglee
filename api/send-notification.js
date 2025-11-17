// api/send-notification.ts
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
const firestore = admin.default.firestore();

export default async function handler(req, res) {
  const { targetUserId, title, body } = req.body;

  // Fetch target user's push token from Firestore
  const userDoc = await firestore.collection('users').doc(targetUserId).get();
  const pushToken = userDoc.data()?.expoPushToken;

  if (!pushToken) return res.status(400).json({ error: 'No push token' });

  // Send via Expo Push API
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: pushToken,
      title,
      body,
      sound: 'default',
    }),
  });

  return res.status(200).json({ success: true });
}

