import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Searchbar, FAB, Text } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { isNote } from '../../../types';
import NoteCard from '../../../components/items/NoteCard';
import * as Haptics from 'expo-haptics';

export default function NotasScreen() {
  const [search, setSearch] = useState('');
  const { notes, deleteNote } = useNotesStore();
  const router = useRouter();

  const filteredNotes = notes.filter(n => 
    isNote(n) && (n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar', '¿Seguro?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        deleteNote(id, 'note');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Searchbar 
        placeholder="Buscar..." 
        onChangeText={setSearch} 
        value={search} 
        style={styles.search} 
      />
      
      {filteredNotes.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge">Sin notas</Text>
        </View>
      ) : (
        <FlashList
          data={filteredNotes}
          renderItem={({ item }: { item: any }) => (
            <NoteCard 
              note={item} 
              onPress={() => router.push(`/notas/${item.id}`)} 
              onDelete={() => handleDelete(item.id)} 
            />
          )}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={100}
          contentContainerStyle={styles.list}
          {...({} as any)}
        />
      )}
      
      <FAB 
        icon="plus" 
        onPress={() => router.push('/nueva-nota')} 
        style={styles.fab} 
        color="white" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  search: { margin: 16, borderRadius: 12 },
  list: { padding: 16, paddingBottom: 80 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#3A86FF', borderRadius: 28 },
});