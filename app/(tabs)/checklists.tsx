import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Checkbox, Card, Text, Avatar, IconButton, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import { Colors } from '../../constants/theme';

const CheckItem = ({ label }: { label: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.checkItem}>
      <Checkbox.Android 
        status={checked ? 'checked' : 'unchecked'} 
        onPress={() => setChecked(!checked)} 
        color={Colors.primary} 
      />
      <Text style={[styles.lineText, checked && styles.completedText]}>{label}</Text>
    </View>
  );
};

export default function ChecklistsScreen() {
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  const lists = notes.filter(n => n.category === 'lista');

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/(tabs)/notas/${item.id}`)}>
            <Card.Title 
              title={item.title} 
              left={(props) => (
                <Avatar.Icon 
                  {...props} 
                  icon="format-list-checks" 
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
              {item.content.split('\n').filter(line => line.trim() !== "").map((line, index) => (
                <CheckItem key={index} label={line} />
              ))}
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
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  card: { marginBottom: 16, borderRadius: 16, backgroundColor: Colors.surface, elevation: 2 },
  checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  lineText: { fontSize: 16, color: Colors.text, marginLeft: 8 },
  completedText: { textDecorationLine: 'line-through', color: Colors.placeholder },
  fab: { 
    position: 'absolute', 
    margin: 16, 
    right: 0, 
    bottom: 0, 
    backgroundColor: Colors.primary, 
    borderRadius: 30 
  },
});