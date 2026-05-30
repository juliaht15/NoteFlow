import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { ChecklistNote } from '../../types';
import ChecklistCard from '../../components/items/ChecklistCard';

export default function ChecklistsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const allNotes = useNotesStore((state) => state.notes);

  const filtered = useMemo(() => 
    allNotes.filter((n): n is ChecklistNote => 
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
      <FlashList<ChecklistNote>
        data={filtered}
        renderItem={({ item }) => (
          <ChecklistCard 
            list={item} 
            onPress={() => router.push(`/(tabs)/checklists/${item.id}`)} 
          />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={80 as any}
      />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#FFFFFF' }, 
  search: { margin: 10, elevation: 0 } 
});