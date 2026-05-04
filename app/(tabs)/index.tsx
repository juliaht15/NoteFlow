import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Note } from '../../types';
import NoteCard from '../../components/items/NoteCard';
import { Colors } from '../../constants/theme';

export default function NotasScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { notes, deleteNote } = useNotesStore();

  const filteredNotes = notes.filter((n: Note) => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.content?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar notas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/(tabs)/${item.id}` as any)}
            onDelete={() => deleteNote(item.id, 'nota')}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="bodyMedium">No hay notas guardadas</Text>
          </View>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => router.push('/nueva-nota')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors?.background || '#F8F9FA' },
  search: { margin: 16, borderRadius: 12, backgroundColor: '#FFFFFF' },
  list: { padding: 16, paddingBottom: 80 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  fab: { 
    position: 'absolute', 
    right: 16, 
    bottom: 16, 
    backgroundColor: Colors?.primary || '#3A86FF', 
    borderRadius: 28 
  },
});