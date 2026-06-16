// E:\Proyectos\noteflow\components\AddNoteForm.tsx
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Location from 'expo-location';

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons, useTheme } from 'react-native-paper';
import { useNotesStore } from '@/store/useNoteStore';
import { AnyNote } from '@/types';

export const AddNoteForm = () => {
  const [type, setType] = useState<string>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const theme = useTheme();
  const addNote = useNotesStore((state) => state.addNote);

  const handleSave = async () => {
    if (!title.trim()) return;

    let location = null;
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const pos = await Location.getCurrentPositionAsync({});
      location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    }

    const newNote: AnyNote = type === 'note' 
      ? { id: uuidv4(), type: 'note', title, content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), location }
      : { id: uuidv4(), type: 'checklist', title, items: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), location };
    
    addNote(newNote);
    setTitle('');
    setContent('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[{ value: 'note', label: 'Nota' }, { value: 'checklist', label: 'Checklist' }]}
        style={styles.segmentedButtons}
      />
      <TextInput label="Título" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
      {type === 'note' && (
        <TextInput label="Contenido" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={4} style={styles.input} />
      )}
      <Button mode="contained" onPress={handleSave} style={styles.button}>Guardar con Ubicación</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  segmentedButtons: { marginBottom: 10 },
  input: { marginVertical: 8 },
  button: { marginTop: 20 }
});