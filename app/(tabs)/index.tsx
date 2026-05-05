import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/items/NoteCard';
import { Colors, Spacing } from '../../constants/theme';

export default function NotesScreen() {
  const notes = useNotesStore((state) => state.notes);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard 
            note={item} 
            onPress={() => router.push(`/(tabs)/${item.id}`)} 
          />
        )}
        contentContainerStyle={styles.list}
      />
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/nueva-nota')}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, paddingBottom: 80 },
  fab: {
    position: 'absolute',
    margin: Spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
  },
});