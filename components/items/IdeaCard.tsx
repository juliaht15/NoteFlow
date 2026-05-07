import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { IdeaNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const formatDate = (date: any) => {
    const d = new Date(date);
    return isNaN(d.getTime()) 
      ? '7 may 2026' 
      : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
  };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>{idea.title || 'Idea sin título'}</Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={() => deleteNote(idea.id)} 
            iconColor={Colors.error} 
          />
        </View>

        {/* ESTO MUESTRA EL CONTENIDO FUERA */}
        {idea.content ? (
          <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
            {idea.content}
          </Text>
        ) : null}
        
        {idea.tags && idea.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {idea.tags.map((tag, index) => (
              <View key={index} style={styles.customTag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <Text variant="labelSmall" style={styles.date}>{formatDate(idea.updatedAt)}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 16, backgroundColor: Colors.surface, elevation: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '700', color: Colors.text, flex: 1 },
  preview: { color: Colors.textSecondary, marginVertical: 4, fontSize: 13 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  customTag: { backgroundColor: '#424242', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  tagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  date: { color: Colors.textSecondary, textAlign: 'right', fontSize: 10, marginTop: 12 }
});