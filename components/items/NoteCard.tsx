import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Note } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onPress, onDelete }: NoteCardProps) {
  
  // Función para formatear la fecha que soporta tanto Date como string ISO
  const formatDate = (dateValue: any) => {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return 'Reciente';
    
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
            {note.title}
          </Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={onDelete} 
            iconColor={Colors.error}
            style={styles.deleteBtn}
          />
        </View>
        
        <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
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
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 4
  },
  title: { 
    fontWeight: '700', 
    color: Colors.text, 
    flex: 1 
  },
  deleteBtn: { 
    margin: -8 
  },
  preview: { 
    color: Colors.textSecondary, 
    marginTop: 4,
    lineHeight: 18 
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    paddingTop: 8
  },
  date: { 
    color: Colors.textSecondary, 
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '500'
  },
});