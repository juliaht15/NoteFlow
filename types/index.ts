// E:\Proyectos\noteflow\types\index.ts

export interface BaseNote {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  location?: { lat: number; lng: number } | null;
}

export interface TextNote extends BaseNote {
  type: 'note';
  content: string;
}

export interface ChecklistNote extends BaseNote {
  type: 'checklist';
  items: { id: string; text: string; checked: boolean }[];
}

export interface IdeaNote extends BaseNote {
  type: 'idea';
  tags: string[];
}

// ESTO ES LO QUE TE FALTA PARA LA UNIÓN DE TIPOS
export type AnyNote = TextNote | ChecklistNote | IdeaNote;