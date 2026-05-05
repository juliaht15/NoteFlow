import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { useNotesStore } from '../../store/notesStore';
import { IdeaNote } from '../../types';
import IdeaCard from '../../components/items/IdeaCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function IdeasScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { ideas, deleteNote } = useNotesStore();

  const filteredIdeas = ideas.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.content?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar ideas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      {filteredIdeas.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge" style={{ color: '#9CA3AF' }}>
            {searchQuery ? "No se encontraron ideas" : "Sin ideas guardadas"}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            {...( {
              data: filteredIdeas,
              renderItem: ({ item }: { item: IdeaNote }) => (
                <IdeaCard 
                  idea={item} 
                  onPress={() => router.push(`/(tabs)/${item.id}`)} 
                  onDelete={() => deleteNote(item.id, 'idea')} 
                />
              ),
              keyExtractor: (item: IdeaNote) => item.id,
              estimatedItemSize: 100,
              contentContainerStyle: styles.list,
            } as FlashListProps<IdeaNote> )}
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