import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { AddNoteForm } from '../../../components/AddNoteForm';
import { NoteList } from '../../../components/NoteList';
import { useNotesStore } from '../../../store/useNoteStore';
import { useTheme } from '../../../constants/theme';

export default function NotesScreen() {
  const { colors, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allNotes = useNotesStore((state) => state.notes);

  const filteredNotes = useMemo(() => {
    return allNotes.filter(n => 
      n.type === 'note' && 
      n.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allNotes, searchQuery]);

  const bgStyle = (colors as any).background || colors.surface || '#121212';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgStyle }]} edges={['top', 'left', 'right']}>
      <View style={[styles.container, { paddingHorizontal: spacing.md }]}>
        
        <Searchbar
          placeholder="Buscar notas..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: colors.surface }]}
          iconColor={colors.secondaryText}
          theme={{ colors: { primary: colors.primary } }}
        />

        <View style={styles.formContainer}>
          <AddNoteForm type="note" />
        </View>

        <View style={styles.listContainer}>
          <NoteList data={filteredNotes} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingTop: 10 },
  searchBar: { marginBottom: 16, borderRadius: 12, height: 48 },
  formContainer: { marginBottom: 16 },
  listContainer: { flex: 1, paddingBottom: 110 }
});