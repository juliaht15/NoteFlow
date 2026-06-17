import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { useNotesStore } from '@/store/useNoteStore';
import { AnyNote } from '@/types/index';

export const SwipeableNoteCard = ({ note, onPress }: { note: AnyNote; onPress?: () => void }) => {
  const removeNote = useNotesStore((state) => state.removeNote);

  const renderRightActions = () => (
    <View style={styles.deleteActionContainer}>
      <IconButton icon="delete" iconColor="white" onPress={() => removeNote(note.id)} />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Card style={styles.card} onPress={onPress}>
        <Card.Title title={note.title} titleStyle={styles.cardTitle} />
        <Card.Content>
          {note.content ? <Text variant="bodyMedium" numberOfLines={2}>{note.content}</Text> : null}
          {note.type === 'checklist' && 'items' in note && (
            <Text variant="bodySmall" style={styles.subInfo}>
              Lista: {(note.items || []).filter(i => i.checked).length}/{(note.items || []).length} completados
            </Text>
          )}
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 10, marginHorizontal: 16, borderRadius: 12 },
  cardTitle: { fontWeight: '700' },
  deleteActionContainer: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 10,
    borderRadius: 12,
  },
  subInfo: { marginTop: 4, opacity: 0.7 }
});