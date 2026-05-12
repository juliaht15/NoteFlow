import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

  const handleDelete = () => {
    Alert.alert(
      "Eliminar nota",
      "¿Estás segura de que quieres borrar esta nota?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => deleteNote(note.id), 
          style: "destructive" 
        }
      ]
    );
  };

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
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
            {note.title || 'Sin título'}
          </Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={handleDelete} 
            iconColor={Colors.error} 
          />
        </View>
        <Text variant="bodySmall" numberOfLines={3} style={styles.preview}>
          {note.content || 'Sin contenido adicional'}
        </Text>
        <View style={styles.footer}>
          <Text variant="labelSmall" style={styles.date}>
            {formatDate(note.updatedAt)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: Spacing.sm, 
    borderRadius: 16, 
    backgroundColor: Colors.surface, 
    elevation: 2 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { 
    fontWeight: '700', 
    flex: 1, 
    color: Colors.text 
  },
  preview: { 
    color: Colors.textSecondary, 
    marginTop: 4, 
    marginBottom: 12,
    lineHeight: 18
  },
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
    alignItems: 'flex-end'
  },
  date: { 
    color: Colors.textSecondary, 
    fontSize: 10 
  }
});