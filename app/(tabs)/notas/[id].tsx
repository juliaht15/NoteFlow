import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, IconButton, HelperText } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function DetalleNota() {
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

  if (!note) return <View style={styles.container}><HelperText type="error">Nota no encontrada</HelperText></View>;

  const handleSave = () => {
    updateNote(note.id, title, content);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Button mode="text" onPress={handleSave} textColor={Colors.primary}>Guardar</Button>
      </View>

      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
        outlineColor={Colors.border}
        activeOutlineColor={Colors.primary}
      />

      <TextInput
        label="Contenido"
        value={content}
        onChangeText={setContent}
        mode="outlined"
        multiline
        numberOfLines={10}
        style={[styles.input, { minHeight: 200 }]}
        outlineColor={Colors.border}
        activeOutlineColor={Colors.primary}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  input: { marginBottom: 16, backgroundColor: 'white' }
});