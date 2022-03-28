import firebase from "firebase/app";
import '@firebase/firestore'
import "firebase/database";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// The only reason not using .env is so that the professor can run and use the application

const firebaseConfig = {
  apiKey: "AIzaSyCIQA1s07lsQ7rIjnqPrmVz-4Kyqeyn69A",
  authDomain: "simplydegree.firebaseapp.com",
  projectId: "simplydegree",
  storageBucket: "simplydegree.appspot.com",
  messagingSenderId: "1057909136469",
  appId: "1:1057909136469:web:ba30efe0bbfea55e7888dc",
  measurementId: "G-0QEK8NWKJ8",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const fireabseAnalytics = getAnalytics(firebaseApp);
// export const auth = getAuth(firebaseApp);
export const auth = getAuth();
export const db = firebaseApp.firestore();
