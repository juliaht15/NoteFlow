import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { IdeaNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function IdeaCard({ idea, onPress, onDelete }: IdeaCardProps) {
  const cardColor = Colors.surface; 
  
  const formatDate = (date: any) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-ES');
  };

  return (
    <Card mode="elevated" style={[styles.card, { backgroundColor: cardColor }]} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>{idea.title}</Text>
          <IconButton icon="delete-outline" size={20} onPress={onDelete} iconColor={Colors.error} style={styles.deleteBtn} />
        </View>
        
        {/* Vista previa del contenido (opcional) */}
        {idea.content ? (
          <Text variant="bodySmall" numberOfLines={2} style={styles.preview}>{idea.content}</Text>
        ) : null}

        <Text variant="labelSmall" style={styles.date}>{formatDate(idea.updatedAt)}</Text>
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
    color: Colors.text,
    flex: 1
  },
  preview: { 
    color: Colors.textSecondary, 
    marginTop: 4,
    marginBottom: 8
  },
  deleteBtn: {
    margin: -8
  },
  date: {
    color: Colors.textSecondary,
    textAlign: 'right',
    fontSize: 10,
    marginTop: 8
  }
});