// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoOes1KN_RUK9sF2Pf2aob5BjtTs4vUfE",
  authDomain: "e-commapp-72242.firebaseapp.com",
  projectId: "e-commapp-72242",
  storageBucket: "e-commapp-72242.appspot.com",
  messagingSenderId: "725315202225",
  appId: "1:725315202225:web:8f472f8791047ced160690",
  measurementId: "G-6JX3Z41WYP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
