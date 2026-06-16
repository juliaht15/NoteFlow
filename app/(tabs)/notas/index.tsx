import { View, StyleSheet } from 'react-native';
import { NoteList } from '@/components/NoteList';
import { useNotesStore } from '@/store/useNoteStore';
import { useTheme } from 'react-native-paper';

export default function NotasScreen() {
  const theme = useTheme();
  const notes = useNotesStore((state) => state.notes.filter((n) => n.type === 'note'));
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <NoteList data={notes} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });