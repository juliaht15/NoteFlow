import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, IconButton, Chip, TextInput, Checkbox } from 'react-native-paper';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { AnyNote, isNote, isChecklistNote, isIdeaNote } from '../../types';
import { Colors, Spacing } from '../../constants/theme';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, checklists, ideas, updateNote, toggleChecklistItem } = useNotesStore();

  const foundNote = 
    notes.find((n) => n.id === id) || 
    checklists.find((c) => c.id === id) || 
    ideas.find((i) => i.id === id);

  // Estados locales
  const [title, setTitle] = useState(foundNote?.title || '');
  const [content, setContent] = useState('');

  // Sincronizar estados locales al cargar la nota
  useEffect(() => {
    if (foundNote) {
      setTitle(foundNote.title);
      if (isNote(foundNote) || isIdeaNote(foundNote)) {
        setContent(foundNote.content || '');
      }
    }
  }, [foundNote?.id]);

  useEffect(() => {
  if (!foundNote) return;

  const timeoutId = setTimeout(() => {
    // Si es una nota o idea, actualizamos título y contenido de texto
    if (isNote(foundNote) || isIdeaNote(foundNote)) {
      if (title !== foundNote.title || content !== (foundNote as any).content) {
        updateNote(id as string, { title, content });
      }
    } 
    // Si es una lista, solo actualizamos el título (los items se guardan al hacer click)
    else if (isChecklistNote(foundNote)) {
      if (title !== foundNote.title) {
        updateNote(id as string, { title });
      }
    }
  }, 1000);

  return () => clearTimeout(timeoutId);
}, [title, content]);

  if (!foundNote) {
    return (
      <View style={styles.centered}>
        <Text variant="headlineSmall">Nota no encontrada</Text>
        <IconButton icon="home" mode="contained" onPress={() => router.replace('/(tabs)')} />
      </View>
    );
  }

  const note = foundNote as AnyNote;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.container}
    >
      <Stack.Screen options={{ title: '', headerShown: false }} />
      
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} iconColor={Colors.text} />
        <TextInput
          value={title}
          onChangeText={setTitle}
          mode="flat"
          placeholder="Sin título"
          style={styles.titleInput}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Renderizado para Notas e Ideas */}
        {(isNote(note) || isIdeaNote(note)) && (
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            placeholder="Empieza a escribir..."
            mode="flat"
            style={styles.contentInput}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
        )}

        {/* Renderizado para Listas de Tareas */}
        {isChecklistNote(note) && (
          <View style={styles.checklistContainer}>
            {note.items.map((item) => (
              <View key={item.id} style={styles.checkItem}>
                <Checkbox
                  status={item.isCompleted ? 'checked' : 'unchecked'}
                  onPress={() => toggleChecklistItem(note.id, item.id)}
                  color={Colors.primary}
                />
                <Text 
                  style={[
                    styles.checkText, 
                    item.isCompleted && styles.completedText
                  ]}
                  onPress={() => toggleChecklistItem(note.id, item.id)}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Etiquetas para Ideas */}
        {isIdeaNote(note) && note.tags.length > 0 && (
          <View style={styles.tagContainer}>
            {note.tags.map((tag, index) => (
              <Chip key={index} icon="tag-outline" style={styles.tag} textStyle={styles.tagText}>
                {tag}
              </Chip>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: Platform.OS === 'ios' ? 50 : 20, 
    paddingHorizontal: 8,
    backgroundColor: Colors.surface 
  },
  titleInput: { 
    flex: 1, 
    fontSize: 24, 
    fontWeight: 'bold', 
    backgroundColor: 'transparent',
    height: 60
  },
  scrollContent: { padding: 20 },
  contentInput: { 
    fontSize: 18, 
    backgroundColor: 'transparent', 
    minHeight: 300,
    lineHeight: 24
  },
  checklistContainer: { marginTop: 10 },
  checkItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8,
    paddingVertical: 4
  },
  checkText: { fontSize: 18, color: Colors.text, flex: 1, marginLeft: 8 },
  completedText: { 
    textDecorationLine: 'line-through', 
    color: Colors.textSecondary,
    opacity: 0.6 
  },
  tagContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8, 
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 15
  },
  tag: { backgroundColor: Colors.background, borderRadius: 20 },
  tagText: { color: Colors.primary, fontWeight: '600' }
});