import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote } from '../types';

interface NotesState {
  notes: AnyNote[];
  addNote: (note: AnyNote) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<AnyNote>) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      deleteNote: (id) => set((state) => ({ 
        notes: state.notes.filter((n) => n.id !== id) 
      })),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } as AnyNote : n)),
      })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);