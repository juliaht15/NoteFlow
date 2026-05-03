import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Card, Chip, Text } from 'react-native-paper';
import { useNotesStore } from '../../store/notesStore';
import { IdeaNote } from '../../types';

export default function IdeasScreen() {
  const notes = useNotesStore((state) => state.notes);
  const ideas = notes.filter(n => n.type === 'idea') as IdeaNote[];

  // Creamos una referencia al componente con tipo 'any' para evitar el error ts(2322)
  const List = FlashList as any;

  return (
    <View style={styles.container}>
      <List
        data={ideas}
        estimatedItemSize={100}
        keyExtractor={(item: IdeaNote) => item.id}
        renderItem={({ item }: { item: IdeaNote }) => (
          <Card style={[styles.card, { backgroundColor: item.color || '#fff9c4' }]}>
            <Card.Content>
              <Text variant="titleLarge">{item.title}</Text>
              <View style={styles.chipContainer}>
                {item.tags?.map((tag, idx) => (
                  <Chip key={idx} style={styles.chip}>{tag}</Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { margin: 10, elevation: 3 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  chip: { marginRight: 5, marginBottom: 5 }
});