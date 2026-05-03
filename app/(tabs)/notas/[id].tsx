import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Checkbox, List, Card, Text } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

export default function ChecklistsScreen() {
  const { notes } = useNotesStore();
  
  // Filtramos solo las notas que son de tipo 'lista'
  const lists = notes.filter(n => n.category === 'lista');

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tienes listas de tareas.</Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title 
              title={item.title} 
              titleStyle={styles.cardTitle}
              left={(props) => <List.Icon {...props} icon="format-list-checks" color={Colors.primary} />}
            />
            <Card.Content>
              {item.content.split('\n').map((line: string, index: number) => (
                <View key={index} style={styles.checkItem}>
                  <Checkbox.Android 
                    status="unchecked" 
                    color={Colors.primary} 
                    onPress={() => { /* Aquí podrías añadir lógica para marcar */ }}
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
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    padding: 16 
  },
  card: { 
    marginBottom: 16, 
    borderRadius: 12, 
    backgroundColor: Colors.surface 
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  checkItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4 
  },
  lineText: { 
    fontSize: 16, 
    color: Colors.text,
    marginLeft: 8
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: Colors.placeholder 
  }
});