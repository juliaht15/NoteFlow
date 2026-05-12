import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

  const handleDelete = () => {
    Alert.alert("Eliminar idea", "¿Borrar esta idea para siempre?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: () => deleteNote(idea.id), style: "destructive" }
    ]);
  };

  const formatDate = (date: any) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>{idea.title || 'Idea'}</Text>
          <IconButton icon="delete-outline" size={20} onPress={handleDelete} iconColor={Colors.error} />
        </View>

        {idea.content && <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>{idea.content}</Text>}
        
        {idea.tags && idea.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {idea.tags.map((tag, index) => (
              <View key={index} style={styles.customTag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.ideaBadge}><Text style={styles.badgeText}>Idea</Text></View>
          <Text variant="labelSmall" style={styles.date}>{formatDate(idea.updatedAt)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 16, backgroundColor: Colors.surface, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '700', color: Colors.text, flex: 1 },
  preview: { color: Colors.textSecondary, marginVertical: 4, fontSize: 13 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  customTag: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  tagText: { color: Colors.primary, fontSize: 11, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  ideaBadge: { backgroundColor: '#fef9c3', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, color: '#854d0e', fontWeight: 'bold' },
  date: { color: Colors.textSecondary, fontSize: 10 }
});