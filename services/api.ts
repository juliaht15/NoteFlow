import { AnyNote } from '../../types'; // Ajusta según tu estructura

const API_URL = 'http://localhost:3000/api';

export const api = {
  createNote: async (data: Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<AnyNote> => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Error al crear la nota');
    return response.json();
  }
};