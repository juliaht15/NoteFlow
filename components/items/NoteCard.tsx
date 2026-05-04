import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Note } from '../../types';
// Usamos accesos seguros (?.) por si el tema no carga correctamente
import { Colors, Spacing } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onPress, onDelete }: NoteCardProps) {
  
  // CORRECCIÓN: Formateo seguro de la fecha. 
  // Si updatedAt es un string (común al cargar de storage), lo convertimos a Date.
  const formatDate = (date: any) => {
    try {
      const d = new Date(date);
      return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES');
    } catch {
      return 'Reciente';
    }
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
            iconColor="#d32f2f"
            style={styles.deleteBtn}
          />
        </View>
        
        <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
          {note.content || 'Sin contenido adicional'}
        </Text>
        
        <Text variant="labelSmall" style={styles.date}>
          {formatDate(note.updatedAt)}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: Spacing?.sm || 12, 
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 2
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 4
  },
  title: { fontWeight: '600', color: '#1F2937', flex: 1 },
  deleteBtn: { margin: -8 }, // Ajuste para que el icono no robe espacio al título
  preview: { 
    color: Colors?.textSecondary || '#6B7280', 
    marginTop: 4,
    lineHeight: 18 
  },
  date: { 
    color: Colors?.textSecondary || '#9CA3AF', 
    marginTop: 12, 
    textAlign: 'right',
    fontSize: 10
  },
});