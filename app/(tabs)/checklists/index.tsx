import { View, StyleSheet } from 'react-native';
import { NoteList } from '@/components/NoteList';
import { useNotesStore } from '@/store/useNoteStore';
import { COLORS } from '@/constants/theme';

export default function ChecklistsScreen() {
  const checklists = useNotesStore((state) => state.notes.filter((n) => n.type === 'checklist'));
  
  return (
    <View style={styles.container}>
      <NoteList data={checklists} />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: COLORS.light.surface } 
});