export interface Note {
  id?: string;
  title: string;
  content: string;
  type: 'note' | 'idea' | 'checklist';
  created_at?: string;
}