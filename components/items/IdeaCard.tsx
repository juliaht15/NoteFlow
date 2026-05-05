import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, IconButton } from 'react-native-paper';
import { IdeaNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function IdeaCard({ idea, onPress, onDelete }: IdeaCardProps) {
  // Priorizamos el color de la nota, luego el del tema, y finalmente un fallback
  const cardColor = idea.color || Colors.ideaColor || '#FED7AA'; 
  
  // Garantizamos que tags sea un array
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return (
    <Card 
      mode="elevated" 
      style={[styles.card, { backgroundColor: cardColor }]} 
      onPress={onPress}
    >
      <Card.Content>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
              {idea.title || 'Idea sin título'}
            </Text>
            {/* Mostramos preview si no hay tags o como descripción adicional */}
            {idea.content && (
              <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
                {idea.content}
              </Text>
            )}
          </View>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={onDelete} 
            iconColor={Colors.error}
            style={styles.deleteBtn}
          />
        </View>

        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.slice(0, 3).map((tag, i) => (
              <Chip 
                key={`${idea.id}-tag-${i}`} 
                mode="flat" 
                compact 
                style={styles.tag} 
                textStyle={styles.tagText}
              >
                {tag}
              </Chip>
            ))}
            {tags.length > 3 && (
              <Text variant="labelSmall" style={styles.moreTags}>
                +{tags.length - 3}
              </Text>
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: Spacing.sm, 
    borderRadius: 16,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  title: { 
    fontWeight: '700', 
    color: Colors.text 
  },
  preview: { 
    color: 'rgba(0,0,0,0.6)', 
    marginTop: 4,
    lineHeight: 16
  },
  deleteBtn: {
    margin: -8
  },
  tagsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6, 
    marginTop: 12,
    alignItems: 'center'
  },
  tag: { 
    backgroundColor: 'rgba(255,255,255,0.6)', 
    borderRadius: 8,
    height: 24
  },
  tagText: { 
    fontSize: 10,
    fontWeight: '600',
    color: '#424242'
  },
  moreTags: {
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
    marginLeft: 2
  }
});