import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { AnyNote, isNote, isChecklistNote, isIdeaNote } from '../../types';
import { Colors } from '../../constants/theme';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, checklists, ideas } = useNotesStore();

  // Buscamos la nota en cualquiera de los tres arrays
  const note = [...notes, ...checklists, ...ideas].find((n: AnyNote) => n.id === id);

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Nota no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Text variant="headlineMedium" style={styles.title}>{note.title}</Text>
      </View>

      <View style={styles.content}>
        {isNote(note) && (
          <Text variant="bodyLarge">{note.content}</Text>
        )}

        {isChecklistNote(note) && note.items.map((item) => (
          <View key={item.id} style={styles.checkItem}>
            <IconButton icon={item.isCompleted ? "check-circle" : "circle-outline"} />
            <Text style={{ textDecorationLine: item.isCompleted ? 'line-through' : 'none' }}>
              {item.text}
            </Text>
          </View>
        )}

        {isIdeaNote(note) && (
          <View style={styles.tagContainer}>
            {note.tags.map((tag, index) => (
              <Chip key={index} style={styles.tag}>{tag}</Chip>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 8 },
  title: { flex: 1, fontWeight: 'bold' },
  content: { padding: 16 },
  checkItem: { flexDirection: 'row', alignItems: 'center' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#e0e0e0' }
});