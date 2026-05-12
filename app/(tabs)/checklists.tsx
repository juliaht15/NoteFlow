import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import ChecklistCard from '../../components/items/ChecklistCard';
import { Colors, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function ChecklistsScreen() {
  const router = useRouter();
  const { checklists } = useNotesStore();
  
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChecklists = checklists.filter(list => 
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Checklists</Text>

      <Searchbar
        placeholder="Buscar listas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor={Colors.primary}
      />
      
      <FlatList
        data={filteredChecklists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChecklistCard checklist={item} onPress={() => router.push(`/${item.id}`)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No se encontraron listas' : 'No hay listas creadas'}
          </Text>
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
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingHorizontal: Spacing.md, 
    paddingTop: 60 
  },
  header: { 
    fontWeight: 'bold', 
    marginBottom: Spacing.sm, 
    color: Colors.primary 
  },
  searchBar: {
    marginBottom: Spacing.md,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
  },
  list: { 
    paddingBottom: 100 
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.textSecondary,
    fontStyle: 'italic'
  },
  fab: { 
    position: 'absolute', 
    margin: 16, 
    right: 0, 
    bottom: 0, 
    backgroundColor: Colors.primary,
    borderRadius: 16,
  }
});