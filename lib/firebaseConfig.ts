import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBx9JPF-KuHnadpvjjaPHDubX59vs-W5Iw",
  authDomain: "noteflow-jht.firebaseapp.com",
  projectId: "noteflow-jht",
  storageBucket: "noteflow-jht.firebasestorage.app",
  appId: "1:643323256725:android:ba9bb4d3cdb355a280209c"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: undefined
});

const db = getFirestore(app);

export { auth, db };