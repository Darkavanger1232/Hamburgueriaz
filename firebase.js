// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtNslNlc5wm5hg11bp_K4oyMCCG0-pO0w",
  authDomain: "hamburgueriaz-ede35.firebaseapp.com",
  projectId: "hamburgueriaz-ede35",
  storageBucket: "hamburgueriaz-ede35.firebasestorage.app",
  messagingSenderId: "463524468857",
  appId: "1:463524468857:web:b1df4f201c812c81cadca8",
  measurementId: "G-J97QLDK8MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
