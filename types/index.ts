export type NoteType = 'note' | 'idea' | 'checklist';

export interface BaseItem {
  id: string;
  type: NoteType;
  title: string;
  content: string;
  folderId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Note extends BaseItem {
  type: 'note';
}

export interface Idea extends BaseItem {
  type: 'idea';
  tags: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Checklist extends BaseItem {
  type: 'checklist';
  items: ChecklistItem[];
}

export type AnyNote = Note | Idea | Checklist;

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
}