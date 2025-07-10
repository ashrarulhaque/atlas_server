// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzkql-x141wPJRcIZBTYAYjtQzLUzk-B8",
  authDomain: "portfolio-s-projects.firebaseapp.com",
  projectId: "portfolio-s-projects",
  storageBucket: "portfolio-s-projects.firebasestorage.app",
  messagingSenderId: "502507164266",
  appId: "1:502507164266:web:9fa1334b4d3306e30ab013",
  measurementId: "G-N9JT7P4QEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);