// E:\Proyectos\noteflow\store\useNoteStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, ChecklistNote, IdeaNote } from '@/app/(tabs)';

interface NoteState {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  
  // Acciones
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  
  // Acciones de borrado mejoradas
  removeNote: (id: string) => void;
  removeChecklist: (id: string) => void;
  removeIdea: (id: string) => void;
}

export const useNotesStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],

      addNote: (note) => set((state) => ({ 
        notes: [{ ...note, type: 'note' }, ...state.notes] 
      })),
      
      addChecklist: (checklist) => set((state) => ({ 
        checklists: [{ ...checklist, type: 'checklist' }, ...state.checklists] 
      })),
      
      addIdea: (idea) => set((state) => ({ 
        ideas: [{ ...idea, type: 'idea' }, ...state.ideas] 
      })),

      removeNote: (id) => set((state) => ({ 
        notes: state.notes.filter((n) => n.id !== id) 
      })),
      
      removeChecklist: (id) => set((state) => ({ 
        checklists: state.checklists.filter((c) => c.id !== id) 
      })),
      
      removeIdea: (id) => set((state) => ({ 
        ideas: state.ideas.filter((i) => i.id !== id) 
      })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);