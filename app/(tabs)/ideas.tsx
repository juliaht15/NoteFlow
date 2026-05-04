import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Avatar, IconButton, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

export default function IdeasScreen() {
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  const ideas = notes.filter(n => n.category === 'idea');

  return (
    <View style={styles.container}>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/(tabs)/notas/${item.id}`)}>
            <Card.Title
              title={item.title}
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon {...props} icon="lightbulb-on-outline" color={Colors.primary} style={{ backgroundColor: Colors.secondary }} />
              )}
              right={(props) => (
                <IconButton {...props} icon="trash-can-outline" iconColor={Colors.delete} onPress={() => deleteNote(item.id)} />
              )}
            />
            <Card.Content>
              <Text style={{ color: '#4B5563' }}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />
      <FAB icon="plus" style={styles.fab} color="white" onPress={() => router.push('/nueva-nota')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  card: { marginBottom: 16, borderRadius: 16 },
  cardTitle: { fontWeight: 'bold' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: Colors.primary, borderRadius: 30 },
});