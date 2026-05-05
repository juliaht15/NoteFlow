import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, SegmentedButtons, Text } from 'react-native-paper';
import { useNotesStore } from '../store/notesStore';
import { useRouter, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function NuevaNota() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState(''); // Estado para la etiqueta de Idea
  const [category, setCategory] = useState('nota');
  const [error, setError] = useState('');
  const { addNote } = useNotesStore();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('Título y contenido son obligatorios');
      return;
    }

    let payload: any = {
      id: Date.now().toString(),
      title: title.trim(),
      type: category, // Usamos 'type' para consistencia con el store
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Lógica según el tipo seleccionado
    if (category === 'lista') {
      // Convertimos cada línea en un objeto del checklist
      const lines = content.split('\n').filter(line => line.trim() !== '');
      payload.items = lines.map((line, index) => ({
        id: `${Date.now()}-${index}`,
        text: line.trim(),
        isCompleted: false
      }));
    } else if (category === 'idea') {
      payload.content = content.trim();
      payload.tags = tag.trim() ? [tag.trim()] : [];
    } else {
      payload.content = content.trim();
    }
    
    addNote(payload);
    
    // Feedback táctil (asegúrate de que el plugin esté bien configurado)
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      console.log("Haptics no disponible");
    }

    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Crear Nuevo', 
          presentation: 'modal',
          headerLeft: () => (
            <Button onPress={() => router.back()} textColor="#3A86FF">Salir</Button>
          ),
        }} 
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <ScrollView contentContainerStyle={styles.container}>
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

          <TextInput 
            label="Título" 
            value={title} 
            onChangeText={(text) => { setTitle(text); setError(''); }} 
            mode="outlined" 
            style={styles.input} 
            outlineColor="#E5E7EB"
            activeOutlineColor="#3A86FF"
          />

          {/* Campo de Etiqueta (Solo para Ideas) */}
          {category === 'idea' && (
            <TextInput 
              label="Etiqueta (ej. Trabajo, Viajes)" 
              value={tag} 
              onChangeText={setTag} 
              mode="outlined" 
              style={styles.input}
              outlineColor="#E5E7EB"
              activeOutlineColor="#3A86FF"
              left={<TextInput.Icon icon="tag-outline" />}
            />
          )}
          
          <TextInput 
            label={category === 'lista' ? "Elementos de la lista" : "Contenido"} 
            value={content} 
            onChangeText={(text) => { setContent(text); setError(''); }} 
            mode="outlined" 
            multiline 
            numberOfLines={category === 'lista' ? 10 : 8} 
            style={styles.input} 
            placeholder={category === 'lista' ? "Ejemplo:\nComprar leche\nLavar el coche\nLlamar a mamá" : ""}
            outlineColor="#E5E7EB"
            activeOutlineColor="#3A86FF"
          />

          {/* Aviso informativo para Listas */}
          {category === 'lista' && (
            <HelperText type="info" visible={true} style={styles.helper}>
              * Escribe cada elemento de la lista en una línea diferente.
            </HelperText>
          )}

          {error && <HelperText type="error" visible={!!error}>{error}</HelperText>}
          
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={styles.button} 
            buttonColor="#3A86FF"
            labelStyle={styles.buttonLabel}
          >
            Guardar {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
          
          <Button mode="text" onPress={() => router.back()} textColor="#9CA3AF">
            Cancelar
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  segment: { marginBottom: 24 },
  input: { marginBottom: 12, backgroundColor: '#fff' },
  helper: { marginBottom: 12, color: '#6B7280' },
  button: { marginTop: 16, marginBottom: 8, paddingVertical: 6, borderRadius: 12 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold' }
});