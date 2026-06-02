import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { z, ZodIssue } from 'zod';
import { useNotesStore } from '@/store/notesStore';
import { Colors, Spacing } from '@/constants/theme';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

export default function NuevaNotaScreen() {
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const handleSave = () => {
    const result = noteSchema.safeParse({ title, content });
    
    if (!result.success) {
      const fieldErrors: { title?: string; content?: string } = {};
      result.error.issues.forEach((issue: ZodIssue) => {
        if (issue.path[0] === 'title') fieldErrors.title = issue.message;
        if (issue.path[0] === 'content') fieldErrors.content = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    addNote({
      id: Date.now().toString(),
      title,
      content,
      type: 'note',
      created_at: new Date().toISOString(), // Corregido: usando created_at
    });
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <TextInput
        label="Título"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (errors.title) setErrors({ ...errors, title: undefined });
        }}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: Colors.primary } }}
      />
      <HelperText type="error" visible={!!errors.title}>
        {errors.title}
      </HelperText>

      <TextInput
        label="Contenido"
        value={content}
        onChangeText={(text) => {
          setContent(text);
          if (errors.content) setErrors({ ...errors, content: undefined });
        }}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input, styles.textArea]}
        theme={{ colors: { primary: Colors.primary } }}
      />
      <HelperText type="error" visible={!!errors.content}>
        {errors.content}
      </HelperText>

      <Button 
        mode="contained" 
        onPress={handleSave} 
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Guardar Nota
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.background },
  input: { marginBottom: Spacing.sm, backgroundColor: Colors.background },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  button: { marginTop: Spacing.md, backgroundColor: Colors.primary, borderRadius: 8 },
  buttonContent: { paddingVertical: 4 }
});