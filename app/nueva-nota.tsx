import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, SegmentedButtons } from 'react-native-paper';
import { useNotesStore } from '../store/notesStore';
import { useRouter, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/theme';
import { AnyNote } from '../types';

export default function NuevaNota() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState<'nota' | 'lista' | 'idea'>('nota');
  const [error, setError] = useState('');
  
  const { addNote } = useNotesStore();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim() || (!content.trim() && category !== 'idea')) {
      setError('El título y el contenido son obligatorios');
      return;
    }

    const id = Date.now().toString();
    const now = new Date();
    let payload: AnyNote;

    if (category === 'lista') {
      const lines = content.split('\n').filter(line => line.trim() !== '');
      payload = {
        id,
        title: title.trim(),
        category: 'lista',
        createdAt: now,
        updatedAt: now,
        items: lines.map((line, index) => ({
          id: `${id}-${index}`,
          text: line.trim(),
          isCompleted: false
        }))
      };
    } else if (category === 'idea') {
      payload = {
        id,
        title: title.trim(),
        category: 'idea',
        createdAt: now,
        updatedAt: now,
        content: content.trim(),
        tags: tag.trim() ? [tag.trim()] : [],
        color: Colors.ideaColor 
      };
    } else {
      payload = {
        id,
        title: title.trim(),
        category: 'nota',
        createdAt: now,
        updatedAt: now,
        content: content.trim()
      };
    }
    
    addNote(payload);
    
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}

    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Crear Nuevo', 
          headerLeft: () => (
            <Button onPress={() => router.back()} textColor={Colors.primary}>Salir</Button>
          ),
        }} 
      />
      {/* CAMBIO 1: Ajuste de behavior y keyboardVerticalOffset */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1, backgroundColor: Colors.surface }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} 
      >
        <ScrollView 
          contentContainerStyle={styles.container}
          // CAMBIO 2: Evita que el teclado se quede pegado al tocar fuera
          keyboardShouldPersistTaps="handled"
        >
          <SegmentedButtons
            value={category}
            onValueChange={(val) => setCategory(val as any)}
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
            outlineColor={Colors.border}
            activeOutlineColor={Colors.primary}
          />

          {category === 'idea' && (
            <TextInput 
              label="Etiqueta (ej. Trabajo, Viajes)" 
              value={tag} 
              onChangeText={setTag} 
              mode="outlined" 
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.primary}
              left={<TextInput.Icon icon="tag-outline" />}
            />
          )}
          
          <TextInput 
            label={category === 'lista' ? "Elementos de la lista" : "Contenido"} 
            value={content} 
            onChangeText={(text) => { setContent(text); setError(''); }} 
            mode="outlined" 
            multiline 
            numberOfLines={category === 'lista' ? 8 : 6} // Reducido un poco para ganar espacio
            style={styles.input} 
            placeholder={category === 'lista' ? "Ejemplo:\nComprar leche\nLavar el coche" : "Escribe algo..."}
            outlineColor={Colors.border}
            activeOutlineColor={Colors.primary}
          />

          {category === 'lista' && (
            <HelperText type="info" visible={true} style={styles.helper}>
              * Escribe cada elemento en una línea nueva.
            </HelperText>
          )}

          {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}
          
          {/* CAMBIO 3: Botón de guardar */}
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={styles.button} 
            buttonColor={Colors.primary}
            labelStyle={styles.buttonLabel}
          >
            Guardar {category}
          </Button>
          
          <Button mode="text" onPress={() => router.back()} textColor={Colors.textSecondary}>
            Cancelar
          </Button>

          {/* CAMBIO 4: Espaciador final para que el scroll permita subir más el botón */}
          <View style={{ height: Platform.OS === 'android' ? 20 : 0 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#fff',
    flexGrow: 1, // Importante para que el ScrollView ocupe todo el espacio
  },
  segment: { marginBottom: 24 },
  input: { marginBottom: 12, backgroundColor: '#fff' },
  helper: { marginBottom: 12, color: '#6B7280' },
  button: { marginTop: 16, marginBottom: 8, paddingVertical: 6, borderRadius: 12 },
  buttonLabel: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' }
});