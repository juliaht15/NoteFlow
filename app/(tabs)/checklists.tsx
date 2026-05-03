import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Checkbox, Card, Text, Avatar } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

export default function ChecklistsScreen() {
  const { notes } = useNotesStore();
  
  // Filtramos solo las que son categoría 'lista'
  const lists = notes.filter(n => n.category === 'lista');

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: Colors.placeholder }}>No hay listas de tareas aún.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title 
              title={item.title} 
              titleStyle={styles.cardTitle}
              left={(props) => <Avatar.Icon {...props} icon="format-list-checks" color={Colors.primary} style={{backgroundColor: Colors.secondary}} />}
            />
            <Card.Content>
              {item.content.split('\n').map((line: string, index: number) => (
                <View key={index} style={styles.checkItem}>
                  <Checkbox.Android 
                    status="unchecked" 
                    color={Colors.primary} 
                  />
                  <Text style={styles.lineText}>{line}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  card: { marginBottom: 16, borderRadius: 16, backgroundColor: Colors.surface, elevation: 2 },
  cardTitle: { fontWeight: 'bold' },
  checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  lineText: { fontSize: 16, color: Colors.text, marginLeft: 8 },
  empty: { alignItems: 'center', marginTop: 50 }
});