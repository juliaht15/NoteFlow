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
  return (
    <Card mode="elevated" style={[styles.card, { backgroundColor: idea.color }]} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" numberOfLines={1}>{idea.title}</Text>
          <IconButton icon="delete-outline" size={20} onPress={onDelete} />
        </View>
        <View style={styles.tags}>
          {idea.tags.slice(0, 3).map((tag, i) => (
            <Chip key={i} mode="flat" compact style={styles.tag}>{tag}</Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: Spacing.xs },
  tag: { backgroundColor: 'rgba(255,255,255,0.7)' },
});