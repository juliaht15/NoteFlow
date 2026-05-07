import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Note } from '../../types';
import { Colors, Spacing } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const formatDate = (date: any) => {
    const d = new Date(date);
    return isNaN(d.getTime()) 
      ? 'Reciente' 
      : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>{note.title}</Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={() => deleteNote(note.id)} 
            iconColor={Colors.error} 
          />
        </View>
        <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>{note.content}</Text>
        <Text variant="labelSmall" style={styles.date}>{formatDate(note.updatedAt)}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 16, backgroundColor: Colors.surface, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '700', flex: 1 },
  preview: { color: Colors.textSecondary, marginVertical: 8 },
  date: { color: Colors.textSecondary, textAlign: 'right', fontSize: 10 }
});