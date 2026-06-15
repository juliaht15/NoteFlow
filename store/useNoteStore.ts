import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote, Note, ChecklistNote, IdeaNote } from '@/types';

interface NoteState {
  notes: AnyNote[];
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  removeNote: (id: string) => void;
  removeChecklist: (id: string) => void;
  removeIdea: (id: string) => void;
}

export const useNotesStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => set((state) => ({ notes: [{ ...note, type: 'note' }, ...state.notes] })),
      addChecklist: (checklist) => set((state) => ({ notes: [{ ...checklist, type: 'checklist' }, ...state.notes] })),
      addIdea: (idea) => set((state) => ({ notes: [{ ...idea, type: 'idea' }, ...state.notes] })),
      
      removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      removeChecklist: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      removeIdea: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);