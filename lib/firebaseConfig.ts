// E:\Proyectos\noteflow\lib\firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "TU_API_KEY_DE_FIREBASE_CONSOLE",
  authDomain: "noteflow-jht.firebaseapp.com",
  projectId: "noteflow-jht",
  storageBucket: "noteflow-jht.appspot.com",
  messagingSenderId: "643323256725",
  appId: "..." 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);