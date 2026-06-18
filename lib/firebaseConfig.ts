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

// Evita duplicar la inicialización de la App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializar Auth de manera correcta con persistencia nativa si no se ha hecho ya
const auth = (() => {
  const currentApps = getApps();
  if (currentApps.length > 0) {
    // Si la app ya estaba inicializada, intentamos recuperar la instancia de auth vinculada
    const { getAuth } = require('firebase/auth');
    try {
      return getAuth(app);
    } catch {
      // Si falla, procedemos a inicializarla abajo
    }
  }
  
  return initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
})();

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };