import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IdeaNote } from '@/types';

export const IdeaCard = ({ note }: { note: IdeaNote }) => (
  <View style={[styles.card, { backgroundColor: note.color || '#6200EE' }]}>
    <Text style={styles.title}>{note.title}</Text>
    <View style={styles.tags}>{note.tags.map(t => <Text key={t} style={styles.tag}>#{t}</Text>)}</View>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 15, borderRadius: 10, marginVertical: 5 },
  title: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  tags: { flexDirection: 'row', marginTop: 5 },
  tag: { color: '#fff', fontSize: 12, marginRight: 5, opacity: 0.8 }
});