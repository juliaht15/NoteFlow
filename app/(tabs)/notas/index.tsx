import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Card, IconButton, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function NotasScreen() {
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();

  const getIcon = (category: string) => {
    if (category === 'lista') return 'format-list-checks';
    if (category === 'idea') return 'lightbulb-outline';
    return 'note-text-outline';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: Colors.placeholder }}>No hay notas guardadas aún.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/(tabs)/notas/${item.id}`)}>
            <Card.Title
              title={item.title}
              titleStyle={styles.cardTitle}
              subtitle={item.category.toUpperCase()}
              subtitleStyle={{ color: Colors.primary, fontWeight: '600', fontSize: 10 }}
              left={(props) => (
                <Avatar.Icon 
                  {...props} 
                  icon={getIcon(item.category)} 
                  size={40} 
                  color={Colors.primary} 
                  style={{ backgroundColor: Colors.secondary }} 
                />
              )}
              right={(props) => (
                <IconButton 
                  {...props} 
                  icon="trash-can-outline" 
                  iconColor={Colors.delete} 
                  onPress={() => deleteNote(item.id)} 
                />
              )}
            />
            <Card.Content>
              <Text numberOfLines={2} style={styles.cardContent}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        label="Nueva Nota"
        style={styles.fab}
        color="white"
        onPress={() => router.push('/nueva-nota')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  card: { marginBottom: 16, borderRadius: 20, backgroundColor: Colors.surface, elevation: 2 },
  cardTitle: { fontWeight: 'bold', fontSize: 18 },
  cardContent: { color: '#4B5563', marginTop: -5 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, borderRadius: 30, backgroundColor: Colors.primary },
});