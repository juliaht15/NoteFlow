import { AnyNote } from '@/app/(tabs)';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

/**
 * Servicio genérico para llamadas a la API
 */
export const api = {
  getNotes: async (): Promise<AnyNote[]> => {
    // Simulación: aquí llamarás a `${BASE_URL}/notes`
    return [];
  },

  createNote: async (data: Omit<AnyNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<AnyNote> => {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error('Error al crear la nota en el servidor');
    
    return await response.json();
  },

  deleteNote: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar');
  }
};