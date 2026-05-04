import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
// CORRECCIÓN: Subimos 2 niveles, no 3 (app/(tabs) -> store)
import { useNotesStore } from '../../store/notesStore';
import { isChecklistNote } from '../../types';
import ChecklistCard from '../../components/items/ChecklistCard';
import { useRouter } from 'expo-router';

export default function ChecklistsScreen() {
  // CORRECCIÓN: Extraemos 'notes' en lugar de 'checklists' inexistente
  const { notes, deleteNote } = useNotesStore();
  const router = useRouter();

  // Filtramos las notas que son específicamente de tipo lista
  const filteredChecklists = notes.filter(n => n.category === 'lista');

  return (
    <View style={styles.container}>
      {filteredChecklists.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge" style={{ color: '#9CA3AF' }}>Sin listas guardadas</Text>
        </View>
      ) : (
        <FlashList
          data={filteredChecklists}
          renderItem={({ item }: { item: any }) => (
            <ChecklistCard 
              checklist={item} 
              onPress={() => router.push(`/notas/${item.id}`)} 
              onDelete={() => deleteNote(item.id, 'checklist')} 
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