import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Portal, Modal, TextInput, Button, Searchbar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import IdeaCard from '../../components/items/IdeaCard';
import { Colors, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { IdeaNote } from '../../types';

export default function IdeasScreen() {
  const router = useRouter();
  const { ideas, addNote } = useNotesStore();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtrado (busca en título y en las etiquetas)
  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = () => {
    if (title.trim()) {
      const newIdea: IdeaNote = {
        id: Date.now().toString(),
        title,
        content: '',
        tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        category: 'idea',
        color: '#FFFFFF', // Mantenido para compatibilidad de tipos
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addNote(newIdea);
      setTitle('');
      setTags('');
      setVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Mis Ideas</Text>

      {/* BARRA DE BÚSQUEDA */}
      <Searchbar
        placeholder="Buscar ideas o etiquetas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      
      <FlatList
        data={filteredIdeas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <IdeaCard idea={item} onPress={() => router.push(`/${item.id}`)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No se encontraron ideas que coincidan' : 'No tienes ideas guardadas'}
          </Text>
        }
      />

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleLarge" style={styles.modalTitle}>Nueva Idea</Text>
          <TextInput 
            label="Título de la idea" 
            value={title} 
            onChangeText={setTitle} 
            mode="outlined" 
            style={styles.input} 
          />
          <TextInput 
            label="Etiquetas (separadas por comas)" 
            value={tags} 
            onChangeText={setTags} 
            placeholder="viajes, comida, trabajo"
            mode="outlined" 
            style={styles.input} 
          />
          <Button mode="contained" onPress={handleAdd} style={styles.button}>
            Guardar Idea
          </Button>
        </Modal>
      </Portal>

      <FAB 
        icon="plus" 
        style={styles.fab} 
        color="white" 
        onPress={() => setVisible(true)} 
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
    backgroundColor: '#f0f0f0',
    elevation: 0,
  },
  searchInput: {
    fontSize: 16,
  },
  list: { 
    paddingBottom: 100 
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic'
  },
  fab: { 
    position: 'absolute', 
    margin: 16, 
    right: 0, 
    bottom: 0, 
    backgroundColor: Colors.primary 
  },
  modal: { 
    backgroundColor: 'white', 
    padding: 20, 
    margin: 20, 
    borderRadius: 12 
  },
  modalTitle: { 
    marginBottom: 15, 
    fontWeight: 'bold' 
  },
  input: { 
    marginBottom: 10 
  },
  button: { 
    marginTop: 10 
  }
});