import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper'; // 1. Importa useTheme
import { useLocalSearchParams } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme(); // 2. Obtén el tema actual
  const note = useNotesStore((state) => state.notes.find((n) => n.id === id));

  if (!note || note.type !== 'note') {
    return <View style={styles.container}><Text>Nota no encontrada</Text></View>;
  }

  return (
    // 3. Aplica el color de fondo del tema
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>{note.title}</Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>{note.content}</Text>
      <Text style={{ color: theme.colors.outline, marginTop: 16 }}>
        Creada: {new Date(note.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 16 } 
});