import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, SegmentedButtons, HelperText, Chip, IconButton, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { z } from 'zod';
import { useNotesStore } from '../store/notesStore';
import { NoteType } from '../types';

// Esquema de validación
const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

export default function NuevaNotaScreen() {
  const router = useRouter();
  const addNote = useNotesStore((state) => state.addNote);

  // Estados generales
  const [type, setType] = useState<NoteType>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Estados para Checklists
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState<{ id: string; text: string; isCompleted: boolean }[]>([]);

  // Estados para Ideas
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = async () => {
    const result = noteSchema.safeParse({ title });
    
    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      // Vibración de error
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const baseData = {
      id: Date.now().toString(),
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      if (type === 'text') {
        addNote({ ...baseData, type: 'text', content } as any);
      } else if (type === 'checklist') {
        addNote({ ...baseData, type: 'checklist', items } as any);
      } else {
        addNote({ ...baseData, type: 'idea', tags, color: '#fff9c4' } as any);
      }

      // Vibración de éxito al guardar
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <SegmentedButtons
          value={type}
          onValueChange={v => setType(v as NoteType)}
          buttons={[
            { value: 'text', label: 'Nota', icon: 'note-text' },
            { value: 'checklist', label: 'Lista', icon: 'check-all' },
            { value: 'idea', label: 'Idea', icon: 'lightbulb' },
          ]}
          style={styles.mb}
        />

        <TextInput 
          label="Título de la nota" 
          value={title} 
          onChangeText={(t) => { setTitle(t); setErrorMsg(null); }} 
          error={!!errorMsg}
          mode="outlined"
        />
        {errorMsg && <HelperText type="error">{errorMsg}</HelperText>}

        {/* RENDERIZADO DINÁMICO SEGÚN TIPO */}
        {type === 'text' && (
          <TextInput 
            label="Contenido" 
            value={content} 
            onChangeText={setContent} 
            multiline 
            numberOfLines={10} 
            mode="outlined"
            style={styles.mt}
          />
        )}

        {type === 'checklist' && (
          <View style={styles.mt}>
            <View style={styles.row}>
              <TextInput 
                label="Nueva tarea" 
                value={newItem} 
                onChangeText={setNewItem} 
                style={styles.flex}
                mode="flat"
              />
              <IconButton 
                icon="plus-circle" 
                size={30} 
                onPress={() => {
                  if(newItem.trim()) {
                    setItems([...items, { id: Date.now().toString(), text: newItem, isCompleted: false }]);
                    setNewItem('');
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }} 
              />
            </View>
            {items.map(item => (
              <Chip key={item.id} style={styles.chip} onClose={() => setItems(items.filter(i => i.id !== item.id))}>
                {item.text}
              </Chip>
            ))}
          </View>
        )}

        {type === 'idea' && (
          <View style={styles.mt}>
            <View style={styles.row}>
              <TextInput 
                label="Etiqueta (ej: Proyecto)" 
                value={newTag} 
                onChangeText={setNewTag} 
                style={styles.flex}
              />
              <IconButton 
                icon="tag-plus" 
                onPress={() => {
                  if(newTag.trim()) {
                    setTags([...tags, newTag.trim()]);
                    setNewTag('');
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                }} 
              />
            </View>
            <View style={styles.rowWrap}>
              {tags.map(tag => (
                <Chip key={tag} style={styles.chip} onClose={() => setTags(tags.filter(t => t !== tag))}>
                  {tag}
                </Chip>
              ))}
            </View>
          </View>
        )}

        <Button 
          mode="contained" 
          onPress={handleSave} 
          style={styles.saveBtn}
          contentStyle={styles.saveBtnContent}
        >
          Guardar en NoteFlow
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 20, backgroundColor: '#fff' },
  mb: { marginBottom: 20 },
  mt: { marginTop: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  chip: { margin: 4 },
  saveBtn: { marginTop: 30, borderRadius: 8 },
  saveBtnContent: { paddingVertical: 8 }
});