import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { z } from 'zod';
import { useNotesStore } from '@/store/useNoteStore';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

export const AddNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const addNote = useNotesStore((state) => state.addNote);

  const handleSave = () => {
    const result = noteSchema.safeParse({ title, content });
    
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    addNote({
      id: Date.now().toString(),
      title,
      content,
      type: 'note',
      createdAt: new Date(), // Ajustado al tipo Date si es necesario
      updatedAt: new Date(),
    });

    setError(null);
    setTitle('');
    setContent('');
    Alert.alert("Éxito", "Nota guardada");
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Contenido" value={content} onChangeText={setContent} style={[styles.input, styles.textArea]} multiline />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Guardar Nota" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 8 },
  textArea: { height: 100, textAlignVertical: 'top' },
  errorText: { color: 'red', marginBottom: 8 }
});