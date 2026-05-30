import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../store/notesStore';import { AnyNote } from '../../types';
export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const notes = useNotesStore((state) => state.notes);
  const updateNote = useNotesStore((state) => state.updateNote);
  
  const item = notes.find((n) => n.id === id);
  const [title, setTitle] = useState(item?.title || '');

  useEffect(() => {
    if (item) setTitle(item.title);
  }, [item]);

  const handleSave = () => {
    if (item) {
      updateNote(item.id, { title });
      router.back();
    }
  };

  if (!item) return <View style={styles.container} />;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <IconButton icon="check" onPress={handleSave} />
      </View>
      
      <TextInput 
        value={title} 
        onChangeText={setTitle} 
        style={styles.input}
        mode="outlined"
        label="Título"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  input: { backgroundColor: 'transparent' }
});