// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC9mPScO5mW_QVIQ-iUkeSyVcOqEdY5EKg",
    authDomain: "hr-portal-5477f.firebaseapp.com",
    projectId: "hr-portal-5477f",
    storageBucket: "hr-portal-5477f.firebaseapp.com",
    messagingSenderId: "494061753285",
    appId: "1:494061753285:web:5ed535b79b9873cb76f1ac",
    measurementId: "G-ENJPXJECCP",
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
