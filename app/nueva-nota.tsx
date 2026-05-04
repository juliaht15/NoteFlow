import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, SegmentedButtons } from 'react-native-paper';
import { useNotesStore } from '../store/notesStore';
import { useRouter, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function NuevaNota() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('nota'); // Estado para la categoría
  const [error, setError] = useState('');
  const { addNote } = useNotesStore();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('Título y contenido son obligatorios');
      return;
    }
    
    addNote({
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category: category as any, // Guardamos la categoría seleccionada
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <>
      {/* CORRECCIÓN: Configuración de la cabecera con botón Salir */}
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
          {/* ORDEN SOLICITADO: Nota, Lista, Idea */}
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
          />
          
          <TextInput 
            label="Contenido" 
            value={content} 
            onChangeText={(text) => { setContent(text); setError(''); }} 
            mode="outlined" 
            multiline 
            numberOfLines={8} 
            style={styles.input} 
          />

          {error && <HelperText type="error" visible={!!error}>{error}</HelperText>}
          
          <Button mode="contained" onPress={handleSave} style={styles.button} buttonColor="#3A86FF">
            Guardar
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
  segment: { marginBottom: 20 },
  input: { marginBottom: 16 },
  button: { marginTop: 8, marginBottom: 8, paddingVertical: 4 },
});