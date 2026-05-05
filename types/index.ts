export interface BaseNote {
  id: string;
  title: string;
  category: 'nota' | 'lista' | 'idea';
  createdAt: Date;
  updatedAt: Date;
}

export interface Note extends BaseNote {
  category: 'nota'; // Forzamos el literal para mejor discriminación
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseNote {
  category: 'lista'; // Forzamos el literal
  content?: string;
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  category: 'idea'; // Forzamos el literal
  content?: string;
  tags: string[];
  color: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

/**
 * Funciones de validación (Type Guards)
 * Se basan primero en la categoría y luego en la propiedad única para asegurar el tipo.
 */

export function isNote(note: AnyNote): note is Note {
  return note.category === 'nota';
}

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return note.category === 'lista' && Array.isArray((note as ChecklistNote).items);
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return note.category === 'idea' && Array.isArray((note as IdeaNote).tags);
}