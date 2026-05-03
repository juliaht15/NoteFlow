import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, SegmentedButtons, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../store/notesStore';
import { Colors } from '../constants/theme';

export default function NuevaNotaScreen() {
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  const [tipo, setTipo] = useState('nota');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSave = () => {
    if (titulo.trim() === '') return;
    
    addNote({
      title: titulo,
      content: contenido,
      category: tipo,
    });
    
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <SegmentedButtons
        value={tipo}
        onValueChange={setTipo}
        buttons={[
          { value: 'nota', label: 'Nota', icon: 'file-document-outline' },
          { value: 'lista', label: 'Lista', icon: 'check-all' },
          { value: 'idea', label: 'Idea', icon: 'lightbulb-outline' },
        ]}
        theme={{ colors: { secondaryContainer: '#E0E7FF' } }} // Fondo suave para el botón activo
        style={styles.segments}
      />

      <TextInput
        label="Título de la nota"
        value={titulo}
        onChangeText={setTitulo}
        mode="outlined"
        outlineColor={Colors.border}
        activeOutlineColor={Colors.primary}
        style={styles.input}
      />

      {tipo === 'nota' && (
        <TextInput
          label="Contenido"
          value={contenido}
          onChangeText={setContenido}
          mode="outlined"
          multiline
          numberOfLines={5}
          activeOutlineColor={Colors.primary}
          style={styles.input}
        />
      )}

      {tipo === 'lista' && (
        <TextInput
          label="Nueva tarea"
          placeholder="Escribe una tarea..."
          mode="flat"
          right={<TextInput.Icon icon="plus-circle" color={Colors.primary} />}
          style={styles.input}
        />
      )}

      {tipo === 'idea' && (
        <TextInput
          label="Etiqueta (ej: Proyecto)"
          mode="flat"
          right={<TextInput.Icon icon="tag-plus" color={Colors.primary} />}
          style={[styles.input, { backgroundColor: '#F0F4FF' }]} // Un azul muy suave de fondo
        />
      )}

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.button}
        buttonColor={Colors.primary}
        contentStyle={{ paddingVertical: 8 }}
      >
        Guardar en NoteFlow
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  segments: {
    marginBottom: 25,
  },
  input: {
    marginBottom: 20,
    backgroundColor: Colors.background,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
});