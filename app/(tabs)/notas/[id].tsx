import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import * as Haptics from 'expo-haptics';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  
  const note = notes.find(n => n.id === id);

  if (!note) return <Text>Nota no encontrada</Text>;

  const confirmDelete = () => {
    Alert.alert(
      "Eliminar Nota",
      "¿Estás seguro de que quieres borrar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => {
            deleteNote(id as string);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Detalle" />
        <Appbar.Action icon="delete" onPress={confirmDelete} color="red" />
      </Appbar.Header>
      
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>{note.title}</Text>
        <Text variant="bodyLarge">{(note as any).content || "Esta nota no tiene contenido de texto."}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { marginBottom: 10, fontWeight: 'bold' }
});