export interface BaseNote {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  location?: { lat: number; lng: number } | null;
  folderId?: string | null;
}

export interface TextNote extends BaseNote {
  type: 'note';
  content: string;
}

export interface ChecklistNote extends BaseNote {
  type: 'checklist';
  content: string;
  items: { id: string; text: string; checked: boolean }[];
}

export interface IdeaNote extends BaseNote {
  type: 'idea';
  content: string;
  tags: string[];
}

export type AnyNote = TextNote | ChecklistNote | IdeaNote;

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
}