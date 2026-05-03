import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

export default function IdeasScreen() {
  const { notes } = useNotesStore();
  const ideas = notes.filter(n => n.category === 'idea');

  return (
    <View style={styles.container}>
      <FlatList
        data={ideas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: Colors.placeholder }}>No hay ideas guardadas.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.title}
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon 
                  {...props} 
                  icon="lightbulb-on-outline" 
                  color={Colors.primary} 
                  style={{ backgroundColor: Colors.secondary }} 
                />
              )}
            />
            <Card.Content>
              <Text style={styles.contentText}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  card: { marginBottom: 16, borderRadius: 16, elevation: 2 },
  cardTitle: { fontWeight: 'bold' },
  contentText: { color: '#4B5563', fontSize: 15 },
  empty: { alignItems: 'center', marginTop: 50 }
});