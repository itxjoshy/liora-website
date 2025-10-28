// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7_2k-co4ROJCPobVXWKotpPViJLtDhoc",
  authDomain: "liora-website.firebaseapp.com",
  projectId: "liora-website",
  storageBucket: "liora-website.firebasestorage.app",
  messagingSenderId: "584275693069",
  appId: "1:584275693069:web:3006a81e25f316d331cf44",
  measurementId: "G-4WQC3D75P3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
