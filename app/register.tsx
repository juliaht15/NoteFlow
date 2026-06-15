import { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { createUserProfile } from '../lib/userService'; // Importa la función que creamos

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Completa todos los campos');
    
    setLoading(true);
    try {
      // 1. Crear Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // 2. Crear perfil en Firestore
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