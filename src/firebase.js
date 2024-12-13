// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6uAPvDtdr1blOdxwjLD_sV3TFJla73Dw",
  authDomain: "moving-company-f69d8.firebaseapp.com",
  projectId: "moving-company-f69d8",
  storageBucket: "moving-company-f69d8.firebasestorage.app",
  messagingSenderId: "1037953556050",
  appId: "1:1037953556050:web:ecea2e690385c1112ac98b",
  measurementId: "G-4G7SPHFW6P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
