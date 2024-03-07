import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoOeHbrHSmQDE7j5vPYGDabjGZOPo4X9k",
  authDomain: "learning-4623a.firebaseapp.com",
  projectId: "learning-4623a",
  storageBucket: "learning-4623a.appspot.com",
  messagingSenderId: "929164579253",
  appId: "1:929164579253:web:8c16e86474f3976ea709fc",
  measurementId: "G-JJV82WRF6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
