export interface BaseNote {
  id: string;
  title: string;
  category: 'nota' | 'lista' | 'idea'; // Añadido para consistencia con el Store
  createdAt: Date;
  updatedAt: Date;
}

export interface Note extends BaseNote {
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseNote {
  content?: string; // Añadido opcional por si se guarda texto plano
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  content?: string; // Añadido opcional
  tags: string[];
  color: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

// Funciones de validación mejoradas
export function isNote(note: AnyNote): note is Note {
  return note.category === 'nota' || 'content' in note;
}

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return note.category === 'lista' || 'items' in note;
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return note.category === 'idea' || 'tags' in note;
}