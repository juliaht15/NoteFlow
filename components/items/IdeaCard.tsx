import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IdeaNote } from '@/types';
import { useTheme } from '@/constants/theme';

export const IdeaCard = ({ note }: { note: IdeaNote }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      <View style={styles.tags}>
        {note.tags.map(t => (
          <Text key={t} style={[styles.tag, { color: colors.primary }]}>#{t}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 8, borderWidth: 1 },
  title: { fontSize: 16, fontWeight: '700' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 6 },
  tag: { fontSize: 13, fontWeight: '600' }
});