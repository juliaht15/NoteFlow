import React from 'react';
import { View, StyleSheet, Alert, useColorScheme } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Note } from '../../types';
import theme from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.Colors.dark : theme.Colors.light;
  
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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) 
      ? 'Reciente' 
      : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  return (
    <Card 
      mode="flat" 
      style={[
        styles.card, 
        { 
          backgroundColor: currentTheme.surface, 
          borderBottomColor: currentTheme.border 
        }
      ]} 
      onPress={onPress}
    >
      <Card.Content style={styles.contentContainer}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {note.title || 'Sin título'}
          </Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={handleDelete} 
            iconColor={currentTheme.error}
            style={styles.deleteButton}
          />
        </View>
        <Text variant="bodySmall" numberOfLines={2} style={[styles.preview, { color: currentTheme.textSecondary }]}>
          {note.content || 'Sin contenido adicional'}
        </Text>
        <Text variant="labelSmall" style={[styles.date, { color: currentTheme.textSecondary }]}>
          {formatDate(note.updatedAt)}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderRadius: theme.BorderRadius.lg, 
    marginHorizontal: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderBottomWidth: 0.5,
  },
  contentContainer: {
    paddingVertical: theme.Spacing.sm,
    paddingHorizontal: theme.Spacing.md,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  title: { 
    fontWeight: '600', 
    flex: 1, 
    letterSpacing: -0.3,
  },
  deleteButton: {
    margin: 0,
    padding: 0,
  },
  preview: { 
    marginTop: 2, 
    marginBottom: theme.Spacing.sm,
    lineHeight: 16,
    letterSpacing: -0.1,
  },
  date: { 
    fontSize: 11,
    fontWeight: '400',
  }
});