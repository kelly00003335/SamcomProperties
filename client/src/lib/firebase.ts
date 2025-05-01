import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7bAJSEcskwqRFQu5FXDbVeA7RDYikA4w",
  authDomain: "samcom-properties.firebaseapp.com",
  projectId: "samcom-properties",
  storageBucket: "samcom-properties.appspot.com",
  messagingSenderId: "715886325931",
  appId: "1:715886325931:web:e2bb26d00a32287ba4c7ee",
  measurementId: "G-BS5887DT13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics if supported
export let analytics: Analytics | null = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

// Export types for Firebase services
export type Auth = typeof auth;
export type Firestore = typeof db;
export type Storage = typeof storage;
