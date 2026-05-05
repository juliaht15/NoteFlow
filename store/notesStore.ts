import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, ChecklistNote, IdeaNote, AnyNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  addNote: (item: AnyNote) => void;
  // Simplificado: solo pedimos el ID para borrar en cualquier lista
  deleteNote: (id: string) => void; 
  updateNote: (id: string, data: Partial<AnyNote>) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],

      addNote: (item: AnyNote) => set((state) => {
        if (item.category === 'lista') {
          return { checklists: [item as ChecklistNote, ...state.checklists] };
        } else if (item.category === 'idea') {
          return { ideas: [item as IdeaNote, ...state.ideas] };
        } else {
          return { notes: [item as Note, ...state.notes] };
        }
      }),

      // Ahora busca el ID en todas las categorías, así nunca falla
      deleteNote: (id: string) => set((state) => ({
        notes: state.notes.filter((n) => n.id !== id),
        checklists: state.checklists.filter((c) => c.id !== id),
        ideas: state.ideas.filter((i) => i.id !== id),
      })),

      updateNote: (id, data) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, ...data, updatedAt: new Date() } as Note : n),
        checklists: state.checklists.map(c => c.id === id ? { ...c, ...data, updatedAt: new Date() } as ChecklistNote : c),
        ideas: state.ideas.map(i => i.id === id ? { ...i, ...data, updatedAt: new Date() } as IdeaNote : i),
      })),

      toggleChecklistItem: (checklistId, itemId) => set((state) => ({
        checklists: state.checklists.map(c =>
          c.id !== checklistId ? c : {
            ...c,
            updatedAt: new Date(),
            items: c.items.map(i =>
              i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
            ),
          }
        ),
      })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);