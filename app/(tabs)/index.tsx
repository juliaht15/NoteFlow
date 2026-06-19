import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Avatar, ActivityIndicator, Button, List, Switch, Divider, Portal, Dialog, TextInput } from 'react-native-paper';
import { signOut, User, updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { useTheme } from '../../constants/theme';
import { useRouter } from 'expo-router';
import ProfileImagePicker from '../../components/ProfileImagePicker';

export default function HomeScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const [visibleName, setVisibleName] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePhoto, setVisiblePhoto] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: User | null) => {
      setUser(currentUser);
      if (!currentUser) {
        router.replace('/'); 
      }
    });
    return unsubscribe;
  }, [router]); // Corrección ESLint: Añadido 'router' como dependencia

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  const handleUpdateName = async () => {
    if (!auth.currentUser || !newName.trim()) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      setUser({ ...auth.currentUser });
      Alert.alert('Éxito', 'Nombre de usuario actualizado.');
      setVisibleName(false);
      setNewName('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!auth.currentUser || !newPassword.trim()) return;
    if (newPassword.length < 6) {
      Alert.alert('Seguridad', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword.trim());
      Alert.alert('Éxito', 'Contraseña actualizada de forma segura.');
      setVisiblePassword(false);
      setNewPassword('');
    } catch {
      // Corrección ESLint: Eliminado 'error' no utilizado
      Alert.alert('Error', 'Para cambiar la contraseña debes haber iniciado sesión recientemente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhotoFromGallery = async (localUri: string) => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { photoURL: localUri });
      setUser({ ...auth.currentUser });
      Alert.alert('Éxito', 'Foto de perfil actualizada desde la galería.');
      setVisiblePhoto(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
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
    <>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.profileSection}>
            {user.photoURL ? (
              <Avatar.Image size={55} source={{ uri: user.photoURL }} />
            ) : (
              <Avatar.Icon size={55} icon="account" style={{ backgroundColor: colors.primary }} color="#fff" />
            )}
            <View style={styles.headerText}>
              <Text variant="labelLarge" style={{ color: colors.secondaryText }}>Bienvenido de nuevo 👋</Text>
              <Text variant="titleLarge" style={[styles.bold, { color: colors.text }]}>
                {user.displayName || user.email?.split('@')[0]}
              </Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <Button mode="text" onPress={handleSignOut} textColor={colors.error} labelStyle={styles.logoutLabel}>
              Salir
            </Button>
          </View>
        </View>

        <View style={styles.grid}>
          <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/(tabs)/notas')}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={[styles.bold, { color: colors.primary }]}>📝 Notas</Text>
              <Text variant="bodyMedium" style={{ color: colors.secondaryText, marginTop: 4 }}>
                Revisa tus apuntes y pendientes diarios.
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/(tabs)/checklists')}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={[styles.bold, { color: colors.primary }]}>✅ Checklist</Text>
              <Text variant="bodyMedium" style={{ color: colors.secondaryText, marginTop: 4 }}>
                Organiza tus tareas y listas de compras.
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => router.push('/(tabs)/ideas')}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={[styles.bold, { color: colors.primary }]}>💡 Ideas</Text>
              <Text variant="bodyMedium" style={{ color: colors.secondaryText, marginTop: 4 }}>
                Guarda ráfagas de inspiración rápidas.
              </Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.settingsSection}>
          <Text variant="titleMedium" style={[styles.bold, styles.settingsTitle, { color: colors.text }]}>
            ⚙️ Ajustes de la cuenta
          </Text>
          
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <List.Section style={styles.listSection}>
              <List.Item
                title="Modo Oscuro"
                titleStyle={{ color: colors.text }}
                left={(props) => <List.Icon {...props} icon="theme-light-dark" color={colors.primary} />}
                right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} color={colors.primary} />}
              />
              <Divider style={styles.divider} />

              <List.Item
                title="Cambiar foto de perfil"
                titleStyle={{ color: colors.text }}
                description="Selecciona una imagen de tu carrete"
                descriptionStyle={{ color: colors.secondaryText }}
                left={(props) => <List.Icon {...props} icon="camera-outline" color={colors.primary} />}
                right={(props) => <List.Icon {...props} icon="chevron-right" color={colors.secondaryText} />}
                onPress={() => setVisiblePhoto(true)}
              />
              <Divider style={styles.divider} />

              <List.Item
                title="Modificar nombre"
                titleStyle={{ color: colors.text }}
                description={user.displayName || "No configurado"}
                descriptionStyle={{ color: colors.secondaryText }}
                left={(props) => <List.Icon {...props} icon="account-edit-outline" color={colors.primary} />}
                right={(props) => <List.Icon {...props} icon="chevron-right" color={colors.secondaryText} />}
                onPress={() => {
                  setNewName(user.displayName || '');
                  setVisibleName(true);
                }}
              />
              <Divider style={styles.divider} />

              <List.Item
                title="Actualizar contraseña"
                titleStyle={{ color: colors.text }}
                description="Mantén tu cuenta segura"
                descriptionStyle={{ color: colors.secondaryText }}
                left={(props) => <List.Icon {...props} icon="lock-reset" color={colors.primary} />}
                right={(props) => <List.Icon {...props} icon="chevron-right" color={colors.secondaryText} />}
                onPress={() => setVisiblePassword(true)}
              />
            </List.Section>
          </Card>
        </View>
      </ScrollView>

      <Portal>
        <Dialog visible={visibleName} onDismiss={() => setVisibleName(false)} style={{ backgroundColor: colors.surface }}>
          <Dialog.Title style={{ color: colors.text }}>Modificar Nombre</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nuevo Nombre de Usuario"
              value={newName}
              onChangeText={setNewName}
              mode="outlined"
              activeOutlineColor={colors.primary}
              textColor={colors.text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisibleName(false)} textColor={colors.secondaryText}>Cancelar</Button>
            <Button onPress={handleUpdateName} loading={loading} disabled={loading} textColor={colors.primary}>Guardar</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={visiblePassword} onDismiss={() => setVisiblePassword(false)} style={{ backgroundColor: colors.surface }}>
          <Dialog.Title style={{ color: colors.text }}>Actualizar Contraseña</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nueva Contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry
              activeOutlineColor={colors.primary}
              textColor={colors.text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisiblePassword(false)} textColor={colors.secondaryText}>Cancelar</Button>
            <Button onPress={handleUpdatePassword} loading={loading} disabled={loading} textColor={colors.primary}>Guardar</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={visiblePhoto} onDismiss={() => setVisiblePhoto(false)} style={{ backgroundColor: colors.surface }}>
          <Dialog.Title style={{ color: colors.text }}>Foto de Perfil</Dialog.Title>
          <Dialog.Content style={styles.pickerContainer}>
            {loading ? (
              <ActivityIndicator animating={true} color={colors.primary} />
            ) : (
              <ProfileImagePicker onImageSelected={handleUpdatePhotoFromGallery} />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisiblePhoto(false)} textColor={colors.secondaryText} disabled={loading}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 140 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, marginTop: 10 },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  headerText: { marginLeft: 14 },
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  bold: { fontWeight: '700' },
  logoutLabel: { fontSize: 14, fontWeight: '600' },
  grid: { gap: 16, marginBottom: 28 },
  card: { borderRadius: 16, elevation: 1 },
  cardContent: { paddingVertical: 14 },
  settingsSection: { marginTop: 8 },
  settingsTitle: { marginBottom: 12, paddingLeft: 4 },
  listSection: { marginVertical: 0, paddingVertical: 4 },
  divider: { opacity: 0.5 },
  pickerContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }
});