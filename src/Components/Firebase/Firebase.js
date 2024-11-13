// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn6UmkLuWgiTu27dkBPgl_iB9NUnU9VOc",
  authDomain: "bundldesigns.firebaseapp.com",
  projectId: "bundldesigns",
  storageBucket: "bundldesigns.appspot.com",
  messagingSenderId: "1092580957784",
  appId: "1:1092580957784:web:ccad292c5ecec4b09ab42d",
  measurementId: "G-6HWFHQZD1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);