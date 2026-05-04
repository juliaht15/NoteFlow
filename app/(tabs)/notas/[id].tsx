import React, { useState, useEffect } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function EditorNota() {
  const { id } = useGlobalSearchParams();
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
    updateNote(note.id, title, content);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="close" onPress={() => router.back()} />
        <Button mode="contained" onPress={handleSave} buttonColor={Colors.primary}>
          Hecho
        </Button>
      </View>

      <ScrollView>
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
          placeholder="Empieza a escribir..."
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
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 50, 
    marginBottom: 10 
  },
  titleInput: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    backgroundColor: 'transparent',
    height: 60
  },
  contentInput: { 
    fontSize: 16, 
    backgroundColor: 'transparent', 
    minHeight: 400 
  },
});