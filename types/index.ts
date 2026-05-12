export interface BaseNote {
  id: string;
  title: string;
  category: 'nota' | 'lista' | 'idea';
  createdAt: Date;
  updatedAt: Date;
}

export interface Note extends BaseNote {
  category: 'nota';
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseNote {
  category: 'lista';
  items: ChecklistItem[];
  content?: string;
}

export interface IdeaNote extends BaseNote {
  category: 'idea';
  tags: string[];
  content?: string;
  color?: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

/**
 * Funciones de validación (Type Guards)
 */

export function isNote(note: AnyNote): note is Note {
  return note.category === 'nota';
}

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return note.category === 'lista' && 'items' in note;
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return note.category === 'idea' && 'tags' in note;
}