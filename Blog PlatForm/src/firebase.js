// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj05RaPor0o9JAlXrvLpNqyUNTkHTvbfw",
  authDomain: "blog-platform-c7361.firebaseapp.com",
  projectId: "blog-platform-c7361",
  storageBucket: "blog-platform-c7361.appspot.com",
  messagingSenderId: "852054414945",
  appId: "1:852054414945:web:db2a0afde7089c926a7c20",
  measurementId: "G-873TXJF5V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);