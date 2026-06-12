export interface AnyNote {
  id: string;
  title: string;
  content?: string;
  type: 'note' | 'checklist' | 'idea';
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}