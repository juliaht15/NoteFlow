import React from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { isNote } from '../../../types';
import * as Haptics from 'expo-haptics';

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  const note = notes.find(n => n.id === id);

  if (!note || !isNote(note)) {
    return (
      <View style={styles.container}>
        <Text variant="bodyLarge">Nota no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Eliminar', '¿Seguro?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        deleteNote(note.id, 'note');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace('/(tabs)/notas');
      }}
    ]);
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: note.title, 
          headerRight: () => <IconButton icon="delete-outline" onPress={handleDelete} /> 
        }} 
      />
      <ScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>{note.title}</Text>
        <Text variant="bodyMedium" style={styles.content}>{note.content}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontWeight: '700', marginBottom: 16 },
  content: { lineHeight: 24 },
});