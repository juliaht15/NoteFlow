import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNotesStore } from '@/store/useNoteStore';

export const AddNoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addNote = useNotesStore((state) => state.addNote);

  const handleSave = () => {
    if (!title.trim()) return;
    
    addNote({
      id: Date.now().toString(),
      title,
      content,
      type: 'note',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Contenido" value={content} onChangeText={setContent} style={[styles.input, styles.textArea]} multiline />
      <Button title="Guardar Nota" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 8 },
  textArea: { height: 100, textAlignVertical: 'top' },
});