export interface AnyNote {
  id: string;
  title: string;
  content?: string;
  type: 'note' | 'checklist' | 'idea';
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  updatedAt: string;
}