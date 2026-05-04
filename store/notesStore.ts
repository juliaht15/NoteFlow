import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, ChecklistNote, IdeaNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  // Función unificada para añadir según categoría
  addNote: (item: any) => void;
  deleteNote: (id: string, type: 'nota' | 'lista' | 'idea' | 'note' | 'checklist') => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],

      addNote: (item) => set((state) => {
        // Normalizamos la categoría (por si viene como 'nota' o 'note')
        const category = item.category?.toLowerCase();
        
        if (category === 'lista' || category === 'checklist') {
          return { checklists: [item, ...state.checklists] };
        } else if (category === 'idea') {
          return { ideas: [item, ...state.ideas] };
        } else {
          return { notes: [item, ...state.notes] };
        }
      }),

      deleteNote: (id, type) => set((state) => {
        const t = type?.toLowerCase();
        return {
          notes: (t === 'nota' || t === 'note') ? state.notes.filter(n => n.id !== id) : state.notes,
          checklists: (t === 'lista' || t === 'checklist') ? state.checklists.filter(c => c.id !== id) : state.checklists,
          ideas: t === 'idea' ? state.ideas.filter(i => i.id !== id) : state.ideas,
        };
      }),

      toggleChecklistItem: (checklistId, itemId) => set((state) => ({
        checklists: state.checklists.map(c =>
          c.id !== checklistId ? c : {
            ...c,
            items: (c.items || []).map(i =>
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