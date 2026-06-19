import React, { useState } from 'react';
import { 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { createUserProfile } from '../lib/userService';
import { uploadProfileImage } from '../lib/storageService';
import ProfileImagePicker from '../components/ProfileImagePicker';
import { useTheme } from '../constants/theme';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { colors } = useTheme();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, rellena todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoUrl = null;
      if (imageUri) {
        photoUrl = await uploadProfileImage(imageUri, user.uid);
      }

      await createUserProfile(user.uid, user.email!, photoUrl);

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error de registro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const backgroundColorStyle = colors.background || colors.surface || '#121212';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: backgroundColorStyle }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
            Crear Cuenta
          </Text>
          
          <ProfileImagePicker onImageSelected={setImageUri} />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            textColor={colors.text}
            theme={{ colors: { primary: colors.primary } }}
            style={styles.input}
          />
          
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            textColor={colors.text}
            theme={{ colors: { primary: colors.primary } }}
            style={styles.input}
          />
          
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            buttonColor={colors.primary}
            style={styles.button}
          >
            Registrarse
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: { 
    textAlign: 'center', 
    marginBottom: 24, 
    fontWeight: '700' 
  },
  input: { 
    marginBottom: 14, 
    height: 50 
  },
  button: { 
    marginTop: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
});