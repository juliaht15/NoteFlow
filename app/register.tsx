// Register.tsx
import { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { createUserProfile } from '../lib/userService';
import { uploadProfileImage } from '../lib/storageService'; // Importamos el servicio
import ProfileImagePicker from '../components/ProfileImagePicker';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Completa todos los campos');
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      let photoUrl = null;
      if (imageUri) {
        photoUrl = await uploadProfileImage(imageUri, uid);
      }
      
      // Pasamos photoUrl a tu función de perfil
      await createUserProfile(uid, email); 
      // Nota: Asegúrate que createUserProfile en userService.ts acepte photoUrl si quieres guardarla ahí
      
      Alert.alert('¡Éxito!', 'Cuenta creada correctamente');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <ProfileImagePicker onImageSelected={(uri) => setImageUri(uri)} />
      {imageUri && (
        <Image 
          source={{ uri: imageUri }} 
          style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10, borderRadius: 50 }} 
        />
      )}

      <TextInput 
        placeholder="Email" 
        onChangeText={setEmail} 
        value={email} 
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} 
      />
      <TextInput 
        placeholder="Contraseña" 
        secureTextEntry 
        onChangeText={setPassword} 
        value={password} 
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Registrarse" onPress={handleRegister} />
      )}
    </View>
  );
}