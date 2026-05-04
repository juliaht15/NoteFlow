import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, ChecklistNote, IdeaNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  deleteNote: (id: string, type: 'note' | 'checklist' | 'idea') => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      addChecklist: (checklist) => set((state) => ({ checklists: [checklist, ...state.checklists] })),
      addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),
      deleteNote: (id, type) => set((state) => ({
        notes: type === 'note' ? state.notes.filter(n => n.id !== id) : state.notes,
        checklists: type === 'checklist' ? state.checklists.filter(c => c.id !== id) : state.checklists,
        ideas: type === 'idea' ? state.ideas.filter(i => i.id !== id) : state.ideas,
      })),
      toggleChecklistItem: (checklistId, itemId) => set((state) => ({
        checklists: state.checklists.map(c =>
          c.id !== checklistId ? c : {
            ...c,
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