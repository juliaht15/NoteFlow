export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'idea' | 'checklist';
  createdAt: number;
}