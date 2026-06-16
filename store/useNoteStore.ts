import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote } from '@/types';

// Define la interfaz una sola vez
export interface NoteState {
  notes: AnyNote[];
  addNote: (note: AnyNote) => void;
  removeNote: (id: string) => void;
}

// Úsala en el create
export const useNotesStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);