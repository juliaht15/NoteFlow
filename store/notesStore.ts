import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyNote } from '../types';

interface NotesState {
  notes: AnyNote[];
  addNote: (note: AnyNote) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<AnyNote>) => void;
  toggleChecklistItem: (noteId: string, itemId: string) => void;
  clearAll: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],

      // Añadir cualquier nuevo elemento al principio de la lista
      addNote: (note) =>
        set((state) => ({
          notes: [note, ...state.notes],
        })),

      // Eliminar una nota, lista o idea por su ID único
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),

      // Actualizar los campos cambiados (título, contenido, etc.) refrescando la fecha de edición
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? ({ ...note, ...updates, updatedAt: new Date().toISOString() } as AnyNote)
              : note
          ),
        })),

      // Buscar un checklist y marcar/desmarcar una de sus tareas internas
      toggleChecklistItem: (noteId, itemId) =>
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id === noteId && 'items' in note) {
              const updatedItems = note.items.map((item) =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
              );
              return {
                ...note,
                items: updatedItems,
                updatedAt: new Date().toISOString(),
              };
            }
            return note;
          }),
        })),

      // Limpiar por completo el almacén de datos si fuera necesario
      clearAll: () => set({ notes: [] }),
    }),
    {
      name: 'noteflow-storage', // Clave única para guardar los datos en el dispositivo
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);