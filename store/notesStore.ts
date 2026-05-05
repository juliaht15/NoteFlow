import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, ChecklistNote, IdeaNote, AnyNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  addNote: (item: AnyNote) => void;
  deleteNote: (id: string, type: string) => void;
  updateNote: (id: string, data: Partial<AnyNote>) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],

      addNote: (item) => set((state) => {
        if (item.type === 'lista') return { checklists: [item, ...state.checklists] };
        if (item.type === 'idea') return { ideas: [item, ...state.ideas] };
        return { notes: [item, ...state.notes] };
      }),

      deleteNote: (id, type) => set((state) => ({
        notes: (type === 'nota') ? state.notes.filter(n => n.id !== id) : state.notes,
        checklists: (type === 'lista') ? state.checklists.filter(c => c.id !== id) : state.checklists,
        ideas: (type === 'idea') ? state.ideas.filter(i => i.id !== id) : state.ideas,
      })),

      updateNote: (id, data) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, ...data } as Note : n),
        checklists: state.checklists.map(c => c.id === id ? { ...c, ...data } as ChecklistNote : c),
        ideas: state.ideas.map(i => i.id === id ? { ...i, ...data } as IdeaNote : i),
      })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);