export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'nota'; // Forzamos el literal para el discriminante
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote {
  id: string;
  title: string;
  items: ChecklistItem[];
  type: 'lista';
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: 'idea';
  createdAt: Date;
  updatedAt: Date;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;

// Type Guards para que TypeScript no se queje en el renderizado
export const isNote = (n: AnyNote): n is Note => n.type === 'nota';
export const isChecklistNote = (n: AnyNote): n is ChecklistNote => n.type === 'lista';
export const isIdeaNote = (n: AnyNote): n is IdeaNote => n.type === 'idea';