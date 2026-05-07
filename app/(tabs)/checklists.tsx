import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Portal, Modal, TextInput, Button, Searchbar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import ChecklistCard from '../../components/items/ChecklistCard';
import { Colors, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { ChecklistNote } from '../../types';

export default function ChecklistsScreen() {
  const router = useRouter();
  const { checklists, addNote } = useNotesStore();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtrado para listas
  const filteredChecklists = checklists.filter(list => 
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (title.trim()) {
      const newList: ChecklistNote = {
        id: Date.now().toString(),
        title,
        items: [], 
        category: 'lista',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addNote(newList);
      setTitle('');
      setVisible(false);
      router.push(`/${newList.id}`); 
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Checklists</Text>

      {/* BARRA DE BÚSQUEDA */}
      <Searchbar
        placeholder="Buscar listas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      
      <FlatList
        data={filteredChecklists} // Usamos la lista filtrada
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChecklistCard checklist={item} onPress={() => router.push(`/${item.id}`)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No se encontraron listas' : 'No hay listas creadas'}
          </Text>
        }
      />

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleLarge" style={styles.modalTitle}>Nueva Lista</Text>
          <TextInput 
            label="Nombre de la lista" 
            value={title} 
            onChangeText={setTitle} 
            mode="outlined" 
          />
          <Button mode="contained" onPress={handleAdd} style={styles.button}>
            Crear y editar
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
  button: { 
    marginTop: 20 
  }
});