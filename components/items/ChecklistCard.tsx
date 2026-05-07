import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, IconButton } from 'react-native-paper';
import { ChecklistNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const items = Array.isArray(checklist.items) ? checklist.items : [];
  const completed = items.filter(i => i.isCompleted).length;
  const progress = items.length > 0 ? completed / items.length : 0;

  const formatDate = (date: any) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>{checklist.title || 'Lista'}</Text>
          <IconButton icon="delete-outline" size={20} onPress={() => deleteNote(checklist.id)} iconColor={Colors.error} />
        </View>

        {/* Vista previa de los elementos de la lista */}
        <View style={styles.itemsPreview}>
          {items.slice(0, 3).map((item) => (
            <Text key={item.id} numberOfLines={1} style={styles.itemText}>
              {item.isCompleted ? '✓ ' : '○ '} {item.text}
            </Text>
          ))}
          {items.length > 3 && <Text style={styles.moreText}>... y {items.length - 3} más</Text>}
        </View>

        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={Colors.primary} style={styles.bar} />
          <Text variant="labelSmall">{completed}/{items.length}</Text>
        </View>

        <Text variant="labelSmall" style={styles.date}>{formatDate(checklist.updatedAt)}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 16, backgroundColor: Colors.surface, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '700', flex: 1 },
  itemsPreview: { marginVertical: 8 },
  itemText: { fontSize: 13, color: Colors.textSecondary, marginBottom: 2 },
  moreText: { fontSize: 11, color: 'lightgray' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  bar: { flex: 1, height: 6, borderRadius: 3 },
  date: { color: Colors.textSecondary, textAlign: 'right', fontSize: 10, marginTop: 12 }
});