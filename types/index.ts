// Interfaz base con las propiedades comunes de cualquier nota
export interface BaseNote {
  id: string;
  title: string;
  createdAt: string;
  maxLength?: number;
  updatedAt: string;
}

// 1. Tipo para una Nota de Texto convencional
export interface Note extends BaseNote {
  content: string;
}

// Estructura interna de cada ítem dentro de una lista de tareas
export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

// 2. Tipo para una Lista de Tareas (Checklist)
export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

// 3. Tipo para un Pensamiento Rápido o Idea espontánea
export interface IdeaNote extends BaseNote {
  tags?: string[];
  color?: string;
}

// Unión de todos los tipos posibles de notas que acepta el array global
export type AnyNote = Note | ChecklistNote | IdeaNote;

/**
 * Funciones de validación de tipos (Type Guards)
 * Permiten a TypeScript deducir de forma segura qué subtipo de nota estamos tratando
 */
export function isNote(note: AnyNote): note is Note {
  return 'content' in note && !('items' in note) && !('tags' in note);
}

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return !('content' in note) && !('items' in note);
}