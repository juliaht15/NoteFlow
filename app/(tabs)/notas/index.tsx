import React, { useState } from 'react';
import { View, StyleSheet, Appearance } from 'react-native';
import { Searchbar, FAB, Text, Card, IconButton } from 'react-native-paper';
// CORRECCIÓN: Ajustamos la ruta según tu estructura de carpetas
import { useNotesStore } from '../../../store/notesStore'; 
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const List = FlashList as any;

export default function NotasScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { notes, deleteNote } = useNotesStore();
  const router = useRouter();

  const themeColors = {
    background: Appearance.getColorScheme() === 'dark' ? '#121212' : '#f5f5f5',
    surface: Appearance.getColorScheme() === 'dark' ? '#1e1e1e' : '#ffffff',
    text: Appearance.getColorScheme() === 'dark' ? '#ffffff' : '#000000',
    primary: '#2196F3'
  };

  // CORRECCIÓN: Añadimos tipo 'any' o el tipo de tu interfaz Note al parámetro
  const filteredNotes = notes.filter((note: any) => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    deleteNote(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Searchbar
        placeholder="Buscar..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <List
        data={filteredNotes}
        estimatedItemSize={100}
        renderItem={({ item }: { item: any }) => (
          <Card style={[styles.card, { backgroundColor: themeColors.surface }]}>
            <Card.Title
              title={item.title}
              titleStyle={{ color: themeColors.text }}
              right={(props) => (
                <IconButton {...props} icon="delete-outline" iconColor="red" onPress={() => handleDelete(item.id)} />
              )}
            />
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/nueva-nota')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { margin: 16, borderRadius: 10 },
  card: { marginHorizontal: 16, marginBottom: 12, borderRadius: 12 },
  fab: { position: 'absolute', margin: 20, right: 0, bottom: 0, backgroundColor: '#2196F3' }
});