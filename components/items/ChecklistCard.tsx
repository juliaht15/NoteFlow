import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, IconButton } from 'react-native-paper';
import { ChecklistNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
  onDelete: () => void;
}

export default function ChecklistCard({ checklist, onPress, onDelete }: ChecklistCardProps) {
  const completed = checklist.items.filter(i => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" numberOfLines={1}>{checklist.title}</Text>
          <IconButton icon="delete-outline" size={20} onPress={onDelete} />
        </View>
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={Colors.success} style={styles.progressBar} />
          <Text variant="labelSmall">{completed}/{total}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm, borderRadius: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  progressBar: { flex: 1, height: 6 },
});