// firebase-config.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeBGyOB1ShZTx8Z5fvCa5FncqmDX87l5I",
  authDomain: "hackscan-fca20.firebaseapp.com",
  projectId: "hackscan-fca20",
  storageBucket: "hackscan-fca20.appspot.com",
  messagingSenderId: "740497711738",
  appId: "1:740497711738:web:03db340a356ba3a48151c3",
  measurementId: "G-H06S315EQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
