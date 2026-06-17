import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import { AddNoteForm } from '../../../components/AddNoteForm';
import { NoteList } from '../../../components/NoteList';
import { useNotesStore } from '../../../store/useNoteStore';
import { useTheme } from '../../../constants/theme';

export default function IdeasScreen() {
  const { colors, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allNotes = useNotesStore((state) => state.notes);

  const filteredIdeas = useMemo(() => {
    return allNotes.filter(n => 
      n.type === 'idea' && 
      n.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allNotes, searchQuery]);

  const bgStyle = (colors as any).background || colors.surface || '#121212';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgStyle }]} edges={['top', 'left', 'right']}>
      <View style={[styles.container, { paddingHorizontal: spacing.md }]}>
        
        <Searchbar
          placeholder="Buscar ideas..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: colors.surface }]}
          iconColor={colors.secondaryText}
        />

        <View style={styles.formContainer}>
          <AddNoteForm type="idea" />
        </View>

        <View style={styles.listContainer}>
          <NoteList data={filteredIdeas} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingTop: 10 },
  searchBar: { marginBottom: 16, borderRadius: 8, height: 48 },
  formContainer: { marginBottom: 16 },
  listContainer: { flex: 1 }
});