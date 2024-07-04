import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHf47Dn6ASUpFNsI-nCQTRGRXM6AWiKzQ",
  authDomain: "blog-app-d22ba.firebaseapp.com",
  projectId: "blog-app-d22ba",
  storageBucket: "blog-app-d22ba.appspot.com",
  messagingSenderId: "560011528213",
  appId: "1:560011528213:web:27933b6cab36fa8d7d261c",
  measurementId: "G-YVCHHL88WM",
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
