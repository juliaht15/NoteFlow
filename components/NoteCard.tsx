import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AnyNote } from '@/types';
import { ChecklistCard } from './items/ChecklistCard';
import { IdeaCard } from './items/IdeaCard';
import { NoteItem } from './items/NoteItem';

export const NoteCard = ({ note }: { note: AnyNote }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/(tabs)/${note.type}s/${note.id}` as any)}>
      {note.type === 'note' && <NoteItem note={note} />}
      {note.type === 'checklist' && <ChecklistCard note={note} />}
      {note.type === 'idea' && <IdeaCard note={note} />}
    </TouchableOpacity>
  );
};