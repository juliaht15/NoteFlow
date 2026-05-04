import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: string;
  title: string;
  content: string;
  category: 'nota' | 'idea' | 'lista';
  completed?: boolean;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
  toggleCheck: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      
      addNote: (note) => 
        set((state) => ({ notes: [note, ...state.notes] })),

      deleteNote: (id) => 
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      updateNote: (id, title, content) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, title, content } : n
          ),
        })),

      toggleCheck: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, completed: !n.completed } : n
          ),
        })),
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);