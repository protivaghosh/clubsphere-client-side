// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIUndguewzB20AlH-AE0Wjn_xzMe5Ka3Q",
  authDomain: "clubsphere-129f8.firebaseapp.com",
  projectId: "clubsphere-129f8",
  storageBucket: "clubsphere-129f8.firebasestorage.app",
  messagingSenderId: "1035495619762",
  appId: "1:1035495619762:web:eccb5d82fc3accb49cddab",
  measurementId: "G-87E9XR245X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);