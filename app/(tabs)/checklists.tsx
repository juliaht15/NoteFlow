import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useNotesStore } from '../../store/notesStore';
import { ChecklistNote } from '../../types';
import ChecklistCard from '../../components/items/ChecklistCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function ChecklistsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { checklists, deleteNote } = useNotesStore();

  const filteredChecklists = checklists.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar listas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      {filteredChecklists.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge" style={{ color: '#9CA3AF' }}>
            {searchQuery ? "No hay coincidencias" : "Sin listas guardadas"}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            {...( {
              data: filteredChecklists,
              renderItem: ({ item }: { item: ChecklistNote }) => (
                <ChecklistCard 
                  checklist={item} 
                  onPress={() => router.push(`/(tabs)/${item.id}`)} 
                  onDelete={() => deleteNote(item.id, 'lista')} 
                />
              ),
              keyExtractor: (item: ChecklistNote) => item.id,
              estimatedItemSize: 100,
              contentContainerStyle: styles.list,
            } as FlashListProps<ChecklistNote> )}
          />
        </View>
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
  container: { flex: 1, backgroundColor: Colors?.background || '#F8F9FA' },
  search: { margin: 16, borderRadius: 12, backgroundColor: '#FFFFFF', elevation: 2 },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: Colors?.primary || '#3A86FF', borderRadius: 28 },
});