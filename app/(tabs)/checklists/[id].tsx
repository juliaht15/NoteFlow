import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { COLORS } from '@/constants/theme';
import { ChecklistNote } from '@/types';

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const checklist = useNotesStore((state) => 
    state.notes.find((n) => n.id === id)
  ) as ChecklistNote | undefined;

  if (!checklist) return (
    <View style={styles.container}>
      <Text>Checklist no encontrada</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{checklist.title}</Text>
      {checklist.items.map((item) => (
        <Text key={item.id}>
          {item.isCompleted ? '☑' : '☐'} {item.text}
        </Text>
      ))}
      <Text style={styles.date}>Creada: {new Date(checklist.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, padding: 16, backgroundColor: COLORS.light.surface },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  date: { fontSize: 12, color: '#888', marginTop: 16 }
});