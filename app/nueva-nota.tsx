import React, { useState } from 'react';
import { View, StyleSheet, useColorScheme, TextInput, Pressable, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../store/notesStore';
import { AnyNote } from '../types';
import { Colors, Spacing } from '../constants/theme';

export default function NuevaNotaScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const addNote = useNotesStore((state) => state.addNote);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      router.back();
      return;
    }

    const newNoteData: AnyNote = {
      id: Math.random().toString(36).substring(7),
      type: 'note',
      title: title.trim() || 'Nota sin título',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addNote(newNoteData);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.surface }]} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={{ color: currentTheme.primary, fontSize: 16 }}>Cancelar</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Nueva Nota</Text>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={{ color: currentTheme.primary, fontSize: 16, fontWeight: '600' }}>Guardar</Text>
        </Pressable>
      </View>

      <TextInput
        placeholder="Título"
        placeholderTextColor={currentTheme.textSecondary}
        value={title}
        onChangeText={setTitle}
        style={[styles.titleInput, { color: currentTheme.text }]}
        maxLength={50}
      />

      <TextInput
        placeholder="Empieza a escribir aquí..."
        placeholderTextColor={currentTheme.textSecondary}
        value={content}
        onChangeText={setContent}
        style={[styles.contentInput, { color: currentTheme.text }]}
        multiline
        textAlignVertical="top"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingTop: 20, marginBottom: Spacing.xl },
  backButton: { paddingVertical: Spacing.xs },
  saveButton: { paddingVertical: Spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  titleInput: { fontSize: 24, fontWeight: '700', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  contentInput: { fontSize: 16, paddingHorizontal: Spacing.lg, flex: 1, minHeight: 200, lineHeight: 22 }
});