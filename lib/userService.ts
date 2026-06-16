import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const createUserProfile = async (uid: string, email: string, photoUrl: string | null = null) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      createdAt: new Date().toISOString(),
      avatarUrl: photoUrl,
      bio: ""
    });
  } catch (error) {
    console.error("Error al crear perfil:", error);
    throw error;
  }
};