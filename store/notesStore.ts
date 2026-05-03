import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote, Note, ChecklistNote, IdeaNote } from '../types';

interface NotesStore {
  notes: AnyNote[];
  // Acciones
  addNote: (note: AnyNote) => void;
  deleteNote: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],

      addNote: (note) => 
        set((state) => ({ 
          notes: [note, ...state.notes] 
        })),

      deleteNote: (id) => 
        set((state) => ({ 
          notes: state.notes.filter((n) => n.id !== id) 
        })),

      toggleChecklistItem: (checklistId, itemId) => 
        set((state) => ({
          notes: state.notes.map((n) => {
            if (n.id === checklistId && n.type === 'checklist') {
              return {
                ...n,
                items: n.items.map((item) =>
                  item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
                ),
              };
            }
            return n;
          }),
        })),
    }),
    {
      name: 'noteflow-storage', // Clave única para el almacenamiento
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);