import { View, StyleSheet, Alert, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, spacing, typography } = useTheme();
  
  const note = useNotesStore((state) => state.notes.find((n) => n.id === id));
  const removeNote = useNotesStore((state) => state.removeNote);

  if (!note || note.type !== 'note') {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Nota no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que quieres borrar esta nota definitivamente?',
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

      <Text variant="bodyLarge" style={[styles.content, { color: colors.text }]}>
        {'content' in note ? note.content : ''}
      </Text>

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
  content: {
    lineHeight: 24,
    opacity: 0.9,
  },
  date: {
    marginTop: 24,
  },
});