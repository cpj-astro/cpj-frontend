import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseLiveConfig = {
  apiKey: "AIzaSyBP5ilhGBqT0q0RnhE1eR6jMIjNhABQi70",
  authDomain: "cricket-punter-line-dev.firebaseapp.com",
  projectId: "cricket-punter-line-dev",
  storageBucket: "cricket-punter-line-dev.appspot.com",
  messagingSenderId: "2266165087",
  appId: "1:2266165087:web:fd6d4ac5906e62c3ed90ea",
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