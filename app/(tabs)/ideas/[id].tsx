import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { useTheme } from '@/constants/theme';
import { IdeaNote } from '@/types';
import { Ionicons } from '@expo/vector-icons';

export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, spacing, typography } = useTheme();
  
  const rawNote = useNotesStore((state) => state.notes.find((n) => n.id === id));
  const removeNote = useNotesStore((state) => state.removeNote);

  if (!rawNote || rawNote.type !== 'idea') {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Idea no encontrada</Text>
      </View>
    );
  }

  const note = rawNote as IdeaNote;

  const handleDelete = () => {
    Alert.alert(
      'Eliminar idea',
      '¿Quieres eliminar esta idea de forma permanente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            removeNote(note.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing.md }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
          {note.title}
        </Text>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={22} color={colors.danger} />
        </Pressable>
      </View>

      <View style={styles.tagsContainer}>
        {note.tags.map((tag, index) => (
          <View key={index} style={[styles.chip, { backgroundColor: colors.border }]}>
            <Text style={[styles.chipText, { color: colors.primary }]}>#{tag}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.date, { color: colors.secondaryText, fontSize: typography.fontSize.xs }]}>
        Creada: {new Date(note.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontWeight: '700',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    fontWeight: '600',
    fontSize: 14,
  },
  date: {
    marginTop: 24,
  },
});