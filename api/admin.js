import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env);

// Firebase Admin initialization (see previous instructions)
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

export default async function handler(req, res) {
  // Use admin SDK here
  const db = admin.default.firestore();
  // Example: retrieve docs
  const snapshot = await db.collection("test").get();
  res.status(200).json({ docs: snapshot.docs.map((doc) => doc.data()) });
}
