import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '@/types';

export const NoteItem = ({ note }: { note: Note }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{note.title}</Text>
    <Text>{note.content}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginVertical: 5 },
  title: { fontSize: 18, fontWeight: 'bold' }
});