import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Chip, TextInput } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { AnyNote, isNote, isChecklistNote, isIdeaNote } from '../../types';
import { Colors } from '../../constants/theme';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, checklists, ideas, updateNote } = useNotesStore();

  const foundNote = 
    notes.find((n) => n.id === id) || 
    checklists.find((c) => c.id === id) || 
    ideas.find((i) => i.id === id);

  // Estados locales
  const [title, setTitle] = useState(foundNote?.title || '');
  const [content, setContent] = useState('');

  // Sincronizar contenido si es una nota simple al cargar
  useEffect(() => {
    if (foundNote && isNote(foundNote)) {
      setContent(foundNote.content);
    }
  }, [foundNote]);

  // Guardado automático (Debounce)
  useEffect(() => {
    if (foundNote) {
      const timeoutId = setTimeout(() => {
        updateNote(id as string, { title, content });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [title, content]);

  if (!foundNote) {
    return (
      <View style={styles.container}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <View style={styles.centered}><Text>Nota no encontrada</Text></View>
      </View>
    );
  }

  // Aserción de tipo segura para TS
  const note = foundNote as AnyNote;

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <TextInput
          value={title}
          onChangeText={setTitle}
          mode="flat"
          style={styles.titleInput}
          underlineColor="transparent"
        />
      </View>

      <View style={styles.content}>
        {isNote(note) && (
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            mode="flat"
            style={styles.contentInput}
            underlineColor="transparent"
          />
        )}

        {isChecklistNote(note) && note.items.map((item) => (
          <View key={item.id} style={styles.checkItem}>
            <IconButton icon={item.isCompleted ? "check-circle" : "circle-outline"} />
            <Text style={{ textDecorationLine: item.isCompleted ? 'line-through' : 'none' }}>
              {item.text}
            </Text>
          </View>
        ))}

        {isIdeaNote(note) && (
          <View style={styles.tagContainer}>
            {note.tags.map((tag, index) => (
              <Chip key={index} icon="tag" style={styles.tag}>{tag}</Chip>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#eee' },
  titleInput: { flex: 1, fontSize: 22, fontWeight: 'bold', backgroundColor: 'transparent' },
  content: { padding: 20 },
  contentInput: { fontSize: 16, backgroundColor: 'transparent', minHeight: 200 },
  checkItem: { flexDirection: 'row', alignItems: 'center' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#e3f2fd' }
});