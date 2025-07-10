// server/config/firebase.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config(); // Load env vars from .env or Render

// Decode base64 service account key (JSON format)
const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_B64;

if (!base64Key) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_B64 environment variable');
}

const serviceAccount = JSON.parse(
  Buffer.from(base64Key, 'base64').toString('utf-8')
);

// Initialize Firebase Admin with decoded credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Example: 'your-project-id.appspot.com'
});

// Export the bucket for file upload/download usage
const bucket = admin.storage().bucket();
export default bucket;
