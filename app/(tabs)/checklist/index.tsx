import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, FAB, Text } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '@/store/notesStore';
import { Note } from '@/types';
import ChecklistCard from '@/components/items/ChecklistCard'; 

export default function ChecklistsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const allNotes = useNotesStore((state) => state.notes);

  const filtered = useMemo(() => 
    allNotes.filter((n: Note) => 
      n.type === 'checklist' && n.title.toLowerCase().includes(search.toLowerCase())
    ), [allNotes, search]);

  return (
    <View style={styles.container}>
      <Searchbar 
        placeholder="Buscar listas..." 
        onChangeText={setSearch} 
        value={search} 
        style={styles.search} 
      />
      
      <FlashList
        data={filtered}
        renderItem={({ item }: { item: Note }) => (
          <ChecklistCard 
            note={item} 
            onPress={() => router.push(`/(tabs)/checklist/${item.id}` as any)} 
          />
        )}
        keyExtractor={(item: Note) => item.id}
        estimatedItemSize={80}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No hay checklists registradas</Text>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('/nueva-nota')}
      />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#FFFFFF' }, 
  search: { margin: 10, elevation: 0 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#007AFF' },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 50 }
});