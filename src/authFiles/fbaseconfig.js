import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseLiveConfig = {
  apiKey: "AIzaSyAYxWt-eySP188-AZQGar7A4Yy29_CpVUc",
  authDomain: "cricket-pandit-ji-astro.firebaseapp.com",
  projectId: "cricket-pandit-ji-astro",
  storageBucket: "cricket-pandit-ji-astro.appspot.com",
  messagingSenderId: "331394177719",
  appId: "1:331394177719:web:46c1971a38517986a6cb32",
};

const firebaseDevConfig = {
  apiKey: "AIzaSyAYxWt-eySP188-AZQGar7A4Yy29_CpVUc",
  authDomain: "cricket-pandit-ji-astro.firebaseapp.com",
  projectId: "cricket-pandit-ji-astro",
  storageBucket: "cricket-pandit-ji-astro.appspot.com",
  messagingSenderId: "331394177719",
  appId: "1:331394177719:web:46c1971a38517986a6cb32",
};

const app = initializeApp(process.env.REACT_APP_DEV === 'true' ? firebaseLiveConfig : firebaseDevConfig);
export const db = getFirestore(app);