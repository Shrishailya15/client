// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
import 'firebase/auth'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq7JzMxkHjUTjvB8iGmjG_RhgDonJ1f7Q",
  authDomain: "internarea-2cdbc.firebaseapp.com",
  projectId: "internarea-2cdbc",
  storageBucket: "internarea-2cdbc.appspot.com",
  messagingSenderId: "641929883071",
  appId: "1:641929883071:web:d84ebae989a0f6aab1450a",
  measurementId: "G-WE1869BVKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export{auth , provider}