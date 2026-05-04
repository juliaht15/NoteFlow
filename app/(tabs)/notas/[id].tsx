import React, { useState, useEffect } from 'react';
import { useGlobalSearchParams, useRouter } from 'expo-router'; // Cambiado a GlobalSearchParams
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, IconButton, Text } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function DetalleNota() {
  const { id } = useGlobalSearchParams(); // Usamos Global para asegurar que pille el ID de la URL
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

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 50, textAlign: 'center' }}>Nota no encontrada (ID: {id})</Text>
        <Button onPress={() => router.back()}>Volver</Button>
      </View>
    );
  }

  const handleSave = () => {
    updateNote(note.id, title, content);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <Button mode="contained" onPress={handleSave} style={{borderRadius: 20}}>
          Guardar
        </Button>
      </View>

      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Contenido"
        value={content}
        onChangeText={setContent}
        mode="outlined"
        multiline
        numberOfLines={10}
        style={[styles.input, { minHeight: 250 }]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  input: { marginBottom: 16, backgroundColor: 'white' }
});