import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { useTheme } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Introduce tus credenciales.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error de acceso', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
        NoteFlow
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
        Iniciar Sesión
      </Button>
      <Button mode="text" onPress={() => router.push('/register')} style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { textAlign: 'center', marginBottom: 32, fontWeight: '700' },
  input: { marginBottom: 16 },
  button: { marginTop: 8, paddingVertical: 4 },
  link: { marginTop: 16 }
});