import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBx9JPF-KuHnadpvjjaPHDubX59vs-W5Iw",
  authDomain: "noteflow-jht.firebaseapp.com",
  projectId: "noteflow-jht",
  storageBucket: "noteflow-jht.firebasestorage.app",
  appId: "1:643323256725:android:ba9bb4d3cdb355a280209c"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };