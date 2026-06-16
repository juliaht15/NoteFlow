import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnyNote } from '@/types';
import { useTheme } from '@/constants/theme';

export const NoteItem = ({ note }: { note: AnyNote }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>
      {'content' in note && (
        <Text style={[styles.content, { color: colors.secondaryText }]} numberOfLines={2}>
          {note.content}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 8, borderWidth: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  content: { fontSize: 14 }
});