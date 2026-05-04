import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, IconButton } from 'react-native-paper';
import { IdeaNote } from '../../types';
import { Spacing } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function IdeaCard({ idea, onPress, onDelete }: IdeaCardProps) {
  // CORRECCIÓN: Si no hay color definido, usamos un amarillo suave (típico de ideas/bombillas)
  const cardColor = idea.color || '#FFF9C4'; 
  
  // CORRECCIÓN: Validamos que tags sea un array para evitar el crash
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
              {idea.title}
            </Text>
            {/* Si no hay etiquetas, mostramos un trozo del contenido para que no esté vacía */}
            {tags.length === 0 && idea.content && (
              <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>
                {idea.content}
              </Text>
            )}
          </View>
          <IconButton 
            icon="delete-outline" 
            size={20} 
            onPress={onDelete} 
            iconColor="#d32f2f"
          />
        </View>

        {tags.length > 0 && (
          <View style={styles.tags}>
            {tags.slice(0, 3).map((tag, i) => (
              <Chip key={i} mode="flat" compact style={styles.tag} textStyle={{ fontSize: 10 }}>
                {tag}
              </Chip>
            ))}
            {tags.length > 3 && <Text variant="labelSmall">+{tags.length - 3}</Text>}
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: Spacing?.sm || 12, 
    borderRadius: 16,
    elevation: 3
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  title: { fontWeight: '700', color: '#424242' },
  preview: { color: '#616161', marginTop: 4 },
  tags: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6, 
    marginTop: 12,
    alignItems: 'center'
  },
  tag: { backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8 },
});