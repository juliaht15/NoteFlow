import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChecklistNote } from '@/types';
import { useTheme } from '@/constants/theme';

export const ChecklistCard = ({ note }: { note: ChecklistNote }) => {
  const { colors } = useTheme();
  
  const checklistItems = note.items || [];
  const completed = checklistItems.filter(i => i && i.checked).length;
  const progress = checklistItems.length > 0 ? (completed / checklistItems.length) * 100 : 0;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      <Text style={[styles.info, { color: colors.secondaryText }]}>
        {completed}/{checklistItems.length} completados
      </Text>
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <View style={[styles.progress, { width: `${progress}%`, backgroundColor: colors.primary }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 8, borderWidth: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  info: { fontSize: 13, marginBottom: 8 },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progress: { height: 6 }
});