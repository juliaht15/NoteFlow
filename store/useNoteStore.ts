import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote, Folder } from '@/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface NoteState {
  notes: AnyNote[];
  folders: Folder[];
  addNote: (note: Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updatedData: Partial<AnyNote>) => void;
  createFolder: (name: string) => void;
  removeFolder: (id: string) => void;
}

export const useNotesStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      folders: [],
      addNote: (newNote) => set((state) => {
        const fullNote = {
          ...newNote,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as AnyNote;
        return { notes: [...state.notes, fullNote] };
      }),
      removeNote: (id) => set((state) => ({ 
        notes: state.notes.filter((n) => n.id !== id) 
      })),
      updateNote: (id, updatedData) => set((state) => ({
        notes: state.notes.map((n) =>
          n.id === id ? ({ ...n, ...updatedData, updatedAt: new Date().toISOString() } as AnyNote) : n
        )
      })),
      createFolder: (name) => set((state) => {
        const newFolder: Folder = {
          id: uuidv4(),
          name: name.trim(),
          createdAt: new Date().toISOString(),
        };
        return { folders: [...state.folders, newFolder] };
      }),
      removeFolder: (id) => set((state) => ({
        folders: state.folders.filter((f) => f.id !== id),
        notes: state.notes.map((n) => n.folderId === id ? { ...n, folderId: null } : n)
      })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);