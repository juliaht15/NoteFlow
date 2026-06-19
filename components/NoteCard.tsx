import React from 'react';
import { StyleSheet } from 'react-native';
import { AnyNote } from '@/types';
import { ChecklistCard } from './items/ChecklistCard';
import { IdeaCard } from './items/IdeaCard';
import { NoteItem } from './items/NoteItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface NoteCardProps {
  note: AnyNote;
  onPress?: () => void;
}

export const NoteCard = ({ note, onPress }: NoteCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.wrapper}
      activeOpacity={0.7}
    >
      {note.type === 'note' && <NoteItem note={note} />}
      {note.type === 'checklist' && <ChecklistCard note={note} />}
      {note.type === 'idea' && <IdeaCard note={note} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { 
    marginHorizontal: 16, 
    marginVertical: 5,
  }
});