import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const note = useNotesStore((state) => state.notes.find((n) => n.id === id));

  if (!note || note.type !== 'checklist') {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Checklist no encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface, marginBottom: 12, fontWeight: 'bold' }}>
        {note.title}
      </Text>
      {note.items.map((item) => (
        <Text key={item.id} style={{ color: theme.colors.onSurfaceVariant, fontSize: 16, marginVertical: 4 }}>
          {item.checked ? '☑ ' : '☐ '} {item.text}
        </Text>
      ))}
      <Text style={{ color: theme.colors.outline, fontSize: 12, marginTop: 16 }}>
        Creada: {new Date(note.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 16 } 
});