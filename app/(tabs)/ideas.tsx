import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../store/notesStore';
import { isIdeaNote } from '../../types';
import IdeaCard from '../../components/items/IdeaCard';
import { useRouter } from 'expo-router';

export default function IdeasScreen() {
  const { ideas, deleteNote } = useNotesStore();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {ideas.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyLarge">Sin ideas</Text>
        </View>
      ) : (
        <FlashList
          data={ideas.filter(isIdeaNote)}
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