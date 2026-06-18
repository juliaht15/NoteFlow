import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { signOut, User } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { useTheme } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  // Escuchar si el estado del usuario cambia (por ejemplo, al desloguearse)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      setUser(currentUser);
      if (!currentUser) {
        router.replace('/'); // Si no hay usuario, vuelve a la pantalla de Login en la raíz
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  if (!user) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator animating={true} color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Sección de Bienvenida */}
      <View style={styles.header}>
        <Avatar.Image 
          size={60} 
          source={
            user.photoURL 
              ? { uri: user.photoURL } 
              : require('../../assets/images/react-logo.png')
          } 
        />
        <View style={styles.headerText}>
          <Text variant="titleMedium" style={{ color: colors.secondaryText }}>Bienvenido de nuevo 👋</Text>
          <Text variant="headlineSmall" style={[styles.bold, { color: colors.text }]}>
            {user.email?.split('@')[0]}
          </Text>
        </View>
      </View>

      {/* Tarjetas de Resumen / Accesos Rápidos */}
      <View style={styles.grid}>
        <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/(tabs)/notas')}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={[styles.bold, { color: colors.primary }]}>📝 Notas</Text>
            <Text variant="bodyMedium" style={{ color: colors.secondaryText, marginTop: 4 }}>
              Revisa tus apuntes y pendientes diarios.
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/(tabs)/checklists')}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={[styles.bold, { color: colors.primary }]}>✅ Checklist</Text>
            <Text variant="bodyMedium" style={{ color: colors.secondaryText, marginTop: 4 }}>
              Organiza tus tareas y listas de compras.
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/(tabs)/ideas')}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={[styles.bold, { color: colors.primary }]}>💡 Ideas</Text>
            <Text variant="bodyMedium" style={{ color: colors.secondaryText, marginTop: 4 }}>
              Guarda ráfagas de inspiración rápidas.
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Botón de Cerrar Sesión */}
      <Button 
        mode="outlined" 
        onPress={handleSignOut} 
        textColor={colors.error || '#ff3b30'} 
        style={[styles.logoutButton, { borderColor: colors.error || '#ff3b30' }]}
      >
        Cerrar Sesión
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 10 },
  headerText: { marginLeft: 16 },
  bold: { fontWeight: '700' },
  grid: { gap: 16, marginBottom: 32 },
  card: { borderRadius: 12, elevation: 2 },
  cardContent: { paddingVertical: 16 },
  logoutButton: { marginTop: 8, marginBottom: 40, borderRadius: 8, borderWidth: 1 }
});