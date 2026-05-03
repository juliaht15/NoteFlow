import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function NotasScreen() {
  const router = useRouter();
  const { notes } = useNotesStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="bodyLarge" style={{ color: Colors.placeholder }}>
              No hay notas de texto aún.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card 
            style={styles.card} 
            onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
          >
            <Card.Title title={item.title} subtitle={item.category} />
            <Card.Content>
              <Text numberOfLines={2}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        label="Nueva Nota"
        style={[styles.fab, { backgroundColor: Colors.primary }]}
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
    padding: 16,
  },
  empty: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 12,
    backgroundColor: Colors.surface,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
});