export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type?: 'note' | 'checklist' | 'idea';
}

export interface Checklist {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type?: 'note' | 'checklist' | 'idea';
}

export interface Idea {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type?: 'note' | 'checklist' | 'idea';
}

// Así, cualquier variante que componga a AnyNote tendrá la propiedad 'type' disponible
export type AnyNote = Note | Checklist | Idea;