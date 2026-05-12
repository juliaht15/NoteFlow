import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import IdeaCard from '../../components/items/IdeaCard';
import { Colors, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

export default function IdeasScreen() {
  const router = useRouter();
  const { ideas } = useNotesStore();
  
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Mis Ideas</Text>

      <Searchbar
        placeholder="Buscar ideas o etiquetas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor={Colors.primary}
      />
      
      <FlatList
        data={filteredIdeas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <IdeaCard idea={item} onPress={() => router.push(`/${item.id}`)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No se encontraron ideas que coincidan' : 'No tienes ideas guardadas'}
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