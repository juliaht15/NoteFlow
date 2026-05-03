import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Text, FAB, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Note } from '../../types';

export default function NotasScreen() {
  const router = useRouter();
  const allNotes = useNotesStore((state) => state.notes);
  // Filtramos solo las notas de tipo texto
  const notes = allNotes.filter(n => n.type === 'text') as Note[];

  // TRUCO PARA EVITAR ERROR TS(2322)
  const List = FlashList as any;

  return (
    <View style={styles.container}>
      <List
        data={notes}
        estimatedItemSize={100}
        keyExtractor={(item: Note) => item.id}
        renderItem={({ item }: { item: Note }) => (
          <Card style={styles.card} onPress={() => console.log('Editar', item.id)}>
            <Card.Title 
              title={item.title} 
              subtitle={new Date(item.createdAt).toLocaleDateString()} 
            />
            <Card.Content>
              <Text numberOfLines={3} variant="bodyMedium">
                {item.content}
              </Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge">No hay notas de texto aún.</Text>
          </View>
        )}
      />
      <FAB
        icon="plus"
        label="Nueva Nota"
        style={styles.fab}
        onPress={() => router.push('/nueva-nota')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { marginHorizontal: 10, marginTop: 10, elevation: 2 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#6200ee' },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 50, opacity: 0.5 }
});