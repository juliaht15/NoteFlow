import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, SegmentedButtons, Button } from 'react-native-paper';
import { useNotesStore } from '../store/notesStore';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function NuevaNotaModal() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('nota');
  const addNote = useNotesStore((state) => state.addNote);
  const router = useRouter();

  const handleSave = () => {
    if (!title) return;

    addNote({
      id: Date.now().toString(),
      title,
      content,
      category: category as 'nota' | 'lista' | 'idea',
      completed: false
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* ORDEN SOLICITADO: Nota, Lista e Idea */}
      <SegmentedButtons
        value={category}
        onValueChange={setCategory}
        buttons={[
          { value: 'nota', label: 'Nota', icon: 'file-document-outline' },
          { value: 'lista', label: 'Lista', icon: 'format-list-bulleted' },
          { value: 'idea', label: 'Idea', icon: 'lightbulb-outline' },
        ]}
        style={styles.segment}
      />

      <TextInput label="Título" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
      <TextInput label="Contenido" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={5} style={styles.input} />

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Guardar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  segment: { marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, backgroundColor: '#2196F3' }
});