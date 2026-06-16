import { View, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '@/store/useNoteStore';
import { useTheme } from '@/constants/theme';
import { ChecklistNote } from '@/types';
import { Ionicons } from '@expo/vector-icons';

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, spacing, typography } = useTheme();

  const note = useNotesStore((state) => state.notes.find((n) => n.id === id)) as ChecklistNote | undefined;
  const removeNote = useNotesStore((state) => state.removeNote);
  
  const toggleItem = (itemId: string) => {
    if (!note) return;
    const updatedItems = note.items.map((i) => 
      i.id === itemId ? { ...i, checked: !i.checked } : i
    );
    
    useNotesStore.setState((state) => ({
      notes: state.notes.map((n) => (n.id === note.id ? { ...note, items: updatedItems } : n)),
    }));
  };

  if (!note || note.type !== 'checklist') {
    return (
      <View style={[styles.container, { backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Checklist no encontrada.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Eliminar lista',
      '¿Quieres borrar esta lista de tareas?',
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

      <ScrollView style={styles.listContainer}>
        {note.items.map((item) => {
          const isDone = item.checked;
          return (
            <Pressable
              key={item.id}
              onPress={() => toggleItem(item.id)}
              style={[styles.taskItem, { borderBottomColor: colors.border }]}
            >
              <Ionicons
                name={isDone ? 'checkbox' : 'square-outline'}
                size={22}
                color={isDone ? colors.primary : colors.secondaryText}
                style={styles.checkboxIcon}
              />
              <Text
                style={[
                  styles.taskText,
                  {
                    color: isDone ? colors.secondaryText : colors.text,
                    textDecorationLine: isDone ? 'line-through' : 'none',
                  },
                ]}
              >
                {item.text}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={[styles.date, { color: colors.secondaryText, fontSize: typography.fontSize.xs }]}>
        Creada: {new Date(note.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontWeight: '700',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  checkboxIcon: {
    marginRight: 12,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  date: {
    marginTop: 16,
  },
});