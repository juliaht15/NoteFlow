import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const createUserProfile = async (uid: string, email: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      createdAt: new Date().toISOString(),
      avatarUrl: null, // Reservado para cuando integremos S3
      bio: ""
    });
  } catch (error) {
    console.error("Error al crear perfil:", error);
  }
};