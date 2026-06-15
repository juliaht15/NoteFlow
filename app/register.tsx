import { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native'; // Añadido Image
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { createUserProfile } from '../lib/userService';
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
      
      // Aquí más adelante pasaremos la imageUri para subirla a S3
      await createUserProfile(uid, email);
      
      Alert.alert('¡Éxito!', 'Cuenta creada y perfil guardado');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      {/* Mover la lógica visual aquí dentro */}
      <ProfileImagePicker onImageSelected={(uri) => setImageUri(uri)} />
      {imageUri && (
        <Image 
          source={{ uri: imageUri }} 
          style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }} 
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