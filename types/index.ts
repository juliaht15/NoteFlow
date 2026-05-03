// types/index.ts

export type NoteType = 'text' | 'checklist' | 'idea';

interface BaseNote {
  id: string;
  type: NoteType; // El discriminador
  title: string;
  createdAt: number; // Usamos number (timestamp) para facilitar la persistencia
  updatedAt: number;
}

// 1. Notas de texto tradicional
export interface Note extends BaseNote {
  type: 'text';
  content: string;
}

// 2. Notas tipo lista de tareas
export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface ChecklistNote extends BaseNote {
  type: 'checklist';
  items: ChecklistItem[];
}

// 3. Notas tipo Idea (rápidas y coloridas)
export interface IdeaNote extends BaseNote {
  type: 'idea';
  tags: string[];
  color: string;
}

// Tipo de unión para usar en el Store y Componentes
export type AnyNote = Note | ChecklistNote | IdeaNote;