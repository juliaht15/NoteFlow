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
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: Colors.placeholder }}>No tienes notas personales aún.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card 
            style={styles.card} 
            onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
          >
            <Card.Title
              title={item.title}
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon 
                  {...props} 
                  icon="note-text-outline" 
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
              <Text numberOfLines={2} style={styles.content}>
                {item.content}
              </Text>
            </Card.Content>
          </Card>
        )}
      />

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
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 16 
  },
  card: { 
    marginBottom: 16, 
    borderRadius: 16, 
    backgroundColor: Colors.surface, 
    elevation: 2 
  },
  cardTitle: { 
    fontWeight: 'bold' 
  },
  content: { 
    color: '#4A5568', 
    fontSize: 14 
  },
  empty: { 
    alignItems: 'center', 
    marginTop: 50 
  },
  fab: { 
    position: 'absolute', 
    margin: 16, 
    right: 0, 
    bottom: 0, 
    backgroundColor: Colors.primary, 
    borderRadius: 30 
  },
});