import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Definimos qué forma tiene una Nota
interface Note {
  id: string;
  title: string;
  content: string;
  category: 'nota' | 'idea' | 'lista';
  completed?: boolean; // Para los checks de las listas
}

// 2. Definimos qué acciones puede hacer nuestra App
interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, title: string, content: string) => void; // <--- EL INTERRUPTOR QUE FALTABA
  toggleCheck: (id: string) => void; // <--- EL OTRO INTERRUPTOR QUE FALTABA
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      
      addNote: (note) => 
        set((state) => ({ notes: [note, ...state.notes] })),

      deleteNote: (id) => 
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      // ESTA ES LA FUNCIÓN QUE CORRIGE EL ERROR EN [id].tsx
      updateNote: (id, title, content) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, title, content } : n
          ),
        })),

      // ESTA ES LA FUNCIÓN QUE CORRIGE EL ERROR EN checklists.tsx
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