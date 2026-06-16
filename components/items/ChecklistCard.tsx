import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChecklistNote } from '@/types';

export const ChecklistCard = ({ note }: { note: ChecklistNote }) => {
  // Ajuste: Cambiamos 'isCompleted' por 'checked' basado en tu mensaje de error
  const completed = note.items.filter(i => i.checked).length;
  const progress = note.items.length > 0 ? (completed / note.items.length) * 100 : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      <Text>{completed}/{note.items.length} completados</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginVertical: 5 },
  title: { fontSize: 18, fontWeight: 'bold' },
  progressBar: { height: 8, backgroundColor: '#eee', marginTop: 5, borderRadius: 4 },
  progress: { height: 8, backgroundColor: '#4CAF50', borderRadius: 4 }
});