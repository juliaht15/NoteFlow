import { useNotesStore } from '@/store/useNoteStore';
import { AnyNote } from '@/types';

export const useCreateNote = () => {
  const { addNote, addChecklist, addIdea } = useNotesStore();
  
  return (note: AnyNote) => {
    switch (note.type) {
      case 'note':
        addNote(note);
        break;
      case 'checklist':
        addChecklist(note);
        break;
      case 'idea':
        addIdea(note);
        break;
      default:
        console.error('Tipo de nota no reconocido');
    }
  };
};