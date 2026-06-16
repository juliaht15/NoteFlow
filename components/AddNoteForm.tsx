import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useNotesStore } from '../store/useNoteStore';
import { useTheme } from '../constants/theme';
import { useLocation } from '../hooks/useLocation';
import { TextNote, ChecklistNote, IdeaNote } from '../types';

type NewTextNote = Omit<TextNote, 'id' | 'createdAt' | 'updatedAt'>;
type NewChecklistNote = Omit<ChecklistNote, 'id' | 'createdAt' | 'updatedAt'>;
type NewIdeaNote = Omit<IdeaNote, 'id' | 'createdAt' | 'updatedAt'>;

export const AddNoteForm = () => {
  const [type, setType] = useState<string>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const { colors, spacing } = useTheme();
  
  const addNote = useNotesStore((state) => state.addNote);
  const { getCurrentLocation } = useLocation();

  const handleSave = async () => {
    if (!title.trim()) return;

    const location = await getCurrentLocation();

    if (type === 'note') {
      const newNote: NewTextNote = {
        type: 'note',
        title,
        content,
        location,
      };
      addNote(newNote as any);
    } else if (type === 'checklist') {
      const newChecklist: NewChecklistNote = {
        type: 'checklist',
        title,
        items: [],
        location,
      };
      addNote(newChecklist as any);
    } else {
      const parsedTags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const newIdea: NewIdeaNote = {
        type: 'idea',
        title,
        tags: parsedTags,
        location,
      };
      addNote(newIdea as any);
    }

    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, padding: spacing.md }]}>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[
          { value: 'note', label: 'Nota' },
          { value: 'checklist', label: 'Lista' },
          { value: 'idea', label: 'Idea' }
        ]}
        style={styles.segmentedButtons}
      />
      <TextInput 
        label="Título" 
        value={title} 
        onChangeText={setTitle} 
        mode="outlined" 
        textColor={colors.text}
        style={styles.input} 
      />
      
      {type === 'note' && (
        <TextInput 
          label="Contenido" 
          value={content} 
          onChangeText={setContent} 
          mode="outlined" 
          multiline 
          numberOfLines={4} 
          textColor={colors.text}
          style={styles.input} 
        />
      )}

      {type === 'idea' && (
        <TextInput 
          label="Etiquetas (separadas por comas)" 
          value={tags} 
          onChangeText={setTags} 
          mode="outlined" 
          placeholder="innovación, código, diseño"
          textColor={colors.text}
          style={styles.input} 
        />
      )}
      
      <Button mode="contained" onPress={handleSave} buttonColor={colors.primary} style={styles.button}>
        Guardar Nota
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 8 },
  segmentedButtons: { marginBottom: 10 },
  input: { marginVertical: 6 },
  button: { marginTop: 14 }
});