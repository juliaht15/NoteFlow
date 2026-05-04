import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Checkbox, Card, Text, Avatar, IconButton, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

export default function ChecklistsScreen() {
  const router = useRouter();
  const { notes, deleteNote, toggleCheck } = useNotesStore();
  const lists = notes.filter(n => n.category === 'lista');

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title 
              title={item.title} 
              titleStyle={styles.cardTitle}
              left={(props) => (
                <Avatar.Icon {...props} icon="format-list-checks" color={Colors.primary} style={{backgroundColor: Colors.secondary}} />
              )}
              right={(props) => (
                <IconButton {...props} icon="trash-can-outline" iconColor={Colors.delete} onPress={() => deleteNote(item.id)} />
              )}
            />
            <Card.Content>
              {item.content.split('\n').map((line: string, index: number) => (
                <View key={index} style={styles.checkItem}>
                  <Checkbox.Android 
                    status={item.completed ? 'checked' : 'unchecked'} 
                    color={Colors.primary} 
                    onPress={() => toggleCheck(item.id)} 
                  />
                  <Text style={[styles.lineText, item.completed && styles.completedText]}>{line}</Text>
                </View>
              ))}
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
  card: { marginBottom: 16, borderRadius: 16, backgroundColor: Colors.surface },
  cardTitle: { fontWeight: 'bold' },
  checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  lineText: { fontSize: 16, color: Colors.text, marginLeft: 8 },
  completedText: { textDecorationLine: 'line-through', color: Colors.placeholder },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: Colors.primary, borderRadius: 30 },
});