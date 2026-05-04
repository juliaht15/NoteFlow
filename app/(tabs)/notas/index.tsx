import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, FAB, Card, Text, IconButton } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore'; 
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

// Esto soluciona el error ts(2322) de tu imagen ssss_3.PNG
const TypedFlashList = FlashList as any;

export default function ChecklistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { notes, deleteNote } = useNotesStore();
  const router = useRouter();

  const filteredData = notes.filter((n: any) => 
    n.category === 'lista' && n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar listas..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      <TypedFlashList
        data={filteredData}
        estimatedItemSize={100}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }: any) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.title}
              left={(props) => <IconButton {...props} icon="format-list-checks" iconColor="#2196F3" />}
              right={(props) => (
                <IconButton {...props} icon="delete-outline" iconColor="#d32f2f" onPress={() => deleteNote(item.id)} />
              )}
            />
            <Card.Content>
              <Text variant="bodySmall">{item.content || "Sin elementos"}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <FAB icon="plus" style={styles.fab} onPress={() => router.push('/nueva-nota')} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  search: { margin: 16, borderRadius: 12, backgroundColor: '#fff' },
  card: { marginBottom: 12, borderRadius: 16, backgroundColor: '#fff' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#2196F3', borderRadius: 28 }
});