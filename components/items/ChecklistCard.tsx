import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

  const handleDelete = () => {
    Alert.alert(
      "Eliminar lista",
      "¿Estás segura de que quieres eliminar esta lista?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => deleteNote(checklist.id), 
          style: "destructive" 
        }
      ]
    );
  };

  const formatDate = (date: any) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>{checklist.title || 'Lista'}</Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={handleDelete} 
            iconColor={Colors.error} 
          />
        </View>

        <View style={styles.itemsPreview}>
          {items.slice(0, 3).map((item) => (
            <Text key={item.id} numberOfLines={1} style={styles.itemText}>
              {item.isCompleted ? '✓ ' : '○ '} {item.text}
            </Text>
          ))}
          {items.length > 3 && <Text style={styles.moreText}>... y {items.length - 3} más</Text>}
          {items.length === 0 && <Text style={styles.emptyPreview}>Lista vacía</Text>}
        </View>

        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={Colors.primary} style={styles.bar} />
          <Text variant="labelSmall" style={styles.progressText}>{completed}/{items.length}</Text>
        </View>

        <Text variant="labelSmall" style={styles.date}>{formatDate(checklist.updatedAt)}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 16, backgroundColor: Colors.surface, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '700', flex: 1, color: Colors.text },
  itemsPreview: { marginVertical: 4 },
  itemText: { fontSize: 13, color: Colors.textSecondary, marginBottom: 2 },
  moreText: { fontSize: 11, color: Colors.textSecondary, opacity: 0.6 },
  emptyPreview: { fontSize: 13, color: Colors.textSecondary, fontStyle: 'italic' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  bar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#f0f0f0' },
  progressText: { minWidth: 30, textAlign: 'right' },
  date: { color: Colors.textSecondary, textAlign: 'right', fontSize: 10, marginTop: 12 }
});