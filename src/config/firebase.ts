import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBx9ZSJHWd84ICVVSKCqrPlRCqTwjLZYSc",
  authDomain: "unoted-749a2.firebaseapp.com",
  projectId: "unoted-749a2",
  storageBucket: "unoted-749a2.appspot.com",
  messagingSenderId: "706769647523",
  appId: "1:706769647523:web:8caf0644df8ba4709ccc16",
};

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

export default firebase;
