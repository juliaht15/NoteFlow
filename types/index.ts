// E:\Proyectos\noteflow\types\index.ts

export interface BaseNote {
  id: string;
  title: string;
  createdAt: string; // Importante: string para compatibilidad con JSON
  updatedAt: string;
}

export interface Note extends BaseNote {
  type: 'note';
  content: string;
  completed?: boolean;
}

export interface ChecklistNote extends BaseNote {
  type: 'checklist';
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  type: 'idea';
  tags: string[];
  color: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;