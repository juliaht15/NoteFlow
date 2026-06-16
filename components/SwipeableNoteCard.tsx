import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { useNotesStore } from '@/store/useNoteStore';
import { AnyNote } from '@/types/index';

export const SwipeableNoteCard = ({ note }: { note: AnyNote }) => {
  const removeNote = useNotesStore((state) => state.removeNote);

  const renderRightActions = () => (
    <View style={styles.deleteActionContainer}>
      <IconButton icon="delete" iconColor="white" onPress={() => removeNote(note.id)} />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Card style={styles.card}>
        <Card.Title title={note.title} />
        <Card.Content>
          {'content' in note && <Text variant="bodyMedium">{note.content}</Text>}
          {'items' in note && <Text variant="bodySmall">Lista: {note.items.length} tareas</Text>}
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 10, marginHorizontal: 16 },
  deleteActionContainer: {
    backgroundColor: '#ff3b30', justifyContent: 'center', alignItems: 'center',
    width: 80, marginBottom: 10, borderRadius: 8,
  }
});