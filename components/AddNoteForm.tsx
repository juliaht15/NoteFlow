import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNotesStore } from '../store/useNoteStore';
import { useTheme } from '../constants/theme';

interface AddNoteFormProps {
  type: 'note' | 'checklist' | 'idea';
}

export const AddNoteForm = ({ type }: AddNoteFormProps) => {
  const { colors } = useTheme();
  const addNote = useNotesStore((state) => state.addNote);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;

    const noteData: any = {
      title: title.trim(),
      type,
    };

    // Tanto notas, checklists como ideas ahora pueden llevar descripción/contenido base
    if (type === 'note' || type === 'idea' || type === 'checklist') {
      noteData.content = content.trim();
    }

    // Si es checklist, además inicializamos una estructura de items interactivos limpios
    if (type === 'checklist') {
      noteData.items = content.trim() 
        ? content.split('\n').map((line, idx) => ({ id: String(idx), text: line.trim(), checked: false }))
        : [];
    }

    if (type === 'idea' && tags.trim()) {
      noteData.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }

    addNote(noteData);

    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      
      <TextInput
        label={type === 'checklist' ? "Elementos (uno por línea)" : "Contenido / Descripción"}
        value={content}
        onChangeText={setContent}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      {type === 'idea' && (
        <TextInput
          label="Etiquetas (separadas por comas)"
          value={tags}
          onChangeText={setTags}
          mode="outlined"
          placeholder="ej: diseño, backend, bug"
          style={styles.input}
        />
      )}

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Guardar {type === 'note' ? 'Nota' : type === 'checklist' ? 'Lista' : 'Idea'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 8, marginBottom: 16 },
  input: { marginBottom: 12 },
  button: { marginTop: 4 }
});