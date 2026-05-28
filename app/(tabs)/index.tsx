export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type?: 'note' | 'checklist' | 'idea'; // Propiedad añadida para corregir el error de filtrado
}

// Definimos el tipo genérico que utiliza tu NotesState
export type AnyNote = Note;