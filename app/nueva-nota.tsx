import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from 'react-native';
import { TextInput, Button, HelperText, SegmentedButtons } from 'react-native-paper';
import { useNotesStore } from '../store/notesStore';
import { useRouter, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import theme from '../constants/theme';
import { AnyNote } from '../types';
import { z } from 'zod';

const notaSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  content: z.string().min(1, 'El contenido es obligatorio'),
});

const listaSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  content: z.string().min(1, 'La lista no puede estar vacía'),
});

const ideaSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  content: z.string().optional(),
});

export default function NuevaNota() {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.Colors.dark : theme.Colors.light;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState<'nota' | 'lista' | 'idea'>('nota');
  const [error, setError] = useState('');
  
  const { addNote } = useNotesStore();
  const router = useRouter();

  const handleSave = () => {
    const titleTrimmed = title.trim();
    const contentTrimmed = content.trim();
    const tagTrimmed = tag.trim();

    try {
      if (category === 'nota') {
        notaSchema.parse({ title: titleTrimmed, content: contentTrimmed });
      } else if (category === 'lista') {
        listaSchema.parse({ title: titleTrimmed, content: contentTrimmed });
      } else if (category === 'idea') {
        ideaSchema.parse({ title: titleTrimmed, content: contentTrimmed });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        return;
      }
    }

    const id = Date.now().toString();
    const nowStr = new Date().toISOString();
    let payload: AnyNote;

    if (category === 'lista') {
      const lines = contentTrimmed.split('\n').filter(line => line.trim() !== '');
      payload = {
        id,
        title: titleTrimmed,
        category: 'lista',
        createdAt: nowStr,
        updatedAt: nowStr,
        items: lines.map((line, index) => ({
          id: `${id}-${index}`,
          text: line.trim(),
          isCompleted: false
        }))
      };
    } else if (category === 'idea') {
      payload = {
        id,
        title: titleTrimmed,
        category: 'idea',
        createdAt: nowStr,
        updatedAt: nowStr,
        content: contentTrimmed,
        tags: tagTrimmed ? [tagTrimmed] : [],
        color: currentTheme.ideaColor 
      };
    } else {
      payload = {
        id,
        title: titleTrimmed,
        category: 'nota',
        createdAt: nowStr,
        updatedAt: nowStr,
        content: contentTrimmed
      };
    }
    
    addNote(payload);
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Crear Nuevo',
          headerStyle: { backgroundColor: currentTheme.background },
          headerTintColor: currentTheme.text,
          headerShadowVisible: false,
          headerLeft: () => (
            <Button onPress={() => router.back()} textColor={currentTheme.primary}>Salir</Button>
          ),
        }} 
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1, backgroundColor: currentTheme.background }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0} 
      >
        <ScrollView 
          contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}
          keyboardShouldPersistTaps="handled"
        >
          <SegmentedButtons
            value={category}
            onValueChange={(val) => {
              setCategory(val as 'nota' | 'lista' | 'idea');
              setError('');
            }}
            buttons={[
              { value: 'nota', label: 'Nota', icon: 'file-document-outline', checkedColor: '#fff' },
              { value: 'lista', label: 'Lista', icon: 'format-list-bulleted', checkedColor: '#fff' },
              { value: 'idea', label: 'Idea', icon: 'lightbulb-outline', checkedColor: '#fff' },
            ]}
            style={styles.segment}
            theme={{ colors: { primary: currentTheme.primary } }}
          />

          <TextInput 
            label="Título" 
            value={title} 
            onChangeText={(text) => { setTitle(text); setError(''); }} 
            mode="flat" 
            style={[styles.input, { backgroundColor: currentTheme.surface, color: currentTheme.text }]} 
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            textColor={currentTheme.text}
          />

          {category === 'idea' && (
            <TextInput 
              label="Etiqueta (ej. Trabajo, Viajes)" 
              value={tag} 
              onChangeText={setTag} 
              mode="flat" 
              style={[styles.input, { backgroundColor: currentTheme.surface, color: currentTheme.text }]}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              textColor={currentTheme.text}
              left={<TextInput.Icon icon="tag-outline" color={currentTheme.textSecondary} />}
            />
          )}
          
          <TextInput 
            label={category === 'lista' ? "Elementos de la lista" : "Contenido"} 
            value={content} 
            onChangeText={(text) => { setContent(text); setError(''); }} 
            mode="flat" 
            multiline 
            numberOfLines={category === 'lista' ? 8 : 6} 
            style={[styles.input, { backgroundColor: currentTheme.surface, color: currentTheme.text }]} 
            placeholder={category === 'lista' ? "Ejemplo:\nComprar leche\nLavar el coche" : "Escribe algo..."}
            placeholderTextColor={currentTheme.textSecondary}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            textColor={currentTheme.text}
          />

          {category === 'lista' && (
            <HelperText type="info" visible={true} style={[styles.helper, { color: currentTheme.textSecondary }]}>
              * Escribe cada elemento en una línea nueva.
            </HelperText>
          )}

          {error ? <HelperText type="error" visible={!!error} style={{ color: currentTheme.error }}>{error}</HelperText> : null}
          
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={[styles.button, { borderRadius: theme.BorderRadius.md }]} 
            buttonColor={currentTheme.primary}
            labelStyle={styles.buttonLabel}
          >
            Guardar {category}
          </Button>
          
          <Button mode="text" onPress={() => router.back()} textColor={currentTheme.textSecondary}>
            Cancelar
          </Button>

          <View style={{ height: theme.Spacing.lg }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: theme.Spacing.md, 
    flexGrow: 1,
  },
  segment: { 
    marginBottom: theme.Spacing.lg 
  },
  input: { 
    marginBottom: theme.Spacing.sm,
    borderRadius: theme.BorderRadius.md,
    borderTopLeftRadius: theme.BorderRadius.md,
    borderTopRightRadius: theme.BorderRadius.md,
  },
  helper: { 
    marginBottom: theme.Spacing.sm,
  },
  button: { 
    marginTop: theme.Spacing.md, 
    marginBottom: theme.Spacing.xs, 
    paddingVertical: 4, 
  },
  buttonLabel: { 
    fontSize: 16, 
    fontWeight: '600', 
    textTransform: 'capitalize' 
  }
});