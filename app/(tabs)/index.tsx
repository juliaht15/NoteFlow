import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Portal, Modal, TextInput, Button, Searchbar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/items/NoteCard';
import { Colors, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { Note } from '../../types';

export default function NotesScreen() {
  const router = useRouter();
  const { notes, addNote } = useNotesStore();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtrado
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    if (title.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        category: 'nota',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addNote(newNote);
      setTitle('');
      setContent('');
      setVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>Mis Notas</Text>

      {/* BARRA DE BÚSQUEDA */}
      <Searchbar
        placeholder="Buscar notas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />
      
      <FlatList
        data={filteredNotes} // Usamos la lista filtrada
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => router.push(`/${item.id}`)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No se encontraron notas' : 'No hay notas guardadas'}
          </Text>
        }
      />

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleLarge" style={styles.modalTitle}>Nueva Nota</Text>
          <TextInput 
            label="Título" 
            value={title} 
            onChangeText={setTitle} 
            mode="outlined" 
            style={styles.input} 
          />
          <TextInput 
            label="Contenido" 
            value={content} 
            onChangeText={setContent} 
            multiline 
            numberOfLines={4} 
            mode="outlined" 
            style={styles.input} 
          />
          <Button mode="contained" onPress={handleAdd} style={styles.button}>
            Guardar
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
    elevation: 0, // Quita la sombra pesada en Android
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