import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBbjFlW-R5SWPO0VU51OoYAmATAy0RDH0",
  authDomain: "criciai.firebaseapp.com",
  projectId: "criciai",
  storageBucket: "criciai.firebasestorage.app",
  messagingSenderId: "544276801429",
  appId: "1:544276801429:web:1fa7bedab5954e1cbdf89c",
  measurementId: "G-54F6NYGKZ6"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);