import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseLiveConfig = {
  apiKey: "AIzaSyBhpyoMIUoKngSfQ6crIIK9BcyDNYhFym0",
  authDomain: "cricketfastestline-56816.firebaseapp.com",
  projectId: "cricketfastestline-56816",
  storageBucket: "cricketfastestline-56816.appspot.com",
  messagingSenderId: "526714307629",
  appId: "1:526714307629:android:158fdf7eb338d1f640a4a4"
};

const firebaseDevConfig = {
  apiKey: "AIzaSyBP5ilhGBqT0q0RnhE1eR6jMIjNhABQi70",
  authDomain: "cricket-punter-line-dev.firebaseapp.com",
  projectId: "cricket-punter-line-dev",
  storageBucket: "cricket-punter-line-dev.appspot.com",
  messagingSenderId: "2266165087",
  appId: "1:2266165087:web:fd6d4ac5906e62c3ed90ea",
};

const app = initializeApp(process.env.REACT_APP_DEV === 'true' ? firebaseLiveConfig : firebaseDevConfig);
export const db = getFirestore(app);