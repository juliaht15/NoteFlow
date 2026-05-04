import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
// CORRECCIÓN: Subimos 2 niveles para llegar a store
import { useNotesStore } from '../../store/notesStore';
import { isIdeaNote } from '../../types';
import IdeaCard from '../../components/items/IdeaCard';
import { useRouter } from 'expo-router';

export default function IdeasScreen() {
  // CORRECCIÓN: Extraemos 'notes' del store, no 'ideas'
  const { notes, deleteNote } = useNotesStore();
  const router = useRouter();

  // Filtramos las notas que pertenecen a la categoría 'idea'
  const filteredIdeas = notes.filter(n => n.category === 'idea');

  return (
    <View style={styles.container}>
      {filteredIdeas.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge" style={{ color: '#9CA3AF' }}>Sin ideas guardadas</Text>
        </View>
      ) : (
        <FlashList
          // CORRECCIÓN: Usamos el array filtrado y aplicamos la validación de tipo
          data={filteredIdeas.filter(isIdeaNote)}
          renderItem={({ item }: { item: any }) => (
            <IdeaCard 
              idea={item} 
              onPress={() => router.push(`/notas/${item.id}`)} 
              onDelete={() => deleteNote(item.id, 'idea')} 
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
  list: { padding: 16, paddingBottom: 80 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#3A86FF', borderRadius: 28 },
});