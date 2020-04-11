import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAFmBCme3nlWeCiSfUB25Of0qRsv9Flq-g",
  authDomain: "kakeibo-66074.firebaseapp.com",
  databaseURL: "https://kakeibo-66074.firebaseio.com",
  projectId: "kakeibo-66074",
  storageBucket: "kakeibo-66074.appspot.com",
  messagingSenderId: "980188102889",
  appId: "1:980188102889:web:36b17ff4f12aa29a95f078",
  measurementId: "G-Z9X3LHC1H8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firestore
export const db = firebase.firestore();

export default firebase;
