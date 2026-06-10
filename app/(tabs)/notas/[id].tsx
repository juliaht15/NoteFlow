import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { COLORS } from '@/constants/theme';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const note = useNotesStore((state) => state.notes.find((n) => n.id === id));

  if (!note) return (
    <View style={styles.container}>
      <Text>Nota no encontrada</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      {note.type === 'note' && <Text>{note.content}</Text>}
      <Text style={styles.date}>Creada: {new Date(note.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 16, backgroundColor: COLORS.light.surface },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  date: { fontSize: 12, color: '#888', marginTop: 16 }
});