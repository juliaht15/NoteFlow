import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote } from '../types';

interface NotesState {
  notes: AnyNote[];
  addNote: (note: Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<AnyNote>) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      
      // Tipamos noteData exactamente igual que en la interfaz para eliminar el error de asignación
      addNote: (noteData: Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>) => set((state) => {
        const newNote: AnyNote = {
          ...noteData,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AnyNote;
        return { notes: [newNote, ...state.notes] };
      }),

      updateNote: (id: string, updatedFields: Partial<AnyNote>) => set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id 
            ? { ...note, ...updatedFields, updatedAt: new Date().toISOString() } 
            : note
        ),
      })),

      deleteNote: (id: string) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      })),
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);