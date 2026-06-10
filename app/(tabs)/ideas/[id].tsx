import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { COLORS } from '@/constants/theme';
import { IdeaNote } from '@/types';

export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idea = useNotesStore((state) => 
    state.notes.find((n) => n.id === id)
  ) as IdeaNote | undefined;

  if (!idea) return (
    <View style={styles.container}>
      <Text>Idea no encontrada</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{idea.title}</Text>
      <Text style={styles.tags}>Etiquetas: {idea.tags.join(', ')}</Text>
      <Text style={styles.date}>Creada: {new Date(idea.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 16, backgroundColor: COLORS.light.surface },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  tags: { fontSize: 16, color: COLORS.light.primary, marginBottom: 8 },
  date: { fontSize: 12, color: '#888' }
});