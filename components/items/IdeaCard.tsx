import React from 'react';
import { View, StyleSheet, Alert, useColorScheme } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { IdeaNote } from '../../types';
import theme from '../../constants/theme';
import { useNotesStore } from '../../store/notesStore';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.Colors.dark : theme.Colors.light;
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const handleDelete = () => {
    Alert.alert("Eliminar idea", "¿Borrar esta idea para siempre?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: () => deleteNote(idea.id), style: "destructive" }
    ]);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Respetamos el color personalizado asignado a la idea o usamos el del tema por defecto
  const cardBgColor = idea.color || currentTheme.ideaColor;

  return (
    <Card 
      mode="flat" 
      style={[styles.card, { backgroundColor: cardBgColor, borderBottomColor: currentTheme.border }]} 
      onPress={onPress}
    >
      <Card.Content style={styles.contentContainer}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
            {idea.title || 'Idea'}
          </Text>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={handleDelete} 
            iconColor={currentTheme.error} 
            style={styles.deleteButton}
          />
        </View>

        {idea.content && (
          <Text variant="bodySmall" numberOfLines={2} style={[styles.preview, { color: currentTheme.text, opacity: 0.8 }]}>
            {idea.content}
          </Text>
        )}
        
        {idea.tags && idea.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {idea.tags.map((tag, index) => (
              <View 
                key={index} 
                style={[
                  styles.customTag, 
                  { 
                    backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                    borderColor: 'transparent' 
                  }
                ]}
              >
                <Text style={[styles.tagText, { color: currentTheme.text }]}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={[styles.ideaBadge, { backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)' }]}>
            <Text style={[styles.badgeText, { color: currentTheme.text }]}>Idea</Text>
          </View>
          <Text variant="labelSmall" style={[styles.date, { color: currentTheme.textSecondary }]}>
            {formatDate(idea.updatedAt)}
          </Text>
        </View>
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
    alignItems: 'center' 
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
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: -0.1,
  },
  tagsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6, 
    marginTop: theme.Spacing.sm 
  },
  customTag: { 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: theme.BorderRadius.sm, 
    borderWidth: 1 
  },
  tagText: { 
    fontSize: 11, 
    fontWeight: '500' 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: theme.Spacing.sm 
  },
  ideaBadge: { 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: theme.BorderRadius.sm 
  },
  badgeText: { 
    fontSize: 10, 
    fontWeight: '600' 
  },
  date: { 
    fontSize: 11,
    fontWeight: '400',
  }
});