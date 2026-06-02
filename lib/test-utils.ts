import { useNotesStore } from '@/store/notesStore';

export const generateMassiveData = (count: number) => {
  const addNote = useNotesStore.getState().addNote;
  for (let i = 0; i < count; i++) {
    addNote({
      id: Math.random().toString(),
      title: `Nota de prueba ${i}`,
      content: "Contenido de relleno para probar el rendimiento de FlashList.",
      type: 'note',
      createdAt: Date.now(),
    });
  }
};