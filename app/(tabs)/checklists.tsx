import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Text, Checkbox, Card, List as PaperList } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import { ChecklistNote } from '../../types';

export default function ChecklistsScreen() {
  const { notes, toggleChecklistItem } = useNotesStore();
  const checklists = notes.filter(n => n.type === 'checklist') as ChecklistNote[];

  // TRUCO PARA EVITAR ERROR TS(2322)
  const List = FlashList as any;

  return (
    <View style={styles.container}>
      <List
        data={checklists}
        estimatedItemSize={150}
        keyExtractor={(item: ChecklistNote) => item.id}
        renderItem={({ item }: { item: ChecklistNote }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} titleVariant="titleMedium" />
            <Card.Content>
              {item.items.map((task) => (
                <PaperList.Item
                  key={task.id}
                  title={task.text}
                  titleStyle={{ 
                    textDecorationLine: task.isCompleted ? 'line-through' : 'none',
                    opacity: task.isCompleted ? 0.5 : 1
                  }}
                  left={() => (
                    <Checkbox
                      status={task.isCompleted ? 'checked' : 'unchecked'}
                      onPress={() => toggleChecklistItem(item.id, task.id)}
                    />
                  )}
                />
              ))}
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No hay listas de tareas pendientes.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { marginHorizontal: 10, marginTop: 10, elevation: 2 },
  empty: { textAlign: 'center', marginTop: 50, opacity: 0.5 }
});