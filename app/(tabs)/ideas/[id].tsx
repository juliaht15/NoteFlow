import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { IdeaNote } from '@/types';

export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme(); // Acceso al tema actual
  
  const rawNote = useNotesStore((state) => state.notes.find((n) => n.id === id));

  if (!rawNote || rawNote.type !== 'idea') {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Idea no encontrada o formato incorrecto.</Text>
      </View>
    );
  }

  const note = rawNote as IdeaNote;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, fontWeight: 'bold' }}>
        {note.title}
      </Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.primary, marginVertical: 8 }}>
        Etiquetas: {note.tags.join(', ')}
      </Text>
      <Text style={{ color: theme.colors.outline, fontSize: 12 }}>
        Creada: {new Date(note.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 16 } 
});