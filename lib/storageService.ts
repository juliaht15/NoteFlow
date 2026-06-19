import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadProfileImage = async (uri: string, uid: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Referencia en el storage: avatars/uid.jpg
    const storageRef = ref(storage, `avatars/${uid}.jpg`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef); // Retorna la URL pública
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
};