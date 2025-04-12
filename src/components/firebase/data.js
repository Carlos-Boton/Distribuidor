// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk95Gkh_XClGzr2o2EAVVwLm-QdOsyskM",
  authDomain: "distribuidor-62bd6.firebaseapp.com",
  projectId: "distribuidor-62bd6",
  storageBucket: "distribuidor-62bd6.firebasestorage.app",
  messagingSenderId: "881718351382",
  appId: "1:881718351382:web:e3a7c9c46e30c273f2c737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db};