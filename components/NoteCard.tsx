import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AnyNote } from '@/types';
import { ChecklistCard } from './items/ChecklistCard';
import { IdeaCard } from './items/IdeaCard';
import { NoteItem } from './items/NoteItem';

export const NoteCard = ({ note }: { note: AnyNote }) => {
  const router = useRouter();

  const getRoutePath = (type: string) => {
    switch (type) {
      case 'note': return 'notas';
      case 'checklist': return 'checklists';
      case 'idea': return 'ideas';
      default: return 'notas';
    }
  };

  return (
    <TouchableOpacity 
      onPress={() => router.push(`/(tabs)/${getRoutePath(note.type)}/${note.id}` as any)}
      style={styles.wrapper}
    >
      {note.type === 'note' && <NoteItem note={note} />}
      {note.type === 'checklist' && <ChecklistCard note={note} />}
      {note.type === 'idea' && <IdeaCard note={note} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginVertical: 5 }
});