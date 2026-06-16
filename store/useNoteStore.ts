import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote } from '@/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface NoteState {
  notes: AnyNote[];
  addNote: (note: Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeNote: (id: string) => void;
}

export const useNotesStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (newNote) => set((state) => {
        const fullNote = {
          ...newNote,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AnyNote;
        
        return { notes: [...state.notes, fullNote] };
      }),
      removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);