import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, IconButton, Text } from 'react-native-paper';
import { useNotesStore } from '../../../store/useNoteStore';
import { useTheme } from '../../../constants/theme';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors, spacing } = useTheme();
  
  const notes = useNotesStore((state) => state.notes);
  const updateNote = useNotesStore((state) => (state as any).updateNote);
  const deleteNote = useNotesStore((state) => (state as any).deleteNote);

  const currentNote = notes.find((n) => n.id === id) as any;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || '');
      setContent(currentNote.content || '');
    }
  }, [currentNote]);

  if (!currentNote || currentNote.type !== 'note') {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: colors.surface }]}>
        <Text style={{ color: colors.text }}>Nota no encontrada</Text>
      </SafeAreaView>
    );
  }

  const handleSaveChanges = () => {
    if (updateNote) {
      updateNote(currentNote.id, {
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deleteNote) {
      deleteNote(currentNote.id);
      router.back();
    }
  };

  const bgStyle = (colors as any).background || colors.surface || '#121212';
  const errorColor = (colors as any).error || colors.notification || '#ff1744';
  const disabledColor = (colors as any).disabled || colors.secondaryText || '#777777';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgStyle }]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={[styles.container, { padding: spacing.md }]}>
        
        <View style={styles.headerActions}>
          <IconButton
            icon={isEditing ? "close" : "pencil"}
            iconColor={colors.text}
            size={24}
            onPress={() => setIsEditing(!isEditing)}
          />
          <IconButton
            icon="delete"
            iconColor={errorColor}
            size={24}
            onPress={handleDelete}
          />
        </View>

        {isEditing ? (
          <View style={styles.form}>
            <TextInput
              label="Título de la nota"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Contenido"
              value={content}
              onChangeText={setContent}
              mode="outlined"
              multiline
              numberOfLines={6}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton}>
              Guardar Cambios
            </Button>
          </View>
        ) : (
          <View style={styles.displayContainer}>
            <Text variant="headlineMedium" style={[styles.title, { color: colors.text }]}>
              {currentNote.title}
            </Text>
            {currentNote.content ? (
              <Text variant="bodyLarge" style={[styles.content, { color: colors.secondaryText }]}>
                {currentNote.content}
              </Text>
            ) : null}
            <Text variant="bodySmall" style={{ color: disabledColor, marginTop: 24 }}>
              Actualizada: {new Date(currentNote.updatedAt).toLocaleDateString()}
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerActions: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 16 },
  form: { width: '100%' },
  input: { marginBottom: 16 },
  saveButton: { marginTop: 8 },
  displayContainer: { paddingHorizontal: 4 },
  title: { fontWeight: '700', marginBottom: 16 },
  content: { lineHeight: 24 }
});