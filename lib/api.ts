import { Platform } from 'react-native';
import { AnyNote } from '../types/index';

export type NoteInput = Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>;

// En emuladores de Android, localhost es la IP 10.0.2.2. Cambia esto por tu IP local si testeas en dispositivo físico.
const API_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:3000/api' 
  : 'http://localhost:3000/api'; 

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