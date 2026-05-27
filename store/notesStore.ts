import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Note, ChecklistNote, IdeaNote, AnyNote } from '../types';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  addNote: (item: AnyNote) => void;
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

      addNote: (item: AnyNote) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        set((state) => {
          const nowStr = new Date().toISOString();
          const newItem = { ...item, createdAt: nowStr, updatedAt: nowStr };

          if (item.category === 'lista') {
            return { checklists: [newItem as ChecklistNote, ...state.checklists] };
          }
          if (item.category === 'idea') {
            return { ideas: [newItem as IdeaNote, ...state.ideas] };
          }
          return { notes: [newItem as Note, ...state.notes] };
        });
      },

      deleteNote: (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
          checklists: state.checklists.filter((c) => c.id !== id),
          ideas: state.ideas.filter((i) => i.id !== id),
        }));
      },

      updateNote: (id, data) => {
        set((state) => {
          const nowStr = new Date().toISOString();
          return {
            notes: state.notes.map((n) =>
              n.id === id ? ({ ...n, ...data, updatedAt: nowStr } as Note) : n
            ),
            checklists: state.checklists.map((c) =>
              c.id === id ? ({ ...c, ...data, updatedAt: nowStr } as ChecklistNote) : c
            ),
            ideas: state.ideas.map((i) =>
              i.id === id ? ({ ...i, ...data, updatedAt: nowStr } as IdeaNote) : i
            ),
          };
        });
      },

      toggleChecklistItem: (checklistId, itemId) => {
        set((state) => {
          const nowStr = new Date().toISOString();
          let allCompleted = false;

          const updatedChecklists = state.checklists.map((c) => {
            if (c.id !== checklistId) return c;

            const updatedItems = c.items.map((i) =>
              i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
            );

            allCompleted = updatedItems.every((i) => i.isCompleted) && updatedItems.length > 0;

            return {
              ...c,
              updatedAt: nowStr,
              items: updatedItems,
            };
          });

          if (allCompleted) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }

          return { checklists: updatedChecklists };
        });
      },
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);