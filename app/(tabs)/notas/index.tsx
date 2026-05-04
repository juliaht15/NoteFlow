import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, FAB, Card, IconButton, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { Colors } from '../../../constants/theme';

export default function NotasScreen() {
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  const soloNotas = notes.filter(n => n.category === 'nota');

  return (
    <View style={styles.container}>
      <FlatList
        data={soloNotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/(tabs)/notas/${item.id}`)}>
            <Card.Title
              title={item.title}
              subtitle="NOTA PERSONAL"
              left={(props) => <Avatar.Icon {...props} icon="note-text" style={{ backgroundColor: Colors.secondary }} color={Colors.primary} />}
              right={(props) => <IconButton {...props} icon="trash-can-outline" iconColor={Colors.delete} onPress={() => deleteNote(item.id)} />}
            />
            <Card.Content>
              <Text numberOfLines={2}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />

      {/* AQUÍ ESTÁ EL CAMBIO: Quitamos el label para que solo sea el círculo con el + */}
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
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  card: { marginBottom: 16, borderRadius: 16, elevation: 2 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: Colors.primary, borderRadius: 30 },
});