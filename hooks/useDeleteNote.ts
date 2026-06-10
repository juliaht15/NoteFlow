import { useNotesStore } from '@/store/useNoteStore';

export const useDeleteNote = () => {
  const { removeNote, removeChecklist, removeIdea } = useNotesStore();
  
  return (id: string, type: 'note' | 'checklist' | 'idea') => {
    switch (type) {
      case 'note':
        removeNote(id);
        break;
      case 'checklist':
        removeChecklist(id);
        break;
      case 'idea':
        removeIdea(id);
        break;
    }
  };
};