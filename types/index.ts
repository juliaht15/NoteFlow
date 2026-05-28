export interface Note {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'idea' | 'checklist'; // 👈 Asegúrate de que esta línea exista
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistNote extends Note {
  list: { id: string; text: string; done: boolean }[];
}

// Si usas un tipo unión para mapear tus notas:
export type AnyNote = Note | ChecklistNote;