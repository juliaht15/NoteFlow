import { AnyNote } from '../types/index';

export type NoteInput = Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>;

const API_URL = 'http://localhost:3000/api'; 

export const api = {
  getNotes: async (): Promise<AnyNote[]> => {
    const response = await fetch(`${API_URL}/notes`);
    if (!response.ok) throw new Error('Error al obtener notas');
    return response.json();
  },

  createNote: async (data: NoteInput): Promise<AnyNote> => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear la nota');
    return response.json();
  }
};