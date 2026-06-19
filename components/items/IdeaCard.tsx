import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Idea } from '@/types';
import { useTheme } from '@/constants/theme';

export const IdeaCard = ({ note }: { note: Idea }) => {
  const { colors } = useTheme();
  const tagsList = note.tags || [];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      {tagsList.length > 0 ? (
        <View style={styles.tags}>
          {tagsList.map(t => (
            <Text key={t} style={[styles.tag, { color: colors.primary }]}>#{t}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 16, borderWidth: 1 },
  title: { fontSize: 16, fontWeight: '700' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 6 },
  tag: { fontSize: 13, fontWeight: '600' }
});