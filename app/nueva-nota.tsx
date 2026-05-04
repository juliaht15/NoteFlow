import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, SegmentedButtons, IconButton, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../store/notesStore';
import { Colors } from '../constants/theme';

export default function NuevaNotaScreen() {
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  const [tipo, setTipo] = useState<'nota' | 'idea' | 'lista'>('nota');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [etiqueta, setEtiqueta] = useState('');

  const handleSave = () => {
    if (!titulo.trim()) return;
    
    const contenidoFinal = tipo === 'idea' && etiqueta.trim() 
      ? `[${etiqueta}] ${contenido}` 
      : contenido;

    addNote({
      id: Date.now().toString(),
      title: titulo,
      content: contenidoFinal,
      category: tipo,
      completed: false
    });
    
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <IconButton icon="chevron-left" size={30} onPress={() => router.back()} style={{ marginLeft: -10 }} />
          <Text style={styles.headerTitle}>Nueva {tipo}</Text>
        </View>

        <SegmentedButtons
          value={tipo}
          onValueChange={(value) => setTipo(value as any)}
          buttons={[
            { value: 'nota', label: 'Nota', icon: 'file-document-outline' },
            { value: 'lista', label: 'Lista', icon: 'format-list-bulleted' },
            { value: 'idea', label: 'Idea', icon: 'lightbulb-outline' },
          ]}
          style={styles.segments}
        />

        <TextInput
          label="Título"
          value={titulo}
          onChangeText={setTitulo}
          mode="outlined"
          activeOutlineColor={Colors.primary}
          style={styles.input}
        />

        {tipo === 'idea' && (
          <TextInput
            label="Etiqueta (ej: Trabajo, Casa)"
            value={etiqueta}
            onChangeText={setEtiqueta}
            mode="outlined"
            activeOutlineColor={Colors.primary}
            style={styles.input}
          />
        )}

        <TextInput
          label={tipo === 'lista' ? "Tareas (una por línea)" : "Contenido"}
          value={contenido}
          onChangeText={setContenido}
          mode="outlined"
          multiline
          numberOfLines={6}
          activeOutlineColor={Colors.primary}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={styles.saveBtn}
            buttonColor={Colors.primary}
          >
            Guardar NoteFlow
          </Button>
          
          <Button mode="text" onPress={() => router.back()} textColor={Colors.placeholder}>
            Cancelar y salir
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  segments: { marginBottom: 25 },
  input: { marginBottom: 15, backgroundColor: Colors.surface },
  buttonContainer: { marginTop: 10, gap: 10 },
  saveBtn: { borderRadius: 12, paddingVertical: 6 },
});