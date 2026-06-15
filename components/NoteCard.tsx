import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AnyNote } from '@/types';
import { ChecklistCard } from './items/ChecklistCard';
import { IdeaCard } from './items/IdeaCard';
import { NoteItem } from './items/NoteItem';

export const NoteCard = ({ note }: { note: AnyNote }) => {
  const router = useRouter();

  // Mapeo exacto para que coincida con tus carpetas en app/(tabs)/
  const getRoutePath = (type: string) => {
    switch (type) {
      case 'note': return 'notas';
      case 'checklist': return 'checklists';
      case 'idea': return 'ideas';
      default: return 'notas';
    }
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/(tabs)/${getRoutePath(note.type)}/${note.id}` as any)}>
      {note.type === 'note' && <NoteItem note={note} />}
      {note.type === 'checklist' && <ChecklistCard note={note} />}
      {note.type === 'idea' && <IdeaCard note={note} />}
    </TouchableOpacity>
  );
};