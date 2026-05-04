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

  // Combinamos todos los arrays para buscar la nota por ID
  const allEntries = [...notes, ...checklists, ...ideas];
  const note = allEntries.find((n: AnyNote) => n.id === id);

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nota no encontrada</Text>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
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
        {/* Renderizado para Notas Simples */}
        {isNote(note) && (
          <Text variant="bodyLarge">{note.content}</Text>
        )}

        {/* Renderizado para Checklists */}
        {isChecklistNote(note) && note.items.map((item) => (
          <View key={item.id} style={styles.checkItem}>
            <IconButton 
              icon={item.isCompleted ? "check-circle" : "circle-outline"} 
              iconColor={item.isCompleted ? Colors?.primary : '#757575'}
            />
            <Text style={[
              styles.checkText,
              { textDecorationLine: item.isCompleted ? 'line-through' : 'none' }
            ]}>
              {item.text}
            </Text>
          </View>
        ))}

        {/* Renderizado para Ideas/Tags */}
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
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 8 
  },
  title: { 
    flex: 1, 
    fontWeight: 'bold',
    marginLeft: 8
  },
  content: { 
    padding: 20 
  },
  checkItem: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 8
  },
  checkText: {
    fontSize: 16,
    color: '#333'
  },
  tagContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8,
    marginTop: 10
  },
  tag: { 
    backgroundColor: '#f0f0f0' 
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18
  }
});