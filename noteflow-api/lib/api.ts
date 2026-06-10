// E:\Proyectos\noteflow\lib\api.ts
import { AnyNote } from '@/types';

// En Android físico, localhost no funciona (apunta al propio teléfono). 
// Usa la IP de tu PC o 'http://10.0.2.2:3000' si usas el emulador de Android.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000/api';

export const api = {
  getNotes: async (): Promise<AnyNote[]> => {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) throw new Error('Error al obtener notas del servidor');
    return await response.json();
  },

  createNote: async (data: any): Promise<AnyNote> => {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la nota');
    }
    
    return await response.json();
  },

  deleteNote: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar en el servidor');
  }
};