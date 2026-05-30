export interface BaseNote {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note extends BaseNote {
  type: 'note';
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface ChecklistNote extends BaseNote {
  type: 'checklist';
  list: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  type: 'idea';
  content: string;
}

export type AnyNote = Note | ChecklistNote | IdeaNote;