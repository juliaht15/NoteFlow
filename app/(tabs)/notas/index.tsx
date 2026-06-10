import { View, StyleSheet } from 'react-native';
import { NoteList } from '@/components/NoteList';
import { useNotesStore } from '@/store/useNoteStore';
import { COLORS } from '@/constants/theme';

export default function NotasScreen() {
  const notes = useNotesStore((state) => state.notes.filter((n) => n.type === 'note'));
  
  return (
    <View style={styles.container}>
      <NoteList data={notes} />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: COLORS.light.surface } 
});