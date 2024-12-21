import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "learn-project-681f5.firebaseapp.com",
  databaseURL: "https://learn-project-681f5.firebaseio.com",
  projectId: "learn-project-681f5",
  storageBucket: "learn-project-681f5.firebasestorage.app",
  messagingSenderId: "1062825083414",
  appId: "1:1062825083414:web:9ffad85cdabd1a24912b37"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

