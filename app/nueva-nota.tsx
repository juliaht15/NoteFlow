import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useNotesStore } from '../store/notesStore';
import { useRouter, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function NuevaNota() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Nueva Nota', presentation: 'modal' }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput label="Título" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
          <TextInput label="Contenido" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={8} style={styles.input} />
          {error && <HelperText type="error">{error}</HelperText>}
          <Button mode="contained" onPress={handleSave} style={styles.button}>Guardar</Button>
          <Button mode="text" onPress={() => router.back()}>Cancelar</Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 16 },
  button: { marginTop: 8, marginBottom: 8 },
});