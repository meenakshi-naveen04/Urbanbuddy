// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmMa0jnR2kz5B0efSGwSVotMtAIkQkGu0",
  authDomain: "urban-buddy-f997f.firebaseapp.com",
  projectId: "urban-buddy-f997f",
  storageBucket: "urban-buddy-f997f.firebasestorage.app",
  messagingSenderId: "1007299943642",
  appId: "1:1007299943642:web:cf945a8ff2d2efea7259e3",
  measurementId: "G-GZLTV8R6HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);