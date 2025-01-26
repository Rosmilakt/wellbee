// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxbdACjE7tE00WYQaKVG2ym5Bq2-GNeXs",
  authDomain: "pregnancy-tracker-25e66.firebaseapp.com",
  projectId: "pregnancy-tracker-25e66",
  storageBucket: "pregnancy-tracker-25e66.firebasestorage.app",
  messagingSenderId: "687471440447",
  appId: "1:687471440447:web:453ce38729a514bbd03e8a",
  measurementId: "G-01818FS82G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const text = document.getElementById('username').Value;
const password = document.getElementById('password').Value;
const submit = document.getElementById('submit').Value;

