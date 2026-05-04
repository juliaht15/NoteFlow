import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';

export default function EditorNota() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, updateNote } = useNotesStore();
  
  const note = notes.find((n) => n.id === id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  if (!note) return null;

  const handleSave = () => {
    updateNote(id as string, title, content);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: 'white', elevation: 0 }}>
        <Appbar.Action icon="close" onPress={() => router.back()} />
        <Appbar.Content title="" />
        <Button mode="text" onPress={handleSave}>Hecho</Button>
      </Appbar.Header>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          mode="flat"
          style={styles.titleInput}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <TextInput
          placeholder="Escribe aquí..."
          value={content}
          onChangeText={setContent}
          mode="flat"
          multiline
          style={styles.contentInput}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  titleInput: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    backgroundColor: 'white', 
    marginTop: 10 
  },
  contentInput: { 
    fontSize: 18, 
    backgroundColor: 'white', 
    minHeight: 400,
    textAlignVertical: 'top'
  },
});