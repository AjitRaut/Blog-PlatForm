// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj05RaPor0o9JAlXrvLpNqyUNTkHTvbfw",
    authDomain: "blog-platform-c7361.firebaseapp.com",
    projectId: "blog-platform-c7361",
    storageBucket: "blog-platform-c7361.appspot.com",
    messagingSenderId: "852054414945",
    appId: "1:852054414945:web:6d8c42c7dbdc3aca6a7c20",
    measurementId: "G-ZR5JJJCX8H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore

export { auth, db , analytics};
