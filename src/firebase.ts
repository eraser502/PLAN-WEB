// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHZuOpnsUB1-B4cHwYkxnQ1DPgXVGsPGQ",
  authDomain: "dhxxn-site.firebaseapp.com",
  projectId: "dhxxn-site",
  storageBucket: "dhxxn-site.appspot.com",
  messagingSenderId: "313600160605",
  appId: "1:313600160605:web:3278d199f6ade0fbc5eeb4",
  measurementId: "G-C79E5KEJSZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const functions = getFunctions(app)
export const storage = getStorage(app);

export const firebaseInstance = firebase;
// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };